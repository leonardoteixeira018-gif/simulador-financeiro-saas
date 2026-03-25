import { Quote, Star } from "lucide-react";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Marina Silva",
      role: "Designer Freelancer",
      content: "Descobri que estava pagando mais impostos do que precisava! A simulação me ajudou a entender que migrar para ME seria mais vantajoso. Economizei R$ 4.200 no primeiro ano.",
      avatar: "MS",
      rating: 5
    },
    {
      name: "Carlos Mendes",
      role: "Desenvolvedor de Software",
      content: "Ferramenta simples e direta. Em 2 minutos consegui entender exatamente quando faria sentido sair do MEI. Recomendo para todos os empreendedores!",
      avatar: "CM",
      rating: 5
    },
    {
      name: "Juliana Costa",
      role: "Consultora de Marketing",
      content: "Estava com medo de ultrapassar o limite do MEI e ter problemas. O simulador me deu a segurança que eu precisava para planejar minha transição com antecedência.",
      avatar: "JC",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium mb-4">
            <Star className="w-4 h-4 fill-current" />
            Avaliado com 4.9/5 estrelas
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            O que dizem nossos usuários
          </h2>
          
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Milhares de empreendedores já usaram nosso simulador para tomar decisões mais inteligentes
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="p-8 hover:shadow-xl transition-all duration-300 border-2 border-slate-200 relative"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-purple-200" />
              
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <p className="text-slate-700 mb-6 leading-relaxed relative z-10">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600">
                  <AvatarFallback className="text-white font-bold">
                    {testimonial.avatar}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <div className="font-bold text-slate-900">{testimonial.name}</div>
                  <div className="text-sm text-slate-600">{testimonial.role}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
