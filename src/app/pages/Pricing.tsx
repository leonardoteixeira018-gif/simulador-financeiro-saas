import { useNavigate } from "react-router";
import { Check, Zap, Crown, ArrowRight } from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { useAuth } from "../contexts/AuthContext";

export function Pricing() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const handleSelectPlan = (planType: "free" | "pro") => {
    if (!isAuthenticated) {
      navigate("/signup");
      return;
    }

    if (planType === "pro") {
      navigate("/checkout");
    } else {
      navigate("/app");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-slate-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-purple-100 text-purple-700 border-purple-200 mb-4">
            Planos e Preços
          </Badge>
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            Escolha o plano ideal para você
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Comece grátis e faça upgrade quando precisar de mais recursos
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <Card className="p-8 border-2 border-slate-200 hover:border-slate-300 transition-all">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-slate-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Gratuito</h3>
                  <p className="text-sm text-slate-600">Para começar</p>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-slate-900">R$ 0</span>
                  <span className="text-slate-600">/mês</span>
                </div>
                <p className="text-sm text-slate-600 mt-2">Para sempre grátis</p>
              </div>

              <Button
                size="lg"
                variant="outline"
                className="w-full border-2 h-12"
                onClick={() => handleSelectPlan("free")}
                disabled={user?.plan === "free"}
              >
                {user?.plan === "free" ? "Plano Atual" : "Começar Grátis"}
              </Button>
            </div>

            <div className="space-y-4">
              <p className="font-bold text-slate-900 text-sm">O que está incluso:</p>
              <ul className="space-y-3">
                {[
                  "Simulador MEI → ME ilimitado",
                  "Fluxo de Caixa: 30 lançamentos/mês",
                  "2 propostas comerciais por dia",
                  "Acesso ao dashboard",
                  "Suporte por email"
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          {/* PRO Plan */}
          <Card className="p-8 border-2 border-purple-300 bg-gradient-to-br from-purple-50 to-blue-50 hover:shadow-2xl transition-all relative overflow-hidden">
            {/* Popular badge */}
            <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
              MAIS POPULAR
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">PRO</h3>
                  <p className="text-sm text-purple-700">Acesso completo</p>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    R$ 9,90
                  </span>
                  <span className="text-slate-600">/mês</span>
                </div>
                <div className="bg-yellow-100 border-2 border-yellow-300 rounded-lg px-3 py-2 inline-block">
                  <p className="text-sm font-bold text-yellow-900">
                    🔥 Apenas no 1º mês • Depois R$ 29,90/mês
                  </p>
                </div>
                <p className="text-sm text-green-700 font-medium mt-3">
                  ✓ Cancele quando quiser
                </p>
              </div>

              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white h-12 shadow-lg"
                onClick={() => handleSelectPlan("pro")}
                disabled={user?.plan === "pro"}
              >
                {user?.plan === "pro" ? (
                  <>
                    <Crown className="w-4 h-4 mr-2" />
                    Plano Atual
                  </>
                ) : (
                  <>
                    Assinar Plano PRO
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </Button>
            </div>

            <div className="space-y-4">
              <p className="font-bold text-slate-900 text-sm">Tudo do Gratuito, mais:</p>
              <ul className="space-y-3">
                {[
                  "Fluxo de Caixa: lançamentos ilimitados",
                  "Simulador de Preço Ideal ilimitado",
                  "Simulador de Lucro com projeções",
                  "Propostas comerciais ilimitadas",
                  "Templates premium de propostas",
                  "Exportação em PDF profissional",
                  "Histórico completo de simulações",
                  "Suporte prioritário via WhatsApp",
                  "Acesso antecipado a novos recursos"
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Highlight box */}
            <div className="mt-6 bg-white rounded-xl p-4 border-2 border-purple-200">
              <p className="text-sm font-bold text-purple-900 mb-2">
                🎁 Oferta de Lançamento
              </p>
              <p className="text-sm text-slate-700">
                Primeiro mês por apenas <strong className="text-purple-700">R$ 9,90</strong>, depois R$ 29,90/mês. Cancele quando quiser!
              </p>
            </div>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">
            Perguntas Frequentes
          </h2>
          
          <div className="space-y-4">
            {[
              {
                q: "Posso cancelar a qualquer momento?",
                a: "Sim! Você pode cancelar seu plano PRO a qualquer momento, sem multas ou taxas."
              },
              {
                q: "Como funciona o pagamento?",
                a: "Aceitamos pagamento via Pix. Após a confirmação, seu acesso PRO é liberado instantaneamente."
              },
              {
                q: "Posso testar antes de assinar?",
                a: "Sim! O plano gratuito te dá acesso ao Simulador MEI→ME e 2 propostas por dia. Faça upgrade quando precisar."
              },
              {
                q: "Há garantia de reembolso?",
                a: "Sim! Oferecemos 7 dias de garantia. Se não ficar satisfeito, devolvemos 100% do valor."
              }
            ].map((faq, index) => (
              <Card key={index} className="p-6 border-2 border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">{faq.q}</h3>
                <p className="text-slate-600">{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card className="p-8 bg-gradient-to-r from-purple-600 to-blue-600 border-0 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ainda tem dúvidas?
            </h2>
            <p className="text-purple-100 mb-6 text-lg">
              Comece gratuitamente e veja como o Hub do Empreendedor pode transformar seu negócio
            </p>
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-slate-50 h-12 px-8"
              onClick={() => navigate(isAuthenticated ? "/app" : "/signup")}
            >
              {isAuthenticated ? "Ir para o Dashboard" : "Criar Conta Grátis"}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}