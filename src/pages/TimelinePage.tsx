import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, ChevronDown, ChevronUp, Globe, Swords, Crown, Star, Calendar, Users, Tag } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface TimelineEvent {
  id: string;
  nome: string;
  descricao: string;
  era: string | null;
  tipo: string | null;
  data_estimada: string | null;
  personagens: string[] | null;
  tags: string[] | null;
  icon: string | null;
  created_at: string;
  updated_at: string;
}

const TimelinePage = () => {
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTimelineEvents();
  }, []);

  const fetchTimelineEvents = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.functions.invoke('poseidon-details', {
        body: {
          type: 'timeline',
          action: 'list'
        }
      });

      if (error) throw error;
      
      setTimelineEvents(data?.events || []);
    } catch (error) {
      console.error('Erro ao buscar eventos da timeline:', error);
    } finally {
      setLoading(false);
    }
  };

  const getEraIcon = (era: string | null) => {
    const eraLower = era?.toLowerCase() || '';
    if (eraLower.includes('primordial')) return Globe;
    if (eraLower.includes('titã') || eraLower.includes('titan')) return Crown;
    if (eraLower.includes('olímpic') || eraLower.includes('olimpic')) return Star;
    if (eraLower.includes('heroic') || eraLower.includes('herói')) return Swords;
    return Calendar;
  };

  const getEraColor = (era: string | null) => {
    const eraLower = era?.toLowerCase() || '';
    if (eraLower.includes('primordial')) return "bg-bronze text-white";
    if (eraLower.includes('titã') || eraLower.includes('titan')) return "bg-primary text-white";
    if (eraLower.includes('olímpic') || eraLower.includes('olimpic')) return "bg-gradient-gold text-primary";
    if (eraLower.includes('heroic') || eraLower.includes('herói')) return "bg-destructive text-white";
    return "bg-gradient-olympian text-white";
  };

  const toggleExpand = (eventId: string) => {
    setExpandedEvent(expandedEvent === eventId ? null : eventId);
  };

  return (
    <div className="min-h-screen bg-gradient-marble">
      {/* Header */}
      <section className="bg-gradient-olympian text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-5xl font-cinzel-decorative font-bold mb-4">
              Linha do Tempo
            </h1>
            <p className="text-xl text-gold font-cinzel mb-6">
              Cronologia da Mitologia Grega
            </p>
            <p className="text-lg text-white/90 font-cinzel max-w-3xl mx-auto">
              Acompanhe a evolução da mitologia grega desde o Caos primordial 
              até a era dos heróis. Uma jornada através das eras que moldaram 
              o panteão grego e suas lendas mais marcantes.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Overview */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card className="text-center p-6 bg-bronze/10 border-bronze">
              <Globe className="h-12 w-12 text-bronze mx-auto mb-4" />
              <h3 className="text-xl font-cinzel-decorative font-semibold text-primary mb-2">
                Tempo Primordial
              </h3>
              <p className="font-cinzel text-muted-foreground text-sm">
                Do Caos à criação do mundo
              </p>
            </Card>

            <Card className="text-center p-6 bg-primary/10 border-primary">
              <Crown className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-cinzel-decorative font-semibold text-primary mb-2">
                Era dos Titãs
              </h3>
              <p className="font-cinzel text-muted-foreground text-sm">
                Domínio dos Titãs e Cronos
              </p>
            </Card>

            <Card className="text-center p-6 bg-gold/10 border-gold">
              <Star className="h-12 w-12 text-gold mx-auto mb-4" />
              <h3 className="text-xl font-cinzel-decorative font-semibold text-primary mb-2">
                Era Olímpica
              </h3>
              <p className="font-cinzel text-muted-foreground text-sm">
                Reino de Zeus e os Olímpicos
              </p>
            </Card>

            <Card className="text-center p-6 bg-destructive/10 border-destructive">
              <Swords className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h3 className="text-xl font-cinzel-decorative font-semibold text-primary mb-2">
                Era Heroica
              </h3>
              <p className="font-cinzel text-muted-foreground text-sm">
                Tempo dos grandes heróis
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Timeline Events */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-cinzel-decorative font-bold text-primary mb-8 text-center">
              Eventos Principais
            </h2>
            
            {loading ? (
              <div className="text-center py-12">
                <Clock className="h-12 w-12 text-gold mx-auto mb-4 animate-spin" />
                <p className="text-xl font-cinzel text-muted-foreground">
                  Carregando linha do tempo...
                </p>
              </div>
            ) : (
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-bronze via-primary to-gold"></div>
                
                <div className="space-y-8">
                  {timelineEvents.map((event, index) => {
                    const IconComponent = getEraIcon(event.era);
                    const isExpanded = expandedEvent === event.id;
                  
                    return (
                      <div key={event.id} className="relative">
                        {/* Timeline Dot */}
                        <div className={`absolute left-6 w-4 h-4 rounded-full border-2 border-white ${getEraColor(event.era)}`}></div>
                        
                        {/* Event Card */}
                        <div className="ml-16">
                          <Card className="hover:shadow-olympian transition-all duration-300">
                            <CardHeader 
                              className="cursor-pointer"
                              onClick={() => toggleExpand(event.id)}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getEraColor(event.era)}`}>
                                    <IconComponent className="h-6 w-6" />
                                  </div>
                                  <div className="flex-1">
                                    <CardTitle className="font-cinzel-decorative text-xl text-primary">
                                      {event.nome}
                                    </CardTitle>
                                    <CardDescription className="font-cinzel font-semibold text-gold">
                                      {event.era || 'Era Desconhecida'} • {event.data_estimada || 'Data indefinida'}
                                    </CardDescription>
                                    {event.tipo && (
                                      <p className="text-sm text-muted-foreground font-cinzel mt-1">
                                        {event.tipo}
                                      </p>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Badge className={`font-cinzel ${getEraColor(event.era)}`}>
                                    {event.era || 'Era Desconhecida'}
                                  </Badge>
                                  {isExpanded ? (
                                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                                  ) : (
                                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                                  )}
                                </div>
                              </div>
                            </CardHeader>
                            
                            {isExpanded && (
                              <CardContent className="space-y-4">
                                <p className="font-cinzel text-muted-foreground leading-relaxed">
                                  {event.descricao}
                                </p>
                                
                                {event.personagens && event.personagens.length > 0 && (
                                  <div>
                                    <div className="flex items-center space-x-2 mb-2">
                                      <Users className="h-4 w-4 text-gold" />
                                      <span className="text-sm font-cinzel font-semibold text-primary">
                                        Personagens Envolvidos:
                                      </span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                      {event.personagens.map((personagem, idx) => (
                                        <Badge key={idx} variant="secondary" className="font-cinzel text-xs">
                                          {personagem}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                
                                {event.tags && event.tags.length > 0 && (
                                  <div>
                                    <div className="flex items-center space-x-2 mb-2">
                                      <Tag className="h-4 w-4 text-gold" />
                                      <span className="text-sm font-cinzel font-semibold text-primary">
                                        Tags:
                                      </span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                      {event.tags.map((tag, idx) => (
                                        <Badge key={idx} variant="outline" className="font-cinzel text-xs">
                                          {tag}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </CardContent>
                            )}
                          </Card>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Expand All Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-cinzel-decorative font-bold text-primary mb-6">
            Explore Mais Profundamente
          </h2>
          <p className="text-lg text-muted-foreground font-cinzel mb-8 max-w-2xl mx-auto">
            Cada era da mitologia grega possui suas próprias características únicas 
            e personagens marcantes. Explore cada categoria para entender melhor 
            a evolução do panteão grego.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="font-cinzel">
              Ver Todos os Eventos
            </Button>
            <Button size="lg" variant="outline" className="font-cinzel">
              Filtrar por Era
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TimelinePage;