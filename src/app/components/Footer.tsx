import { Calculator } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Simulador MEI → ME</span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-md">
              Ferramenta gratuita para ajudar empreendedores a tomarem decisões inteligentes sobre regime tributário, 
              economizando impostos e evitando problemas fiscais.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Recursos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#simulador" className="hover:text-white transition-colors">
                  Simulador
                </a>
              </li>
              <li>
                <a href="#beneficios" className="hover:text-white transition-colors">
                  Benefícios
                </a>
              </li>
              <li>
                <a href="#depoimentos" className="hover:text-white transition-colors">
                  Depoimentos
                </a>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-white font-bold mb-4">Informações</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Sobre o MEI
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Como migrar
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © 2026 Simulador MEI → ME. Todos os direitos reservados.
          </p>
          
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">
              Termos de Uso
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Privacidade
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Contato
            </a>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-slate-800 rounded-lg">
          <p className="text-xs text-slate-400 leading-relaxed">
            <strong className="text-slate-300">Aviso Legal:</strong> Esta ferramenta fornece simulações aproximadas 
            baseadas em dados gerais do Simples Nacional e MEI. Os valores reais podem variar dependendo de diversos 
            fatores específicos do seu negócio. Recomendamos consultar um contador para análises precisas e 
            personalizadas. Não nos responsabilizamos por decisões tomadas com base exclusivamente nesta simulação.
          </p>
        </div>
      </div>
    </footer>
  );
}
