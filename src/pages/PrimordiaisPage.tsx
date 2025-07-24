import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Globe, Moon, Sun } from "lucide-react";
import { mythEntities } from "@/data/mockData";

const PrimordiaisPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const primordialEntities = mythEntities.filter(entity => entity.categoria === "primordial");
  const filteredEntities = primordialEntities.filter(entity => 
    entity.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entity.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getPrimordialIcon = (entityId: string) => {
    switch(entityId) {
      case "gaia": return Globe;
      case "nyx": return Moon;
      case "helios": return Sun;
      default: return Globe;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-marble">
      {/* Header */}
      <section className="bg-gradient-olympian text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-6">
              <Globe className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-5xl font-cinzel-decorative font-bold mb-4">
              Seres Primordiais
            </h1>
            <p className="text-xl text-gold font-cinzel mb-6">
              As Primeiras Forças Cósmicas
            </p>
            <p className="text-lg text-white/90 font-cinzel max-w-3xl mx-auto">
              Conheça os seres primordiais que emergiram do Caos para dar forma ao cosmos. 
              Estas entidades ancestrais representam as forças fundamentais da criação 
              e são a origem de toda a genealogia divina grega.
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
                placeholder="Buscar seres primordiais..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 font-cinzel"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            </div>
          </div>
        </div>
      </section>

      {/* Primordials Grid */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEntities.map((entity) => {
              const IconComponent = getPrimordialIcon(entity.id);
              
              return (
                <Card key={entity.id} className="group hover:shadow-olympian transition-all duration-300 overflow-hidden">
                  <div className="relative h-48 bg-bronze flex items-center justify-center">
                    <IconComponent className="h-16 w-16 text-gold" />
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-bronze text-white font-cinzel">
                        Primordial
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
                          Poderes Primordiais:
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
                          Manifestações:
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
                Nenhum ser primordial encontrado com os critérios de busca.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Cosmogony Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-cinzel-decorative font-bold text-primary mb-8">
              A Cosmogonia Grega
            </h2>
            <div className="space-y-6 text-left">
              <Card className="p-6">
                <h3 className="text-xl font-cinzel-decorative font-semibold text-primary mb-3">
                  No Princípio Era o Caos
                </h3>
                <p className="font-cinzel text-muted-foreground leading-relaxed">
                  Antes de existir qualquer coisa, havia apenas o Caos - um vazio primordial 
                  e sem forma. Do Caos emergiram os primeiros seres: Gaia (Terra), 
                  Tártaro (Abismo) e Eros (Amor Primordial).
                </p>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-xl font-cinzel-decorative font-semibold text-primary mb-3">
                  O Nascimento do Cosmos
                </h3>
                <p className="font-cinzel text-muted-foreground leading-relaxed">
                  Gaia deu à luz Urano (Céu) e Ponto (Mar), estabelecendo as bases 
                  do mundo físico. Da união entre Gaia e Urano nasceram os Titãs, 
                  os Ciclopes e os Hecatônquiros, dando início à primeira geração divina.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Related Navigation */}
      <section className="py-12 bg-gradient-marble">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-cinzel-decorative font-bold text-primary mb-4">
              Explore a Evolução Divina
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
                    A terceira geração divina
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
                    Da criação aos olímpicos
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/menores" className="group">
              <Card className="hover:shadow-gold transition-all duration-300">
                <CardHeader className="text-center">
                  <CardTitle className="font-cinzel-decorative text-primary group-hover:text-gold transition-colors">
                    Divindades Menores
                  </CardTitle>
                  <CardDescription className="font-cinzel">
                    Descendentes dos primordiais
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

export default PrimordiaisPage;