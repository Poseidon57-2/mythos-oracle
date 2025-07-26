import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Loader2, Leaf, Music, Heart, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface MinorGodDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  godName: string;
}

interface MinorGodEntity {
  id: string;
  nome: string;
  descricao: string;
  dominios: string[];
  poderes: string[];
  simbolos: string[];
  tags: string[];
  imagem_url?: string;
  relacoes?: any;
}

const MinorGodDetailsModal = ({ isOpen, onClose, godName }: MinorGodDetailsModalProps) => {
  const [god, setGod] = useState<MinorGodEntity | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getMinorGodIcon = (godName: string) => {
    const name = godName.toLowerCase();
    if (name.includes("ninfa")) return Leaf;
    if (name.includes("satiro") || name.includes("pan")) return Music;
    if (name.includes("afrodite") || name.includes("eros")) return Heart;
    return Star;
  };

  const fetchGodDetails = async () => {
    if (!godName) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('poseidon-details', {
        body: { 
          nome: godName,
          type: 'minor'
        }
      });

      if (error) {
        console.error('Erro ao buscar detalhes:', error);
        setError('Erro ao carregar os detalhes do deus menor');
        return;
      }

      if (data && Array.isArray(data) && data.length > 0) {
        setGod(data[0]);
      } else {
        setError('Deus menor não encontrado');
      }
    } catch (err) {
      console.error('Erro na requisição:', err);
      setError('Erro ao carregar os detalhes do deus menor');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && godName) {
      fetchGodDetails();
    }
  }, [isOpen, godName]);

  const IconComponent = god ? getMinorGodIcon(god.nome) : Star;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-white border-2 border-gold">
        <DialogHeader>
          <DialogTitle className="text-2xl font-cinzel-decorative text-primary flex items-center gap-3">
            <IconComponent className="h-8 w-8 text-gold" />
            {loading ? "Carregando..." : god?.nome || "Deus Menor"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {loading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 font-cinzel text-muted-foreground">
                Carregando detalhes...
              </span>
            </div>
          )}

          {error && (
            <div className="text-center py-8">
              <p className="text-red-600 font-cinzel">{error}</p>
            </div>
          )}

          {god && !loading && (
            <>
              {/* Descrição */}
              <div>
                <h3 className="text-lg font-cinzel-decorative font-semibold text-primary mb-3">
                  Descrição
                </h3>
                <p className="font-cinzel text-muted-foreground leading-relaxed">
                  {god.descricao}
                </p>
              </div>

              {/* Domínios */}
              {god.dominios && god.dominios.length > 0 && (
                <div>
                  <h3 className="text-lg font-cinzel-decorative font-semibold text-primary mb-3">
                    Domínios
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {god.dominios.map((dominio, index) => (
                      <Badge key={index} variant="secondary" className="font-cinzel">
                        {dominio}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Poderes */}
              {god.poderes && god.poderes.length > 0 && (
                <div>
                  <h3 className="text-lg font-cinzel-decorative font-semibold text-primary mb-3">
                    Poderes
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {god.poderes.map((poder, index) => (
                      <Badge key={index} variant="outline" className="font-cinzel">
                        {poder}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Símbolos */}
              {god.simbolos && god.simbolos.length > 0 && (
                <div>
                  <h3 className="text-lg font-cinzel-decorative font-semibold text-primary mb-3">
                    Símbolos
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {god.simbolos.map((simbolo, index) => (
                      <Badge key={index} className="bg-gold/20 text-primary border-gold font-cinzel">
                        {simbolo}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {god.tags && god.tags.length > 0 && (
                <div>
                  <h3 className="text-lg font-cinzel-decorative font-semibold text-primary mb-3">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {god.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="font-cinzel text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MinorGodDetailsModal;