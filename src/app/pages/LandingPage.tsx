import { useNavigate } from "react-router";
import { Header } from "../components/Header";
import { HeroSection } from "../components/HeroSection";
import { BenefitsSection } from "../components/BenefitsSection";
import { TestimonialsSection } from "../components/TestimonialsSection";
import { CTASection } from "../components/CTASection";
import { Footer } from "../components/Footer";
import { Button } from "../components/ui/button";
import { ArrowRight, Check, Crown, Lock } from "lucide-react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { useAuth } from "../contexts/AuthContext";

export function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const scrollToSimulator = () => {
    navigate("/app/mei-me");
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onScrollToSimulator={scrollToSimulator} />
      
      <main className="pt-16">
        <HeroSection onScrollToSimulator={scrollToSimulator} />
        
        {/* Quick Access to Platform */}
        <section className="py-16 bg-gradient-to-br from-slate-50 to-purple-50/30">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <Badge className="bg-purple-100 text-purple-700 border-purple-200 mb-4">
                Ferramentas Completas
              </Badge>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Controle Financeiro Completo
              </h2>
              <p className="text-lg text-slate-600">
                {isAuthenticated 
                  ? "Acesse o dashboard para gerenciar suas finanças"
                  : "Cadastre-se grátis e comece a controlar seu fluxo de caixa agora"}
              </p>
            </div>

            {/* Highlight Fluxo de Caixa */}
            <Card className="mb-8 p-8 border-2 border-purple-300 bg-gradient-to-br from-purple-50 to-blue-50">
              <div className="flex items-start gap-6 flex-wrap">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-2xl font-bold text-slate-900">Fluxo de Caixa Inteligente</h3>
                    <Badge className="bg-green-200 text-green-700 border-green-300">
                      NOVO!
                    </Badge>
                  </div>
                  <p className="text-slate-700 mb-4">
                    Registre entradas e saídas, veja insights automáticos e tome decisões baseadas em dados reais do seu negócio. 
                    <strong> Simples como um caderno, inteligente como um contador.</strong>
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>30 lançamentos/mês grátis</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>Alertas automáticos</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>Categorias pré-definidas</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>Sem planilhas complicadas</span>
                    </div>
                  </div>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    onClick={() => navigate(isAuthenticated ? "/app" : "/signup")}
                  >
                    {isAuthenticated ? "Acessar Fluxo de Caixa" : "Começar Grátis"}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </div>
            </Card>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Free Tool */}
              <Card className="p-6 border-2 border-green-300 bg-green-50">
                <Badge className="bg-green-200 text-green-700 border-green-300 mb-3">
                  GRÁTIS
                </Badge>
                <h3 className="font-bold text-slate-900 mb-2">Simulador MEI → ME</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Compare impostos sem cadastro
                </p>
                <Button
                  className="w-full"
                  onClick={() => navigate("/app/mei-me")}
                >
                  Simular Grátis
                </Button>
              </Card>

              {/* Free with signup */}
              <Card className="p-6 border-2 border-blue-300 bg-blue-50">
                <Badge className="bg-blue-200 text-blue-700 border-blue-300 mb-3">
                  GRÁTIS
                </Badge>
                <h3 className="font-bold text-slate-900 mb-2">Gerador de Propostas</h3>
                <p className="text-sm text-slate-600 mb-4">
                  2 propostas por dia gratuitamente
                </p>
                <Button
                  variant="outline"
                  className="w-full border-2"
                  onClick={() => navigate(isAuthenticated ? "/app/propostas" : "/signup")}
                >
                  {isAuthenticated ? "Acessar" : "Criar Conta"}
                </Button>
              </Card>

              {/* PRO Tools */}
              <Card className="p-6 border-2 border-purple-300 bg-gradient-to-br from-purple-50 to-blue-50 relative">
                <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 mb-3">
                  <Crown className="w-3 h-3 mr-1" />
                  PRO
                </Badge>
                <h3 className="font-bold text-slate-900 mb-2">Simuladores PRO</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Preço Ideal + Lucro ilimitados
                </p>
                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  onClick={() => navigate("/pricing")}
                >
                  Ver Planos
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Card>
            </div>

            <div className="text-center">
              <Button
                size="lg"
                className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-6 text-lg"
                onClick={() => navigate(isAuthenticated ? "/app" : "/signup")}
              >
                {isAuthenticated ? "Ir para o Dashboard" : "Criar Conta Grátis"}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </section>
        
        <BenefitsSection />
        <TestimonialsSection />
        <CTASection onScrollToSimulator={scrollToSimulator} />
      </main>
      
      <Footer />
    </div>
  );
}