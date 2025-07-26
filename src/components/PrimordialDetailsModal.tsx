import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, X, Globe, Moon, Sun, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface PrimordialDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  primordialName: string;
}

interface PrimordialEntity {
  id: string;
  nome: string;
  descricao: string;
  dominios: string[];
  poderes: string[];
  simbolos: string[];
  tags: string[];
  imagem_url?: string;
}

const PrimordialDetailsModal = ({ isOpen, onClose, primordialName }: PrimordialDetailsModalProps) => {
  const [primordial, setPrimordial] = useState<PrimordialEntity | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch primordial details when modal opens and primordialName changes
  useEffect(() => {
    if (isOpen && primordialName) {
      fetchPrimordialDetails(primordialName);
    } else if (!isOpen) {
      setPrimordial(null);
      setError(null);
    }
  }, [isOpen, primordialName]);

  const getPrimordialIcon = (primordialName: string) => {
    const name = primordialName.toLowerCase();
    if (name.includes("gaia")) return Globe;
    if (name.includes("nyx")) return Moon;
    if (name.includes("helios")) return Sun;
    return Zap;
  };

  const fetchPrimordialDetails = async (nome: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await supabase.functions.invoke('poseidon-details', {
        body: { 
          nome: nome,
          type: 'primordial'
        }
      });

      if (response.error) {
        throw new Error('Erro ao buscar detalhes do ser primordial');
      }

      if (response.data?.length > 0) {
        setPrimordial(response.data[0]);
      } else {
        throw new Error('Ser primordial não encontrado');
      }
    } catch (err) {
      console.error('Error fetching primordial details:', err);
      setError('Erro ao carregar detalhes do ser primordial');
    } finally {
      setLoading(false);
    }
  };

  const IconComponent = primordial ? getPrimordialIcon(primordial.nome) : Globe;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-background border-2 border-gold">
        <DialogHeader className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute right-0 top-0 hover:bg-gold/20"
          >
            <X className="h-4 w-4" />
          </Button>
          <DialogTitle className="font-cinzel-decorative text-3xl text-primary pr-10">
            {loading ? "Carregando..." : primordial?.nome || "Ser Primordial"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {loading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-gold" />
              <span className="ml-2 font-cinzel text-muted-foreground">
                Carregando detalhes...
              </span>
            </div>
          )}

          {error && (
            <div className="text-center py-8">
              <p className="text-red-500 font-cinzel">{error}</p>
            </div>
          )}

          {primordial && !loading && (
            <>
              {/* Header with Icon */}
              <div className="flex items-center space-x-4 p-6 bg-gradient-olympian rounded-lg">
                <div className="w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center">
                  <IconComponent className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-cinzel-decorative text-white font-bold">
                    {primordial.nome}
                  </h2>
                  <Badge variant="secondary" className="bg-bronze text-white font-cinzel">
                    Ser Primordial
                  </Badge>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h3 className="text-xl font-cinzel-decorative font-semibold text-primary">
                  Descrição
                </h3>
                <p className="font-cinzel text-muted-foreground leading-relaxed">
                  {primordial.descricao}
                </p>
              </div>

              {/* Domains */}
              {primordial.dominios && primordial.dominios.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xl font-cinzel-decorative font-semibold text-primary">
                    Domínios Primordiais
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {primordial.dominios.map((dominio, index) => (
                      <Badge key={index} variant="outline" className="font-cinzel">
                        {dominio}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Powers */}
              {primordial.poderes && primordial.poderes.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xl font-cinzel-decorative font-semibold text-primary">
                    Poderes Cósmicos
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {primordial.poderes.map((poder, index) => (
                      <Badge key={index} variant="secondary" className="font-cinzel bg-gold/20 text-primary">
                        {poder}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Symbols */}
              {primordial.simbolos && primordial.simbolos.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xl font-cinzel-decorative font-semibold text-primary">
                    Manifestações e Símbolos
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {primordial.simbolos.map((simbolo, index) => (
                      <Badge key={index} variant="outline" className="font-cinzel border-gold">
                        {simbolo}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {primordial.tags && primordial.tags.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xl font-cinzel-decorative font-semibold text-primary">
                    Características
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {primordial.tags.map((tag, index) => (
                      <Badge key={index} variant="default" className="font-cinzel bg-primary/10 text-primary">
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

export default PrimordialDetailsModal;