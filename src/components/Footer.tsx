import { Link } from "react-router-dom";
import { Scroll, BookOpen, Users, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-olympian text-primary-foreground mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-gold rounded-full flex items-center justify-center">
                <span className="text-xl font-cinzel-decorative font-bold text-primary">Μ</span>
              </div>
              <h3 className="text-xl font-cinzel-decorative font-bold">Mythos Portal</h3>
            </div>
            <p className="text-sm text-white/80 font-cinzel leading-relaxed">
              Portal educacional dedicado ao estudo da rica mitologia grega, 
              explorando deuses, heróis e seres lendários da antiguidade clássica.
            </p>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="text-lg font-cinzel-decorative font-semibold text-gold">
              Categorias
            </h4>
            <ul className="space-y-2 font-cinzel">
              <li>
                <Link 
                  to="/olimpo" 
                  className="flex items-center space-x-2 text-white/80 hover:text-gold transition-colors"
                >
                  <Users className="h-4 w-4" />
                  <span>Deuses Olímpicos</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/menores" 
                  className="flex items-center space-x-2 text-white/80 hover:text-gold transition-colors"
                >
                  <Scroll className="h-4 w-4" />
                  <span>Divindades Menores</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/primordiais" 
                  className="flex items-center space-x-2 text-white/80 hover:text-gold transition-colors"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Seres Primordiais</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/herois" 
                  className="flex items-center space-x-2 text-white/80 hover:text-gold transition-colors"
                >
                  <Users className="h-4 w-4" />
                  <span>Heróis Lendários</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-lg font-cinzel-decorative font-semibold text-gold">
              Recursos
            </h4>
            <ul className="space-y-2 font-cinzel">
              <li>
                <Link 
                  to="/blog" 
                  className="flex items-center space-x-2 text-white/80 hover:text-gold transition-colors"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Blog Mitológico</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/timeline" 
                  className="flex items-center space-x-2 text-white/80 hover:text-gold transition-colors"
                >
                  <Clock className="h-4 w-4" />
                  <span>Linha do Tempo</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Educational Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-cinzel-decorative font-semibold text-gold">
              Educacional
            </h4>
            <div className="text-sm text-white/80 font-cinzel space-y-2">
              <p>
                Conteúdo baseado em fontes clássicas como Hesíodo, Homero e Ovídio.
              </p>
              <p>
                Ideal para estudantes de História, Literatura Clássica e Cultura Grega.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-sm text-white/60 font-cinzel">
            © 2024 Mythos Portal. Portal educacional sobre Mitologia Grega.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;