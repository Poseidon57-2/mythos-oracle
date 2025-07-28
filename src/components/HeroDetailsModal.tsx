import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, X, Sword, Shield, Target, Crown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface HeroDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  heroName: string;
}

interface HeroEntity {
  id: string;
  nome: string;
  descricao: string;
  habilidades: string[];
  equipamentos: string[];
  simbolos: string[];
  tags: string[];
  imagem_url?: string;
}

const HeroDetailsModal = ({ isOpen, onClose, heroName }: HeroDetailsModalProps) => {
  const [hero, setHero] = useState<HeroEntity | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getHeroIcon = (heroName: string) => {
    const name = heroName.toLowerCase();
    if (name.includes('hercules') || name.includes('héracles')) return Crown;
    if (name.includes('aquiles')) return Target;
    if (name.includes('perseu')) return Shield;
    return Sword;
  };

  const fetchHeroDetails = async () => {
    if (!heroName) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('poseidon-details', {
        body: {
          nome: heroName,
          type: 'hero'
        }
      });

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        setHero(data[0]);
      } else {
        setError('Herói não encontrado');
      }
    } catch (err) {
      console.error('Erro ao buscar detalhes do herói:', err);
      setError('Erro ao carregar detalhes do herói');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && heroName) {
      fetchHeroDetails();
    }
  }, [isOpen, heroName]);

  const IconComponent = hero ? getHeroIcon(hero.nome) : Sword;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto border-2 border-gold bg-white">
        <DialogHeader className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute -top-2 -right-2 h-8 w-8 rounded-full border border-gold hover:bg-gold/10"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 font-cinzel text-primary">Carregando...</span>
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <p className="text-red-600 font-cinzel">{error}</p>
            <Button onClick={fetchHeroDetails} className="mt-4 font-cinzel">
              Tentar Novamente
            </Button>
          </div>
        )}

        {hero && !loading && (
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center border-b border-gold/20 pb-6">
              <div className="w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <IconComponent className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-3xl font-cinzel-decorative font-bold text-primary mb-2">
                {hero.nome}
              </h1>
              <Badge variant="secondary" className="bg-primary text-white font-cinzel">
                Herói Lendário
              </Badge>
            </div>

            {/* Description */}
            {hero.descricao && (
              <div>
                <h3 className="text-xl font-cinzel-decorative font-bold text-primary mb-3">
                  História
                </h3>
                <p className="text-foreground leading-relaxed font-cinzel text-justify">
                  {hero.descricao}
                </p>
              </div>
            )}

            {/* Abilities */}
            {hero.habilidades && hero.habilidades.length > 0 && (
              <div>
                <h3 className="text-xl font-cinzel-decorative font-bold text-primary mb-3">
                  Habilidades
                </h3>
                <div className="flex flex-wrap gap-2">
                  {hero.habilidades.map((habilidade, index) => (
                    <Badge key={index} variant="outline" className="font-cinzel">
                      {habilidade}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Equipment */}
            {hero.equipamentos && hero.equipamentos.length > 0 && (
              <div>
                <h3 className="text-xl font-cinzel-decorative font-bold text-primary mb-3">
                  Equipamentos
                </h3>
                <div className="flex flex-wrap gap-2">
                  {hero.equipamentos.map((equipamento, index) => (
                    <Badge key={index} variant="secondary" className="font-cinzel">
                      {equipamento}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Symbols */}
            {hero.simbolos && hero.simbolos.length > 0 && (
              <div>
                <h3 className="text-xl font-cinzel-decorative font-bold text-primary mb-3">
                  Símbolos
                </h3>
                <div className="flex flex-wrap gap-2">
                  {hero.simbolos.map((simbolo, index) => (
                    <Badge key={index} variant="outline" className="bg-gold/10 text-primary border-gold font-cinzel">
                      {simbolo}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {hero.tags && hero.tags.length > 0 && (
              <div>
                <h3 className="text-xl font-cinzel-decorative font-bold text-primary mb-3">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {hero.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="bg-muted font-cinzel">
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

export default HeroDetailsModal;