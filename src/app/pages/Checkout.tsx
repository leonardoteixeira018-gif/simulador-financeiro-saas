import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Copy, Check, QrCode, Clock, ArrowLeft, Crown } from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Alert, AlertDescription } from "../components/ui/alert";
import { useAuth } from "../contexts/AuthContext";

export function Checkout() {
  const [copied, setCopied] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "processing" | "confirmed">("pending");
  const navigate = useNavigate();
  const { user, upgradeToPro } = useAuth();

  // Mock PIX data (em produção, viria da API Asaas)
  const pixCode = "00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-426614174000520400005303986540529.005802BR5925Hub do Empreendedor6009SAO PAULO62070503***63041D3D";
  const pixQRCode = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" + encodeURIComponent(pixCode);

  useEffect(() => {
    // Redirect if not authenticated
    if (!user) {
      navigate("/login");
      return;
    }

    // Redirect if already PRO
    if (user.plan === "pro") {
      navigate("/app");
      return;
    }

    // Simulate payment confirmation after 10 seconds
    const timer = setTimeout(() => {
      setPaymentStatus("processing");
      
      setTimeout(() => {
        setPaymentStatus("confirmed");
        upgradeToPro();
        
        setTimeout(() => {
          navigate("/checkout/success");
        }, 2000);
      }, 2000);
    }, 10000);

    return () => clearTimeout(timer);
  }, [user, navigate, upgradeToPro]);

  const copyPixCode = () => {
    navigator.clipboard.writeText(pixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-slate-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/pricing")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar aos planos
        </Button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left side - Payment info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
                <Crown className="w-8 h-8 text-purple-600" />
                Upgrade para PRO
              </h1>
              <p className="text-slate-600">
                Você está a um passo de desbloquear todos os recursos!
              </p>
            </div>

            {/* Payment status */}
            {paymentStatus === "pending" && (
              <Alert className="bg-blue-50 border-2 border-blue-200">
                <Clock className="h-5 w-5 text-blue-600 animate-pulse" />
                <AlertDescription className="text-blue-900">
                  <strong>Aguardando pagamento...</strong><br />
                  Escaneie o QR Code ou copie o código PIX
                </AlertDescription>
              </Alert>
            )}

            {paymentStatus === "processing" && (
              <Alert className="bg-yellow-50 border-2 border-yellow-200">
                <Clock className="h-5 w-5 text-yellow-600 animate-spin" />
                <AlertDescription className="text-yellow-900">
                  <strong>Processando pagamento...</strong><br />
                  Aguarde alguns instantes
                </AlertDescription>
              </Alert>
            )}

            {paymentStatus === "confirmed" && (
              <Alert className="bg-green-50 border-2 border-green-200">
                <Check className="h-5 w-5 text-green-600" />
                <AlertDescription className="text-green-900">
                  <strong>Pagamento confirmado!</strong><br />
                  Redirecionando...
                </AlertDescription>
              </Alert>
            )}

            {/* Order summary */}
            <Card className="p-6 border-2 border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4">Resumo do Pedido</h3>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-slate-600">Plano PRO - 1º mês</span>
                  <span className="font-bold text-green-600">R$ 9,90</span>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 text-xs text-yellow-900">
                  🔥 <strong>Oferta especial!</strong> Preço promocional no primeiro mês
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">A partir do 2º mês</span>
                  <span className="text-slate-700">R$ 29,90/mês</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Renovação</span>
                  <span className="text-slate-700">Mensal</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900">Total hoje</span>
                  <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    R$ 9,90
                  </span>
                </div>
              </div>
            </Card>

            {/* Benefits reminder */}
            <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200">
              <h4 className="font-bold text-slate-900 mb-3">
                ✨ Você terá acesso a:
              </h4>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-600" />
                  Simuladores ilimitados
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-600" />
                  Propostas profissionais ilimitadas
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-600" />
                  Templates premium
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-600" />
                  Suporte prioritário
                </li>
              </ul>
            </Card>
          </div>

          {/* Right side - PIX payment */}
          <div className="space-y-6">
            <Card className="p-8 border-2 border-slate-200">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl shadow-lg mb-4">
                  <QrCode className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Pague com PIX
                </h3>
                <p className="text-slate-600 text-sm">
                  Pagamento instantâneo e seguro
                </p>
              </div>

              {/* QR Code */}
              <div className="bg-white rounded-2xl p-6 border-2 border-slate-200 mb-6">
                <img
                  src={pixQRCode}
                  alt="QR Code PIX"
                  className="w-full max-w-xs mx-auto"
                />
              </div>

              {/* PIX Code */}
              <div className="space-y-3">
                <p className="text-sm font-bold text-slate-900">
                  Ou copie o código PIX:
                </p>
                
                <div className="relative">
                  <div className="bg-slate-50 border-2 border-slate-200 rounded-lg p-4 pr-12 overflow-hidden">
                    <code className="text-xs text-slate-700 break-all">
                      {pixCode}
                    </code>
                  </div>
                  
                  <Button
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={copyPixCode}
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 mr-1" />
                        Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-1" />
                        Copiar
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Instructions */}
              <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
                <p className="text-sm font-bold text-blue-900 mb-2">
                  📱 Como pagar:
                </p>
                <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                  <li>Abra o app do seu banco</li>
                  <li>Escaneie o QR Code ou cole o código</li>
                  <li>Confirme o pagamento de R$ 9,90</li>
                  <li>Pronto! Acesso liberado em segundos</li>
                </ol>
              </div>
            </Card>

            {/* Security info */}
            <Card className="p-4 bg-slate-50 border border-slate-200">
              <p className="text-xs text-slate-600 text-center">
                🔒 Pagamento 100% seguro processado pela <strong>Asaas</strong>
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}