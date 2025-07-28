import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Sword, Shield, Target, Crown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import HeroDetailsModal from "@/components/HeroDetailsModal";

interface HeroEntity {
  id: string;
  nome: string;
  descricao: string;
  habilidades: string[];
  equipamentos: string[];
  simbolos: string[];
  tags: string[];
}

const HeroisPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [heroes, setHeroes] = useState<HeroEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedHero, setSelectedHero] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const filteredHeroes = heroes.filter(hero => 
    hero.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (hero.tags && hero.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  const fetchHeroes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke('poseidon-details', {
        body: {
          type: 'hero',
          action: 'list'
        }
      });

      if (error) {
        console.error('Erro ao buscar heróis:', error);
      } else if (data) {
        setHeroes(data);
      }
    } catch (error) {
      console.error('Erro ao conectar com a API:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeroes();
  }, []);

  const getHeroIcon = (heroName: string) => {
    const name = heroName.toLowerCase();
    if (name.includes('hercules') || name.includes('héracles')) return Crown;
    if (name.includes('aquiles')) return Target;
    if (name.includes('perseu')) return Shield;
    return Sword;
  };

  const handleHeroDetails = (heroName: string) => {
    setSelectedHero(heroName);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-marble">
      {/* Header */}
      <section className="bg-gradient-olympian text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-6">
              <Sword className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-5xl font-cinzel-decorative font-bold mb-4">
              Heróis Lendários
            </h1>
            <p className="text-xl text-gold font-cinzel mb-6">
              Grandes Heróis e Suas Aventuras Épicas
            </p>
            <p className="text-lg text-white/90 font-cinzel max-w-3xl mx-auto">
              Descubra os bravos heróis da mitologia grega, seus feitos extraordinários 
              e as jornadas épicas que os tornaram lendários. Mortais que desafiaram 
              o destino e alcançaram a imortalidade através de suas ações heroicas.
            </p>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Input
                type="text"
                placeholder="Buscar heróis..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 font-cinzel"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            </div>
          </div>
        </div>
      </section>

      {/* Heroes Grid */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground font-cinzel">
                Carregando heróis...
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredHeroes.map((hero) => {
                const IconComponent = getHeroIcon(hero.nome);
                
                return (
                  <Card key={hero.id} className="group hover:shadow-olympian transition-all duration-300 overflow-hidden">
                    <div className="relative h-48 bg-gradient-gold flex items-center justify-center">
                      <IconComponent className="h-16 w-16 text-primary" />
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="bg-primary text-white font-cinzel">
                          Herói
                        </Badge>
                      </div>
                    </div>
                    
                    <CardHeader>
                      <CardTitle className="font-cinzel-decorative text-2xl text-primary">
                        {hero.nome}
                      </CardTitle>
                      <CardDescription className="font-cinzel">
                        {hero.descricao ? `${hero.descricao.substring(0, 120)}...` : 'Herói lendário da mitologia grega'}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Abilities */}
                      {hero.habilidades && hero.habilidades.length > 0 && (
                        <div>
                          <h4 className="font-cinzel font-semibold text-sm text-primary mb-2">
                            Habilidades:
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {hero.habilidades.slice(0, 2).map((habilidade, index) => (
                              <Badge key={index} variant="outline" className="text-xs font-cinzel">
                                {habilidade}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Equipment */}
                      {hero.equipamentos && hero.equipamentos.length > 0 && (
                        <div>
                          <h4 className="font-cinzel font-semibold text-sm text-primary mb-2">
                            Equipamentos:
                          </h4>
                          <p className="text-sm text-muted-foreground font-cinzel">
                            {hero.equipamentos.slice(0, 2).join(", ")}
                          </p>
                        </div>
                      )}

                      <Button 
                        onClick={() => handleHeroDetails(hero.nome)} 
                        className="w-full font-cinzel"
                      >
                        Ver Detalhes
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {!loading && filteredHeroes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground font-cinzel">
                Nenhum herói encontrado com os critérios de busca.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Related Navigation */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-cinzel-decorative font-bold text-primary mb-4">
              Explore Outras Categorias
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link to="/olimpo" className="group">
              <Card className="hover:shadow-gold transition-all duration-300">
                <CardHeader className="text-center">
                  <CardTitle className="font-cinzel-decorative text-primary group-hover:text-gold transition-colors">
                    Deuses Olímpicos
                  </CardTitle>
                  <CardDescription className="font-cinzel">
                    Os doze principais deuses do panteão
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/primordiais" className="group">
              <Card className="hover:shadow-gold transition-all duration-300">
                <CardHeader className="text-center">
                  <CardTitle className="font-cinzel-decorative text-primary group-hover:text-gold transition-colors">
                    Seres Primordiais
                  </CardTitle>
                  <CardDescription className="font-cinzel">
                    As primeiras forças cósmicas
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/timeline" className="group">
              <Card className="hover:shadow-gold transition-all duration-300">
                <CardHeader className="text-center">
                  <CardTitle className="font-cinzel-decorative text-primary group-hover:text-gold transition-colors">
                    Linha do Tempo
                  </CardTitle>
                  <CardDescription className="font-cinzel">
                    Cronologia dos eventos heroicos
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Hero Details Modal */}
      {selectedHero && (
        <HeroDetailsModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedHero(null);
          }}
          heroName={selectedHero}
        />
      )}
    </div>
  );
};

export default HeroisPage;