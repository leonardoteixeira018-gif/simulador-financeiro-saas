import { useState } from "react";
import { Calculator, TrendingUp, DollarSign } from "lucide-react";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";

export interface SimulationResult {
  faturamento: number;
  tipoAtividade: string;
  despesas: number;
  meiImposto: number;
  meImposto: number;
  meiLucro: number;
  meLucro: number;
  economia: number;
  recomendacao: "MEI" | "ME" | "Limite";
}

interface SimulatorSectionProps {
  onSimulate: (result: SimulationResult) => void;
}

export function SimulatorSection({ onSimulate }: SimulatorSectionProps) {
  const [faturamento, setFaturamento] = useState(8500);
  const [tipoAtividade, setTipoAtividade] = useState("servicos");
  const [despesas, setDespesas] = useState(2000);
  const [resultado, setResultado] = useState<SimulationResult | null>(null);

  const calcularImpostos = () => {
    // Valores MEI 2026 (aproximados)
    const meiValorFixo = tipoAtividade === "servicos" ? 75 : 
                         tipoAtividade === "comercio" ? 71 : 76;
    
    // Simples Nacional - ME (aproximação simplificada)
    // Para serviços: Anexo III (16% a 22%)
    // Para comércio: Anexo I (4% a 19%)
    let aliquotaSimples = 0;
    
    if (tipoAtividade === "servicos") {
      if (faturamento <= 5000) aliquotaSimples = 0.06;
      else if (faturamento <= 10000) aliquotaSimples = 0.09;
      else if (faturamento <= 20000) aliquotaSimples = 0.12;
      else aliquotaSimples = 0.14;
    } else if (tipoAtividade === "comercio") {
      if (faturamento <= 5000) aliquotaSimples = 0.04;
      else if (faturamento <= 10000) aliquotaSimples = 0.06;
      else if (faturamento <= 20000) aliquotaSimples = 0.08;
      else aliquotaSimples = 0.10;
    } else { // industria
      if (faturamento <= 5000) aliquotaSimples = 0.045;
      else if (faturamento <= 10000) aliquotaSimples = 0.07;
      else if (faturamento <= 20000) aliquotaSimples = 0.09;
      else aliquotaSimples = 0.11;
    }
    
    const meiImposto = meiValorFixo;
    const meImposto = faturamento * aliquotaSimples;
    
    const meiLucro = faturamento - despesas - meiImposto;
    const meLucro = faturamento - despesas - meImposto;
    
    const economia = meiImposto - meImposto;
    
    let recomendacao: "MEI" | "ME" | "Limite" = "MEI";
    if (faturamento > 81000 / 12) {
      recomendacao = "Limite";
    } else if (meLucro > meiLucro) {
      recomendacao = "ME";
    }
    
    const result: SimulationResult = {
      faturamento,
      tipoAtividade,
      despesas,
      meiImposto,
      meImposto,
      meiLucro,
      meLucro,
      economia,
      recomendacao
    };
    
    setResultado(result);
    onSimulate(result);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <section id="simulador" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
            <Calculator className="w-4 h-4" />
            Simulador gratuito
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Compare MEI vs Microempresa
          </h2>
          
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Insira seus dados e descubra qual regime tributário é mais vantajoso para o seu negócio
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Input Card */}
          <Card className="p-8 shadow-xl border-2 border-slate-200">
            <div className="space-y-6">
              <div>
                <Label htmlFor="faturamento" className="text-base font-semibold text-slate-900 mb-3 block">
                  Faturamento mensal
                </Label>
                
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 font-medium">
                    R$
                  </span>
                  <Input
                    id="faturamento"
                    type="number"
                    value={faturamento}
                    onChange={(e) => setFaturamento(Number(e.target.value))}
                    className="pl-12 text-2xl font-bold h-14 text-slate-900"
                    min={0}
                    max={30000}
                  />
                </div>
                
                <div className="mt-4">
                  <Slider
                    value={[faturamento]}
                    onValueChange={(value) => setFaturamento(value[0])}
                    min={1000}
                    max={30000}
                    step={500}
                    className="py-4"
                  />
                </div>
                
                <div className="flex justify-between text-sm text-slate-600 mt-2">
                  <span>R$ 1.000</span>
                  <span className="font-medium text-purple-600">Limite MEI: R$ 6.750/mês</span>
                  <span>R$ 30.000</span>
                </div>
              </div>

              <div>
                <Label htmlFor="atividade" className="text-base font-semibold text-slate-900 mb-3 block">
                  Tipo de atividade
                </Label>
                <Select value={tipoAtividade} onValueChange={setTipoAtividade}>
                  <SelectTrigger id="atividade" className="h-12 text-base">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="servicos">Serviços</SelectItem>
                    <SelectItem value="comercio">Comércio</SelectItem>
                    <SelectItem value="industria">Indústria</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="despesas" className="text-base font-semibold text-slate-900 mb-3 block">
                  Despesas mensais (opcional)
                </Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600">
                    R$
                  </span>
                  <Input
                    id="despesas"
                    type="number"
                    value={despesas}
                    onChange={(e) => setDespesas(Number(e.target.value))}
                    className="pl-12 h-12 text-base"
                    min={0}
                  />
                </div>
              </div>

              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white h-14 text-lg font-semibold"
                onClick={calcularImpostos}
              >
                <Calculator className="mr-2 w-5 h-5" />
                Calcular comparação
              </Button>
            </div>
          </Card>

          {/* Results Card */}
          <div className="space-y-6">
            {resultado ? (
              <>
                <Card className={`p-8 border-2 ${resultado.recomendacao === 'MEI' ? 'border-green-300 bg-green-50' : resultado.recomendacao === 'ME' ? 'border-blue-300 bg-blue-50' : 'border-orange-300 bg-orange-50'}`}>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold text-slate-900">Resultado</h3>
                      <div className={`px-4 py-2 rounded-full text-sm font-bold ${
                        resultado.recomendacao === 'MEI' ? 'bg-green-200 text-green-800' :
                        resultado.recomendacao === 'ME' ? 'bg-blue-200 text-blue-800' :
                        'bg-orange-200 text-orange-800'
                      }`}>
                        {resultado.recomendacao === 'Limite' ? '⚠️ Atenção!' : `✓ Recomendado: ${resultado.recomendacao}`}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                        <div className="text-sm text-slate-600 mb-1">MEI - Impostos</div>
                        <div className="text-2xl font-bold text-slate-900">{formatCurrency(resultado.meiImposto)}</div>
                        <div className="text-xs text-slate-500 mt-1">por mês</div>
                      </div>

                      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                        <div className="text-sm text-slate-600 mb-1">ME - Impostos</div>
                        <div className="text-2xl font-bold text-slate-900">{formatCurrency(resultado.meImposto)}</div>
                        <div className="text-xs text-slate-500 mt-1">por mês</div>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-slate-600 mb-1">MEI - Lucro líquido</div>
                          <div className="text-xl font-bold text-slate-900">{formatCurrency(resultado.meiLucro)}</div>
                        </div>

                        <div>
                          <div className="text-sm text-slate-600 mb-1">ME - Lucro líquido</div>
                          <div className="text-xl font-bold text-slate-900">{formatCurrency(resultado.meLucro)}</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
                      <div className="flex items-center gap-3 mb-2">
                        <DollarSign className="w-6 h-6" />
                        <span className="font-semibold">
                          {resultado.economia > 0 ? 'Economia como ME' : 'Economia como MEI'}
                        </span>
                      </div>
                      <div className="text-3xl font-bold">{formatCurrency(Math.abs(resultado.economia))}/mês</div>
                      <div className="text-sm opacity-90 mt-2">
                        {formatCurrency(Math.abs(resultado.economia) * 12)} por ano
                      </div>
                    </div>
                  </div>
                </Card>

                {resultado.recomendacao === 'Limite' && (
                  <Card className="p-6 bg-orange-50 border-2 border-orange-300">
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">⚠️</div>
                      <div>
                        <h4 className="font-bold text-orange-900 mb-1">Você está próximo do limite do MEI!</h4>
                        <p className="text-sm text-orange-800">
                          O limite anual do MEI é R$ 81.000 (R$ 6.750/mês). Com esse faturamento, você deve considerar migrar para ME imediatamente.
                        </p>
                      </div>
                    </div>
                  </Card>
                )}
              </>
            ) : (
              <Card className="p-8 border-2 border-dashed border-slate-300 bg-slate-50">
                <div className="text-center py-12">
                  <TrendingUp className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-600 mb-2">
                    Preencha os dados ao lado
                  </h3>
                  <p className="text-slate-500">
                    Os resultados aparecerão aqui após o cálculo
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
