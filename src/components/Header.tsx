import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const navItems = [
    { name: "Olimpianos", path: "/olimpo", description: "Os Doze Deuses Olímpicos" },
    { name: "Menores", path: "/menores", description: "Divindades Menores" },
    { name: "Primordiais", path: "/primordiais", description: "Seres Primordiais" },
    { name: "Heróis", path: "/herois", description: "Heróis Lendários" },
    { name: "Blog", path: "/blog", description: "Narrativas Mitológicas" },
    { name: "Linha do Tempo", path: "/timeline", description: "Cronologia Mítica" },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <header className="bg-gradient-olympian shadow-olympian sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center">
              <span className="text-2xl font-cinzel-decorative font-bold text-primary">Μ</span>
            </div>
            <div>
              <h1 className="text-2xl font-cinzel-decorative font-bold text-primary-foreground">
                Mythos Portal
              </h1>
              <p className="text-sm text-gold opacity-90 font-cinzel">
                Mitologia Grega Educacional
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-md font-cinzel font-medium transition-all duration-300 ${
                  isActivePath(item.path)
                    ? "bg-gold text-primary shadow-gold"
                    : "text-primary-foreground hover:bg-white/10 hover:text-gold"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:flex relative">
              <Input
                type="text"
                placeholder="Buscar entidades..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 bg-white/10 border-white/20 text-primary-foreground placeholder:text-white/60 font-cinzel"
              />
              <Button
                size="sm"
                variant="ghost"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 text-primary-foreground hover:bg-white/10"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-primary-foreground hover:bg-white/10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-white/20 py-4">
            <div className="flex flex-col space-y-2">
              {/* Mobile Search */}
              <div className="relative mb-4">
                <Input
                  type="text"
                  placeholder="Buscar entidades..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/10 border-white/20 text-primary-foreground placeholder:text-white/60 font-cinzel"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 text-primary-foreground hover:bg-white/10"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>

              {/* Mobile Navigation */}
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-4 py-3 rounded-md font-cinzel transition-all duration-300 ${
                    isActivePath(item.path)
                      ? "bg-gold text-primary shadow-gold"
                      : "text-primary-foreground hover:bg-white/10"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm opacity-75">{item.description}</div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;