import { TrendingDown, Shield, BarChart3, Clock } from "lucide-react";
import { Card } from "./ui/card";

export function BenefitsSection() {
  const benefits = [
    {
      icon: TrendingDown,
      title: "Economia real de impostos",
      description: "Compare cenários reais e descubra quanto você pode economizar ao escolher o regime tributário correto para o seu negócio.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: BarChart3,
      title: "Planejamento financeiro",
      description: "Visualize projeções de crescimento e entenda o impacto dos impostos no seu lucro líquido ao longo do tempo.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Shield,
      title: "Decisão segura",
      description: "Tome decisões embasadas em dados e evite surpresas com a Receita Federal ao ultrapassar o limite do MEI.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Clock,
      title: "Resultado instantâneo",
      description: "Simule quantas vezes quiser, gratuitamente, e obtenha respostas imediatas sobre qual é o melhor momento para migrar.",
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Por que usar nosso simulador?
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Ferramentas profissionais para ajudar você a tomar a melhor decisão para o seu negócio
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card
                key={index}
                className="p-6 hover:shadow-xl transition-all duration-300 border-2 border-slate-200 hover:border-purple-300 hover:-translate-y-1"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-4 shadow-lg`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {benefit.description}
                </p>
              </Card>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-white shadow-2xl">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">98%</div>
              <div className="text-purple-100">Taxa de satisfação</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">5.000+</div>
              <div className="text-purple-100">Simulações realizadas</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">R$ 2,3M</div>
              <div className="text-purple-100">Em economia identificada</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
