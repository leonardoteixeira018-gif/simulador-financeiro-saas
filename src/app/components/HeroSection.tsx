import { ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";

interface HeroSectionProps {
  onScrollToSimulator: () => void;
}

export function HeroSection({ onScrollToSimulator }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-purple-50/30 pt-20 pb-32">
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
              <TrendingUp className="w-4 h-4" />
              Ferramenta gratuita
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
              Descubra quando sair do MEI e pagar{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                menos impostos
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 leading-relaxed">
              Simule e compare quanto você pagaria como MEI vs Microempresa.
              Tome decisões inteligentes baseadas em dados reais e economize milhares por ano.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 text-lg"
                onClick={onScrollToSimulator}
              >
                Simular agora gratuitamente
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="border-2 px-8 py-6 text-lg"
                onClick={onScrollToSimulator}
              >
                Ver exemplo
              </Button>
            </div>
            
            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-slate-900">5.000+</div>
                <div className="text-sm text-slate-600">Simulações realizadas</div>
              </div>
              <div className="w-px h-12 bg-slate-300" />
              <div>
                <div className="text-3xl font-bold text-slate-900">R$ 2,3M</div>
                <div className="text-sm text-slate-600">Economizados em impostos</div>
              </div>
            </div>
          </div>
          
          {/* Visual Element */}
          <div className="relative">
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-slate-200">
              {/* Mini Dashboard Preview */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">Seu faturamento</span>
                  <span className="text-2xl font-bold text-slate-900">R$ 8.500</span>
                </div>
                
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full" style={{ width: '65%' }} />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-red-50 rounded-2xl p-4 border border-red-100">
                    <div className="text-xs text-red-600 font-medium mb-1">MEI</div>
                    <div className="text-2xl font-bold text-red-700">R$ 810</div>
                    <div className="text-xs text-red-600 mt-1">impostos/mês</div>
                  </div>
                  
                  <div className="bg-green-50 rounded-2xl p-4 border border-green-200 relative">
                    <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      Melhor
                    </div>
                    <div className="text-xs text-green-600 font-medium mb-1">ME</div>
                    <div className="text-2xl font-bold text-green-700">R$ 520</div>
                    <div className="text-xs text-green-600 mt-1">impostos/mês</div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-4 border border-purple-200">
                  <div className="text-sm font-medium text-purple-900">
                    💰 Economia anual projetada
                  </div>
                  <div className="text-3xl font-bold text-purple-700 mt-2">
                    R$ 3.480
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg p-4 border border-slate-200 transform rotate-3">
              <div className="text-xs text-slate-600">Tempo até o limite</div>
              <div className="text-xl font-bold text-slate-900">8 meses</div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-lg p-4 text-white transform -rotate-3">
              <div className="text-xs opacity-90">Crescimento</div>
              <div className="text-xl font-bold">+25%</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
