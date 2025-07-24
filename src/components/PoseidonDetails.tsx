import { useState } from 'react';
import { Waves, Mic, MicOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

// Speech Recognition types
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface PoseidonData {
  id: string;
  nome: string;
  categoria: string;
  descricao: string;
  dominios: string[];
  poderes: string[];
  simbolos: string[];
  tags: string[];
}

const PoseidonDetails = () => {
  const [poseidon, setPoseidon] = useState<PoseidonData | null>(null);
  const [loading, setLoading] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [curiosity, setCuriosity] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const { toast } = useToast();

  const fetchPoseidonData = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('poseidon-details', {
        body: { action: 'get_poseidon' },
        headers: {
          'Authorization': `Bearer ${import.meta.env.VER_MAIS_POSEIDON || 'VER_MAIS_POSEIDON'}`
        }
      });

      if (error) throw error;
      
      if (data?.poseidon) {
        setPoseidon(data.poseidon);
        toast({
          title: "Dados carregados!",
          description: "Informações sobre Poseidon foram carregadas com sucesso.",
        });
      }
    } catch (error) {
      console.error('Error fetching Poseidon data:', error);
      toast({
        title: "Erro ao carregar",
        description: "Não foi possível carregar os dados de Poseidon.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        title: "Não suportado",
        description: "Seu navegador não suporta reconhecimento de voz.",
        variant: "destructive",
      });
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const newRecognition = new SpeechRecognition();
    
    newRecognition.lang = 'pt-BR';
    newRecognition.continuous = false;
    newRecognition.interimResults = false;

    newRecognition.onstart = () => {
      setIsListening(true);
      setTranscription('');
      setCuriosity('');
    };

    newRecognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript;
      setTranscription(transcript);
      
      // Get curiosity from Gemini
      try {
        const { data, error } = await supabase.functions.invoke('poseidon-details', {
          body: { action: 'get_curiosity', transcribedText: transcript },
          headers: {
            'Authorization': `Bearer ${import.meta.env.VER_MAIS_POSEIDON || 'VER_MAIS_POSEIDON'}`
          }
        });

        if (error) throw error;
        
        if (data?.curiosity) {
          setCuriosity(data.curiosity);
        }
      } catch (error) {
        console.error('Error getting curiosity:', error);
        toast({
          title: "Erro na curiosidade",
          description: "Não foi possível gerar uma curiosidade.",
          variant: "destructive",
        });
      }
    };

    newRecognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      toast({
        title: "Erro no reconhecimento",
        description: "Houve um erro ao reconhecer sua fala. Tente novamente.",
        variant: "destructive",
      });
      setIsListening(false);
    };

    newRecognition.onend = () => {
      setIsListening(false);
    };

    setRecognition(newRecognition);
    newRecognition.start();
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card className="bg-gradient-olympian text-white border-gold shadow-olympian overflow-hidden">
        <CardHeader className="relative">
          <div className="absolute top-4 right-4">
            <Waves className="h-12 w-12 text-gold opacity-80" />
          </div>
          <CardTitle className="font-cinzel-decorative text-3xl flex items-center gap-3">
            <Waves className="h-8 w-8 text-gold" />
            Poseidon - Senhor dos Mares
          </CardTitle>
          <CardDescription className="text-gold font-cinzel text-lg">
            Deus dos Oceanos, Terremotos e Cavalos
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {!poseidon ? (
            <div className="text-center py-8">
              <Button 
                onClick={fetchPoseidonData}
                disabled={loading}
                className="bg-gradient-gold text-primary hover:bg-gold-dark shadow-gold font-cinzel text-lg px-8 py-3"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Carregando...
                  </>
                ) : (
                  'Ver Mais sobre Poseidon'
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Description */}
              <div>
                <h3 className="font-cinzel-decorative text-xl text-gold mb-3">Descrição</h3>
                <p className="font-cinzel text-white/90 leading-relaxed">
                  {poseidon.descricao}
                </p>
              </div>

              {/* Domains */}
              <div>
                <h3 className="font-cinzel-decorative text-xl text-gold mb-3">Domínios</h3>
                <div className="flex flex-wrap gap-2">
                  {poseidon.dominios.map((dominio, index) => (
                    <Badge key={index} variant="secondary" className="bg-gold text-primary font-cinzel">
                      {dominio}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Powers */}
              <div>
                <h3 className="font-cinzel-decorative text-xl text-gold mb-3">Poderes</h3>
                <div className="flex flex-wrap gap-2">
                  {poseidon.poderes.map((poder, index) => (
                    <Badge key={index} variant="outline" className="border-gold text-gold font-cinzel">
                      {poder}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Symbols */}
              <div>
                <h3 className="font-cinzel-decorative text-xl text-gold mb-3">Símbolos</h3>
                <p className="font-cinzel text-white/90">
                  {poseidon.simbolos.join(" • ")}
                </p>
              </div>
            </div>
          )}

          {/* Voice Recognition Section */}
          {poseidon && (
            <div className="border-t border-gold/30 pt-6 space-y-4">
              <h3 className="font-cinzel-decorative text-xl text-gold">
                Fale sobre Poseidon e descubra curiosidades!
              </h3>
              
              <div className="flex gap-3">
                <Button
                  onClick={isListening ? stopListening : startListening}
                  disabled={loading}
                  variant={isListening ? "destructive" : "secondary"}
                  className="font-cinzel"
                >
                  {isListening ? (
                    <>
                      <MicOff className="mr-2 h-4 w-4" />
                      Parar Gravação
                    </>
                  ) : (
                    <>
                      <Mic className="mr-2 h-4 w-4" />
                      Gravar Pergunta
                    </>
                  )}
                </Button>
              </div>

              {/* Transcription */}
              {transcription && (
                <div className="bg-background/10 rounded-lg p-4 border border-gold/30">
                  <h4 className="font-cinzel-decorative text-gold mb-2">Você disse:</h4>
                  <p className="font-cinzel text-white/90 italic">"{transcription}"</p>
                </div>
              )}

              {/* Curiosity */}
              {curiosity && (
                <div className="bg-gradient-gold/20 rounded-lg p-4 border border-gold">
                  <h4 className="font-cinzel-decorative text-gold mb-2 flex items-center gap-2">
                    💡 Curiosidade sobre Poseidon:
                  </h4>
                  <p className="font-cinzel text-white leading-relaxed">
                    {curiosity}
                  </p>
                </div>
              )}

              {isListening && (
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 text-gold font-cinzel">
                    <div className="w-3 h-3 bg-gold rounded-full animate-pulse"></div>
                    Ouvindo... Fale agora!
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PoseidonDetails;