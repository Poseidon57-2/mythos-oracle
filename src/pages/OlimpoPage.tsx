import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Crown, Zap, Waves } from "lucide-react";
import { mythEntities } from "@/data/mockData";

const OlimpoPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const olimpicEntities = mythEntities.filter(entity => entity.categoria === "olimpico");
  const filteredEntities = olimpicEntities.filter(entity => 
    entity.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entity.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getEntityIcon = (entityId: string) => {
    switch(entityId) {
      case "zeus": return Zap;
      case "poseidon": return Waves;
      default: return Crown;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-marble">
      {/* Header */}
      <section className="bg-gradient-olympian text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-6">
              <Crown className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-5xl font-cinzel-decorative font-bold mb-4">
              Deuses Olímpicos
            </h1>
            <p className="text-xl text-gold font-cinzel mb-6">
              Os Doze Principais Deuses do Panteão Grego
            </p>
            <p className="text-lg text-white/90 font-cinzel max-w-3xl mx-auto">
              Conheça os poderosos deuses que governam do Monte Olimpo, 
              cada um com seus domínios únicos e personalidades marcantes. 
              Estes são os pilares da mitologia grega clássica.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Input
                type="text"
                placeholder="Buscar deuses olímpicos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 font-cinzel"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            </div>
          </div>
        </div>
      </section>

      {/* Gods Grid */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEntities.map((entity) => {
              const IconComponent = getEntityIcon(entity.id);
              
              return (
                <Card key={entity.id} className="group hover:shadow-olympian transition-all duration-300 overflow-hidden">
                  <div className="relative h-48 bg-gradient-olympian flex items-center justify-center">
                    <IconComponent className="h-16 w-16 text-gold" />
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-gold text-primary font-cinzel">
                        Olímpico
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="font-cinzel-decorative text-2xl text-primary">
                      {entity.nome}
                    </CardTitle>
                    <CardDescription className="font-cinzel">
                      {entity.descricao.substring(0, 120)}...
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Powers */}
                    {entity.poderes && (
                      <div>
                        <h4 className="font-cinzel font-semibold text-sm text-primary mb-2">
                          Poderes:
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {entity.poderes.slice(0, 2).map((poder, index) => (
                            <Badge key={index} variant="outline" className="text-xs font-cinzel">
                              {poder}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Symbols */}
                    {entity.simbolos && (
                      <div>
                        <h4 className="font-cinzel font-semibold text-sm text-primary mb-2">
                          Símbolos:
                        </h4>
                        <p className="text-sm text-muted-foreground font-cinzel">
                          {entity.simbolos.join(", ")}
                        </p>
                      </div>
                    )}

                    <Button asChild className="w-full font-cinzel">
                      <Link to={`/entidade/${entity.id}`}>
                        Ver Detalhes
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredEntities.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground font-cinzel">
                Nenhum deus encontrado com os critérios de busca.
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
            <Link to="/menores" className="group">
              <Card className="hover:shadow-gold transition-all duration-300">
                <CardHeader className="text-center">
                  <CardTitle className="font-cinzel-decorative text-primary group-hover:text-gold transition-colors">
                    Divindades Menores
                  </CardTitle>
                  <CardDescription className="font-cinzel">
                    Ninfas, sátiros e outras divindades
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

            <Link to="/herois" className="group">
              <Card className="hover:shadow-gold transition-all duration-300">
                <CardHeader className="text-center">
                  <CardTitle className="font-cinzel-decorative text-primary group-hover:text-gold transition-colors">
                    Heróis Lendários
                  </CardTitle>
                  <CardDescription className="font-cinzel">
                    Grandes heróis e aventuras épicas
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OlimpoPage;