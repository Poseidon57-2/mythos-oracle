import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen, Calendar, Clock } from "lucide-react";
import { blogPosts } from "@/data/mockData";

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredPosts = blogPosts.filter(post => 
    post.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.resumo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getPostCategoryColor = (tags: string[]) => {
    if (tags.includes('guerra')) return 'bg-bronze text-white';
    if (tags.includes('heroi') || tags.includes('hercules')) return 'bg-gradient-gold text-primary';
    if (tags.includes('deuses') || tags.includes('olimpo')) return 'bg-gradient-olympian text-white';
    return 'bg-secondary text-secondary-foreground';
  };

  return (
    <div className="min-h-screen bg-gradient-marble">
      {/* Header */}
      <section className="bg-gradient-olympian text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-5xl font-cinzel-decorative font-bold mb-4">
              Blog Mitológico
            </h1>
            <p className="text-xl text-gold font-cinzel mb-6">
              Narrativas e Histórias da Mitologia Grega
            </p>
            <p className="text-lg text-white/90 font-cinzel max-w-3xl mx-auto">
              Mergulhe nas fascinantes narrativas da mitologia grega através de artigos 
              detalhados sobre épicos, lendas e os grandes feitos de deuses e heróis. 
              Cada história é contada com riqueza de detalhes e contexto histórico.
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
                placeholder="Buscar artigos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 font-cinzel"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {filteredPosts.length > 0 && (
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-cinzel-decorative font-bold text-primary mb-6 text-center">
                Artigo em Destaque
              </h2>
              <Card className="overflow-hidden shadow-olympian">
                <div className="md:flex">
                  <div className="md:w-1/3 bg-gradient-olympian flex items-center justify-center p-8">
                    <BookOpen className="h-24 w-24 text-gold" />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground font-cinzel">
                        {formatDate(filteredPosts[0].data_publicacao)}
                      </span>
                    </div>
                    <h3 className="text-2xl font-cinzel-decorative font-bold text-primary mb-3">
                      {filteredPosts[0].titulo}
                    </h3>
                    <p className="text-muted-foreground font-cinzel mb-4 leading-relaxed">
                      {filteredPosts[0].resumo}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {filteredPosts[0].tags.map((tag, index) => (
                        <Badge 
                          key={index} 
                          className={`font-cinzel ${getPostCategoryColor(filteredPosts[0].tags)}`}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button asChild className="font-cinzel">
                      <Link to={`/blog/${filteredPosts[0].id}`}>
                        Ler Artigo Completo
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Posts Grid */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-cinzel-decorative font-bold text-primary mb-8 text-center">
            Todos os Artigos
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.slice(1).map((post) => (
              <Card key={post.id} className="group hover:shadow-olympian transition-all duration-300 overflow-hidden">
                <div className="relative h-48 bg-gradient-gold flex items-center justify-center">
                  <BookOpen className="h-16 w-16 text-primary" />
                  <div className="absolute top-4 right-4">
                    <Badge className={`font-cinzel ${getPostCategoryColor(post.tags)}`}>
                      Artigo
                    </Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground font-cinzel">
                      {formatDate(post.data_publicacao)}
                    </span>
                  </div>
                  <CardTitle className="font-cinzel-decorative text-xl text-primary">
                    {post.titulo}
                  </CardTitle>
                  <CardDescription className="font-cinzel">
                    {post.resumo}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs font-cinzel">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button asChild variant="outline" className="w-full font-cinzel">
                    <Link to={`/blog/${post.id}`}>
                      Ler Mais
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground font-cinzel">
                Nenhum artigo encontrado com os critérios de busca.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-cinzel-decorative font-bold text-primary mb-4">
              Categorias de Histórias
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card className="text-center p-6 hover:shadow-gold transition-all duration-300">
              <h3 className="text-lg font-cinzel-decorative font-semibold text-primary mb-2">
                Épicos Heroicos
              </h3>
              <p className="font-cinzel text-muted-foreground text-sm">
                Grandes aventuras e jornadas heroicas
              </p>
            </Card>

            <Card className="text-center p-6 hover:shadow-gold transition-all duration-300">
              <h3 className="text-lg font-cinzel-decorative font-semibold text-primary mb-2">
                Guerras Lendárias
              </h3>
              <p className="font-cinzel text-muted-foreground text-sm">
                Conflitos épicos da antiguidade
              </p>
            </Card>

            <Card className="text-center p-6 hover:shadow-gold transition-all duration-300">
              <h3 className="text-lg font-cinzel-decorative font-semibold text-primary mb-2">
                Origem dos Deuses
              </h3>
              <p className="font-cinzel text-muted-foreground text-sm">
                Cosmogonia e nascimento divino
              </p>
            </Card>

            <Card className="text-center p-6 hover:shadow-gold transition-all duration-300">
              <h3 className="text-lg font-cinzel-decorative font-semibold text-primary mb-2">
                Amores Divinos
              </h3>
              <p className="font-cinzel text-muted-foreground text-sm">
                Romances e tragédias dos deuses
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;