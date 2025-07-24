import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Scroll, BookOpen, Crown, Sword, Clock } from "lucide-react";
import heroImage from "@/assets/hero-temple.jpg";

const HomePage = () => {
  const categories = [
    {
      title: "Deuses Olímpicos",
      description: "Os doze principais deuses do panteão grego",
      icon: Crown,
      path: "/olimpo",
      color: "bg-gradient-gold",
      count: "12 Divindades"
    },
    {
      title: "Divindades Menores", 
      description: "Ninfas, sátiros e outras divindades",
      icon: Scroll,
      path: "/menores", 
      color: "bg-primary",
      count: "50+ Entidades"
    },
    {
      title: "Seres Primordiais",
      description: "As primeiras forças cósmicas",
      icon: BookOpen,
      path: "/primordiais",
      color: "bg-bronze",
      count: "8 Primordiais"
    },
    {
      title: "Heróis Lendários",
      description: "Grandes heróis e suas aventuras épicas", 
      icon: Sword,
      path: "/herois",
      color: "bg-gradient-olympian",
      count: "25+ Heróis"
    }
  ];

  const features = [
    {
      title: "Narrativas Épicas",
      description: "Explore as grandes histórias da mitologia grega com detalhes ricos e contexto histórico.",
      icon: BookOpen
    },
    {
      title: "Linha do Tempo",
      description: "Acompanhe a cronologia dos eventos mitológicos desde a criação até a era heroica.",
      icon: Clock
    },
    {
      title: "Conexões Familiares",
      description: "Entenda as complexas relações entre deuses, titãs e heróis através de árvores genealógicas.",
      icon: Users
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-[70vh] flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-primary/60"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-cinzel-decorative font-bold text-white mb-6">
            Mythos Portal
          </h1>
          <p className="text-xl md:text-2xl text-gold mb-8 font-cinzel">
            Explore a rica mitologia grega através de um portal educacional completo
          </p>
          <p className="text-lg text-white/90 mb-8 font-cinzel max-w-2xl mx-auto">
            Descubra deuses, heróis e seres lendários da Grécia Antiga. 
            Uma jornada educativa através das narrativas mais fascinantes da humanidade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-gradient-gold hover:bg-gold-dark text-primary font-cinzel font-semibold">
              <Link to="/olimpo">Explorar Olimpo</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-primary font-cinzel">
              <Link to="/herois">Conhecer Heróis</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-marble">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-cinzel-decorative font-bold text-primary mb-4">
              Explore por Categoria
            </h2>
            <p className="text-xl text-muted-foreground font-cinzel max-w-2xl mx-auto">
              Mergulhe nas diferentes hierarquias do panteão grego e descubra suas histórias únicas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="group hover:shadow-olympian transition-all duration-300 border-border/50">
                <CardHeader className="text-center pb-2">
                  <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="font-cinzel-decorative text-primary">{category.title}</CardTitle>
                  <CardDescription className="font-cinzel">{category.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground font-cinzel mb-4">{category.count}</p>
                  <Button asChild variant="outline" className="w-full font-cinzel">
                    <Link to={category.path}>Explorar</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-cinzel-decorative font-bold text-primary mb-4">
              Recursos Educacionais
            </h2>
            <p className="text-xl text-muted-foreground font-cinzel max-w-2xl mx-auto">
              Ferramentas pensadas para enriquecer seu aprendizado sobre mitologia grega
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-cinzel-decorative font-semibold text-primary mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground font-cinzel leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-olympian text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-cinzel-decorative font-bold mb-4">
            Comece Sua Jornada Mitológica
          </h2>
          <p className="text-xl mb-8 font-cinzel opacity-90 max-w-2xl mx-auto">
            Desde os primórdios do cosmos até as aventuras heroicas, 
            descubra como a mitologia grega moldou nossa cultura
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-gold hover:bg-gold-dark text-primary font-cinzel font-semibold">
              <Link to="/timeline">Ver Linha do Tempo</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-primary font-cinzel">
              <Link to="/blog">Ler Narrativas</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;