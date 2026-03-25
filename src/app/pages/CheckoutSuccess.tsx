import { useNavigate } from "react-router";
import { Crown, Check, ArrowRight, Sparkles } from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

export function CheckoutSuccess() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // Redirect if not PRO
    if (!user || user.plan !== "pro") {
      navigate("/app");
    }
  }, [user, navigate]);

  if (!user || user.plan !== "pro") return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-slate-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <Card className="p-12 border-2 border-purple-300 bg-white text-center relative overflow-hidden">
          {/* Confetti effect background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 text-6xl animate-bounce">🎉</div>
            <div className="absolute top-20 right-10 text-4xl animate-pulse">✨</div>
            <div className="absolute bottom-20 left-20 text-5xl animate-bounce delay-100">🎊</div>
            <div className="absolute bottom-10 right-20 text-4xl animate-pulse delay-200">⭐</div>
          </div>

          <div className="relative z-10">
            {/* Crown icon with animation */}
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl shadow-2xl mb-6 animate-bounce">
              <Crown className="w-12 h-12 text-white" />
            </div>

            {/* Success message */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-bold mb-4">
                <Check className="w-4 h-4" />
                Pagamento Confirmado
              </div>
              
              <h1 className="text-4xl font-bold text-slate-900 mb-4">
                Bem-vindo ao PRO! 🎉
              </h1>
              
              <p className="text-lg text-slate-600 mb-2">
                Sua conta foi atualizada com sucesso
              </p>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 border-2 border-purple-200 rounded-xl">
                <Crown className="w-5 h-5 text-purple-600" />
                <span className="font-bold text-purple-900">
                  {user.name} • Plano PRO
                </span>
              </div>
            </div>

            {/* Benefits unlocked */}
            <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <h3 className="font-bold text-slate-900">Recursos Desbloqueados:</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-3 text-left">
                {[
                  "Simulador de Preço Ideal",
                  "Simulador de Lucro",
                  "Propostas ilimitadas",
                  "Templates premium",
                  "Exportação em PDF",
                  "Histórico completo",
                  "Suporte prioritário",
                  "Novos recursos"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* CTAs */}
            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white h-14 text-lg"
                onClick={() => navigate("/app")}
              >
                Explorar todos os recursos
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="w-full border-2"
                onClick={() => navigate("/app/preco")}
              >
                Testar Simulador de Preço
              </Button>
            </div>

            {/* Thank you message */}
            <div className="mt-8 pt-8 border-t border-slate-200">
              <p className="text-sm text-slate-600">
                Obrigado por confiar no <strong>Hub do Empreendedor</strong>! 💜<br />
                Estamos aqui para ajudar seu negócio a crescer.
              </p>
            </div>
          </div>
        </Card>

        {/* Support info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-600">
            Precisa de ajuda? Entre em contato pelo{" "}
            <a href="mailto:suporte@hubempreendedor.com" className="text-purple-600 hover:text-purple-700 font-semibold">
              suporte@hubempreendedor.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
