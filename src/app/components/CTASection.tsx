import { ArrowRight, Calculator } from "lucide-react";
import { Button } from "./ui/button";

interface CTASectionProps {
  onScrollToSimulator: () => void;
}

export function CTASection({ onScrollToSimulator }: CTASectionProps) {
  return (
    <section className="py-24 bg-gradient-to-br from-purple-600 via-blue-600 to-purple-700 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-grid-white" />
      </div>
      
      <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Pronto para economizar em impostos?
        </h2>
        
        <p className="text-xl text-purple-100 mb-10 max-w-3xl mx-auto leading-relaxed">
          Faça sua simulação gratuita agora e descubra se vale a pena migrar do MEI para ME. 
          Leva menos de 2 minutos e pode economizar milhares de reais por ano.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="bg-white text-purple-600 hover:bg-slate-50 px-10 py-7 text-lg font-bold shadow-2xl hover:shadow-xl transition-all hover:scale-105"
            onClick={onScrollToSimulator}
          >
            <Calculator className="mr-2 w-6 h-6" />
            Fazer simulação gratuita
            <ArrowRight className="ml-2 w-6 h-6" />
          </Button>
        </div>
        
        <div className="mt-10 flex flex-wrap justify-center gap-8 text-white/90">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">100% gratuito</span>
          </div>
          
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">Sem cadastro</span>
          </div>
          
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">Resultado instantâneo</span>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl" />
    </section>
  );
}
