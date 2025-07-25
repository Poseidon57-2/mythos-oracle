import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Loader2, Crown, Zap, Waves, Shield, Heart, Sun, Moon, Sword, Hammer, Wind, Home } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface GodDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  godName: string;
}

interface GodEntity {
  id: string;
  nome: string;
  categoria: string;
  descricao: string;
  dominios: string[];
  poderes: string[];
  simbolos: string[];
  tags: string[];
  imagem_url?: string;
}

const GodDetailsModal = ({ isOpen, onClose, godName }: GodDetailsModalProps) => {
  const [god, setGod] = useState<GodEntity | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getGodIcon = (godName: string) => {
    switch(godName.toLowerCase()) {
      case "zeus": return Zap;
      case "poseidon": return Waves;
      case "atena": return Shield;
      case "afrodite": return Heart;
      case "apolo": return Sun;
      case "ártemis": return Moon;
      case "ares": return Sword;
      case "hefesto": return Hammer;
      case "hermes": return Wind;
      case "héstia": return Home;
      default: return Crown;
    }
  };

  useEffect(() => {
    if (isOpen && godName) {
      fetchGodDetails();
    }
  }, [isOpen, godName]);

  const fetchGodDetails = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('entidades_mitologicas')
        .select('*')
        .eq('nome', godName)
        .eq('categoria', 'olimpico')
        .single();

      if (error) {
        throw error;
      }

      setGod(data);
    } catch (err) {
      console.error('Error fetching god details:', err);
      setError('Erro ao carregar detalhes do deus. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const IconComponent = god ? getGodIcon(god.nome) : Crown;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-cinzel-decorative text-3xl text-primary text-center">
            {godName}
          </DialogTitle>
        </DialogHeader>

        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 font-cinzel text-muted-foreground">Carregando detalhes...</span>
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <p className="text-red-600 font-cinzel">{error}</p>
          </div>
        )}

        {god && !loading && (
          <div className="space-y-6">
            {/* Icon and Title */}
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <IconComponent className="h-12 w-12 text-primary" />
              </div>
              <Badge variant="secondary" className="bg-gold text-primary font-cinzel">
                Deus Olímpico
              </Badge>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="font-cinzel-decorative text-xl text-primary">Descrição</h3>
              <p className="font-cinzel text-muted-foreground leading-relaxed">
                {god.descricao}
              </p>
            </div>

            {/* Domains */}
            {god.dominios && god.dominios.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-cinzel-decorative text-xl text-primary">Domínios</h3>
                <div className="flex flex-wrap gap-2">
                  {god.dominios.map((dominio, index) => (
                    <Badge key={index} variant="outline" className="font-cinzel capitalize">
                      {dominio}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Powers */}
            {god.poderes && god.poderes.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-cinzel-decorative text-xl text-primary">Poderes</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {god.poderes.map((poder, index) => (
                    <div key={index} className="bg-muted/50 p-3 rounded-lg">
                      <p className="font-cinzel text-sm capitalize">{poder}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Symbols */}
            {god.simbolos && god.simbolos.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-cinzel-decorative text-xl text-primary">Símbolos</h3>
                <div className="flex flex-wrap gap-2">
                  {god.simbolos.map((simbolo, index) => (
                    <Badge key={index} className="bg-gradient-gold text-primary font-cinzel capitalize">
                      {simbolo}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {god.tags && god.tags.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-cinzel-decorative text-xl text-primary">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {god.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="font-cinzel capitalize">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GodDetailsModal;