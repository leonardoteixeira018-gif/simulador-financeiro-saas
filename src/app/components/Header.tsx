import { Calculator, Menu, X, LogIn } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

interface HeaderProps {
  onScrollToSimulator: () => void;
}

export function Header({ onScrollToSimulator }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-slate-200 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">
              Hub do Empreendedor
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#simulador"
              className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
              onClick={(e) => {
                e.preventDefault();
                onScrollToSimulator();
              }}
            >
              Simulador
            </a>
            <a
              href="#beneficios"
              className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
            >
              Benefícios
            </a>
            <button
              className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
              onClick={() => navigate("/pricing")}
            >
              Planos
            </button>
            
            {isAuthenticated ? (
              <Button
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                onClick={() => navigate("/app")}
              >
                Acessar Dashboard
              </Button>
            ) : (
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  onClick={() => navigate("/login")}
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Entrar
                </Button>
                <Button
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  onClick={() => navigate("/signup")}
                >
                  Criar Conta
                </Button>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-600 hover:text-slate-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <nav className="flex flex-col gap-4">
              <a
                href="#simulador"
                className="text-slate-600 hover:text-slate-900 font-medium transition-colors py-2"
                onClick={(e) => {
                  e.preventDefault();
                  onScrollToSimulator();
                  setMobileMenuOpen(false);
                }}
              >
                Simulador
              </a>
              <a
                href="#beneficios"
                className="text-slate-600 hover:text-slate-900 font-medium transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Benefícios
              </a>
              <button
                className="text-slate-600 hover:text-slate-900 font-medium transition-colors py-2 text-left"
                onClick={() => {
                  navigate("/pricing");
                  setMobileMenuOpen(false);
                }}
              >
                Planos
              </button>
              
              {isAuthenticated ? (
                <Button
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white w-full mt-2"
                  onClick={() => {
                    navigate("/app");
                    setMobileMenuOpen(false);
                  }}
                >
                  Acessar Dashboard
                </Button>
              ) : (
                <div className="flex flex-col gap-2 mt-2">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      navigate("/login");
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Entrar
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white w-full"
                    onClick={() => {
                      navigate("/signup");
                      setMobileMenuOpen(false);
                    }}
                  >
                    Criar Conta
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}