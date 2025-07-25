import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calendar, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface BlogPost {
  id: string;
  titulo: string;
  conteudo: string;
  resumo: string;
  data_publicacao: string;
  tags: string[];
  livro_recomendado: string | null;
}

interface BlogDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string | null;
}

export const BlogDetailsModal = ({ isOpen, onClose, postId }: BlogDetailsModalProps) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPostDetails = async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error: supabaseError } = await supabase.functions.invoke('poseidon-details', {
        body: { type: 'blog', id }
      });

      if (supabaseError) {
        throw new Error(supabaseError.message);
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      setPost(data.post);
    } catch (err) {
      console.error('Erro ao buscar detalhes do post:', err);
      setError('Erro ao carregar os detalhes do artigo. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
      setPost(null);
      setError(null);
    } else if (postId) {
      fetchPostDetails(postId);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white border-2 border-gold">
        <DialogHeader className="border-b border-gold/20 pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="font-cinzel-decorative text-2xl text-primary flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-gold rounded-full flex items-center justify-center">
                <BookOpen className="h-4 w-4 text-primary" />
              </div>
              {loading ? "Carregando..." : post?.titulo || "Artigo"}
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 rounded-full hover:bg-gold/10"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="py-6 space-y-6">
          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin w-8 h-8 border-2 border-gold border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="font-cinzel text-muted-foreground">Carregando artigo...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="font-cinzel text-destructive mb-4">{error}</p>
              <Button 
                variant="outline" 
                onClick={() => postId && fetchPostDetails(postId)}
                className="font-cinzel"
              >
                Tentar Novamente
              </Button>
            </div>
          )}

          {post && !loading && !error && (
            <>
              {/* Post Metadata */}
              <div className="flex items-center justify-between flex-wrap gap-4 pb-4 border-b border-gold/20">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span className="font-cinzel text-sm">
                    {formatDate(post.data_publicacao)}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {post.tags?.map((tag, index) => (
                    <Badge key={index} variant="outline" className="font-cinzel text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Post Content */}
              <div className="prose prose-lg max-w-none">
                <div 
                  className="font-cinzel text-foreground leading-relaxed text-justify"
                  dangerouslySetInnerHTML={{ __html: post.conteudo?.replace(/\n/g, '<br />') || '' }}
                />
              </div>

              {/* Book Recommendation */}
              {post.livro_recomendado && (
                <div className="mt-8 p-6 bg-gradient-gold/10 rounded-lg border-l-4 border-gold">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-gradient-gold rounded-full flex items-center justify-center">
                      <span className="text-lg">📚</span>
                    </div>
                    <h3 className="font-cinzel-decorative text-lg font-semibold text-primary">
                      Leitura Recomendada
                    </h3>
                  </div>
                  <p className="font-cinzel text-foreground italic">
                    {post.livro_recomendado}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};