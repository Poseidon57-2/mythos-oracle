import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Leaf, Music, Heart } from "lucide-react";
import { mythEntities } from "@/data/mockData";

const MenoresPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const menorEntities = mythEntities.filter(entity => entity.categoria === "menor");
  const filteredEntities = menorEntities.filter(entity => 
    entity.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entity.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getMinorIcon = (entityId: string) => {
    switch(entityId) {
      case "pan": return Music;
      case "afrodite": return Heart;
      default: return Leaf;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-marble">
      {/* Header */}
      <section className="bg-gradient-olympian text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-6">
              <Leaf className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-5xl font-cinzel-decorative font-bold mb-4">
              Divindades Menores
            </h1>
            <p className="text-xl text-gold font-cinzel mb-6">
              Ninfas, Sátiros e Outras Divindades
            </p>
            <p className="text-lg text-white/90 font-cinzel max-w-3xl mx-auto">
              Explore o vasto mundo das divindades menores da mitologia grega. 
              Estas entidades, embora menos poderosas que os olímpicos, 
              desempenham papéis fundamentais na natureza, nas artes e na vida cotidiana.
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
                placeholder="Buscar divindades menores..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 font-cinzel"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Overview */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center p-6">
              <Leaf className="h-12 w-12 text-gold mx-auto mb-4" />
              <h3 className="text-xl font-cinzel-decorative font-semibold text-primary mb-2">
                Ninfas
              </h3>
              <p className="font-cinzel text-muted-foreground">
                Espíritos da natureza que habitam florestas, rios e montanhas
              </p>
            </Card>

            <Card className="text-center p-6">
              <Music className="h-12 w-12 text-gold mx-auto mb-4" />
              <h3 className="text-xl font-cinzel-decorative font-semibold text-primary mb-2">
                Sátiros
              </h3>
              <p className="font-cinzel text-muted-foreground">
                Companheiros de Dionísio, meio homens meio bodes
              </p>
            </Card>

            <Card className="text-center p-6">
              <Heart className="h-12 w-12 text-gold mx-auto mb-4" />
              <h3 className="text-xl font-cinzel-decorative font-semibold text-primary mb-2">
                Outras Divindades
              </h3>
              <p className="font-cinzel text-muted-foreground">
                Deuses especializados em aspectos específicos da vida
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Minor Deities Grid */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEntities.map((entity) => {
              const IconComponent = getMinorIcon(entity.id);
              
              return (
                <Card key={entity.id} className="group hover:shadow-olympian transition-all duration-300 overflow-hidden">
                  <div className="relative h-48 bg-gradient-gold flex items-center justify-center">
                    <IconComponent className="h-16 w-16 text-primary" />
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-primary text-white font-cinzel">
                        Menor
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
                          Habilidades:
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
                Nenhuma divindade menor encontrada com os critérios de busca.
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
                    Os doze principais deuses
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
                    Grandes heróis e aventuras
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

export default MenoresPage;