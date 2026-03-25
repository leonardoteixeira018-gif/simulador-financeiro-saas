import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card } from "./ui/card";
import { SimulationResult } from "./SimulatorSection";

interface ComparisonChartProps {
  result: SimulationResult | null;
}

export function ComparisonChart({ result }: ComparisonChartProps) {
  // Gerar dados para projeção de 12 meses
  const generateChartData = () => {
    if (!result) return [];
    
    const data = [];
    const faturamentoBase = result.faturamento;
    
    for (let mes = 1; mes <= 12; mes++) {
      const crescimento = 1 + (mes * 0.05); // 5% de crescimento por mês
      const faturamentoProjetado = Math.min(faturamentoBase * crescimento, 15000);
      
      // Cálculo MEI
      const meiValorFixo = result.tipoAtividade === "servicos" ? 75 : 
                           result.tipoAtividade === "comercio" ? 71 : 76;
      
      // Cálculo ME - ajustando alíquota conforme faturamento cresce
      let aliquotaSimples = 0;
      if (result.tipoAtividade === "servicos") {
        if (faturamentoProjetado <= 5000) aliquotaSimples = 0.06;
        else if (faturamentoProjetado <= 10000) aliquotaSimples = 0.09;
        else if (faturamentoProjetado <= 20000) aliquotaSimples = 0.12;
        else aliquotaSimples = 0.14;
      } else if (result.tipoAtividade === "comercio") {
        if (faturamentoProjetado <= 5000) aliquotaSimples = 0.04;
        else if (faturamentoProjetado <= 10000) aliquotaSimples = 0.06;
        else if (faturamentoProjetado <= 20000) aliquotaSimples = 0.08;
        else aliquotaSimples = 0.10;
      } else {
        if (faturamentoProjetado <= 5000) aliquotaSimples = 0.045;
        else if (faturamentoProjetado <= 10000) aliquotaSimples = 0.07;
        else if (faturamentoProjetado <= 20000) aliquotaSimples = 0.09;
        else aliquotaSimples = 0.11;
      }
      
      const meiImposto = meiValorFixo;
      const meImposto = faturamentoProjetado * aliquotaSimples;
      
      const meiLucro = faturamentoProjetado - result.despesas - meiImposto;
      const meLucro = faturamentoProjetado - result.despesas - meImposto;
      
      data.push({
        mes: `Mês ${mes}`,
        faturamento: faturamentoProjetado,
        meiImposto: meiImposto,
        meImposto: meImposto,
        meiLucro: meiLucro,
        meLucro: meLucro,
      });
    }
    
    return data;
  };

  const chartData = generateChartData();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0
    }).format(value);
  };

  if (!result) {
    return null;
  }

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Projeção de crescimento
          </h2>
          <p className="text-xl text-slate-600">
            Veja como os impostos e lucros se comportam ao longo do tempo
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Gráfico de Impostos */}
          <Card className="p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Comparação de Impostos Mensais</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="mes" 
                  stroke="#64748b"
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  stroke="#64748b"
                  tick={{ fontSize: 12 }}
                  tickFormatter={formatCurrency}
                />
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="meiImposto" 
                  stroke="#ef4444" 
                  strokeWidth={3}
                  name="MEI"
                  dot={{ r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="meImposto" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  name="ME (Simples)"
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Gráfico de Lucro */}
          <Card className="p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Lucro Líquido Projetado</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorMeiLucro" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMeLucro" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="mes" 
                  stroke="#64748b"
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  stroke="#64748b"
                  tick={{ fontSize: 12 }}
                  tickFormatter={formatCurrency}
                />
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="meiLucro"
                  stroke="#ef4444"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorMeiLucro)"
                  name="MEI"
                />
                <Area
                  type="monotone"
                  dataKey="meLucro"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorMeLucro)"
                  name="ME"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Insights Card */}
        <Card className="mt-8 p-8 bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-2">📈</div>
              <div className="text-2xl font-bold text-slate-900">
                {formatCurrency((chartData[11]?.meLucro || 0) - (chartData[11]?.meiLucro || 0))}
              </div>
              <div className="text-sm text-slate-600 mt-1">
                Diferença de lucro no 12º mês
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-2">💰</div>
              <div className="text-2xl font-bold text-slate-900">
                {formatCurrency(
                  chartData.reduce((sum, item) => sum + ((item.meiImposto || 0) - (item.meImposto || 0)), 0)
                )}
              </div>
              <div className="text-sm text-slate-600 mt-1">
                Economia total no período
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-2">🎯</div>
              <div className="text-2xl font-bold text-slate-900">
                {formatCurrency(chartData[11]?.faturamento || 0)}
              </div>
              <div className="text-sm text-slate-600 mt-1">
                Faturamento projetado (mês 12)
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
