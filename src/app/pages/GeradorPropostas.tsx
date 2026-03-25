import { useState } from "react";
import { FileText, Download, Send, Eye, Info } from "lucide-react";
import { Card } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Separator } from "../components/ui/separator";

export function GeradorPropostas() {
  const [nomeCliente, setNomeCliente] = useState("");
  const [emailCliente, setEmailCliente] = useState("");
  const [nomeServico, setNomeServico] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState(0);
  const [prazo, setPrazo] = useState("");
  const [condicoesPagamento, setCondicoesPagamento] = useState("50-50");
  const [validade, setValidade] = useState(7);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (daysFromNow: number) => {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const getValorParcela = () => {
    if (condicoesPagamento === "50-50") return valor / 2;
    if (condicoesPagamento === "30-70") return valor * 0.3;
    if (condicoesPagamento === "3x") return valor / 3;
    return valor;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
            <FileText className="w-6 h-6 text-white" />
          </div>
          Gerador de Propostas Comerciais
        </h1>
        <p className="text-lg text-slate-600">
          Crie propostas profissionais em minutos com preview em tempo real
        </p>
      </div>

      {/* Info Alert */}
      <Alert className="bg-blue-50 border-2 border-blue-200">
        <Info className="h-5 w-5 text-blue-600" />
        <AlertDescription className="text-blue-900">
          Preencha os campos ao lado e veja sua proposta sendo gerada em tempo real. 
          Você pode baixar em PDF ou enviar diretamente por email.
        </AlertDescription>
      </Alert>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="space-y-6">
          <Card className="p-6 border-2 border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Dados do Cliente</h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="nomeCliente">Nome do Cliente</Label>
                <Input
                  id="nomeCliente"
                  value={nomeCliente}
                  onChange={(e) => setNomeCliente(e.target.value)}
                  placeholder="Ex: João Silva"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="emailCliente">Email do Cliente</Label>
                <Input
                  id="emailCliente"
                  type="email"
                  value={emailCliente}
                  onChange={(e) => setEmailCliente(e.target.value)}
                  placeholder="cliente@email.com"
                  className="mt-2"
                />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-2 border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Dados do Serviço</h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="nomeServico">Nome do Serviço/Projeto</Label>
                <Input
                  id="nomeServico"
                  value={nomeServico}
                  onChange={(e) => setNomeServico(e.target.value)}
                  placeholder="Ex: Desenvolvimento de Website Institucional"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="descricao">Descrição Detalhada</Label>
                <Textarea
                  id="descricao"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Descreva o escopo do projeto, entregas, benefícios..."
                  className="mt-2 min-h-[120px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="valor">Valor Total</Label>
                  <div className="relative mt-2">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600">R$</span>
                    <Input
                      id="valor"
                      type="number"
                      value={valor}
                      onChange={(e) => setValor(Number(e.target.value))}
                      className="pl-10"
                      min={0}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="prazo">Prazo de Entrega</Label>
                  <Input
                    id="prazo"
                    value={prazo}
                    onChange={(e) => setPrazo(e.target.value)}
                    placeholder="Ex: 30 dias"
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="pagamento">Condições de Pagamento</Label>
                <Select value={condicoesPagamento} onValueChange={setCondicoesPagamento}>
                  <SelectTrigger id="pagamento" className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="integral">À vista (integral)</SelectItem>
                    <SelectItem value="50-50">50% entrada + 50% entrega</SelectItem>
                    <SelectItem value="30-70">30% entrada + 70% entrega</SelectItem>
                    <SelectItem value="3x">3x sem juros</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="validade">Validade da Proposta (dias)</Label>
                <Input
                  id="validade"
                  type="number"
                  value={validade}
                  onChange={(e) => setValidade(Number(e.target.value))}
                  className="mt-2"
                  min={1}
                  max={90}
                />
              </div>
            </div>
          </Card>

          <div className="flex gap-4">
            <Button 
              size="lg"
              className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white"
            >
              <Download className="w-5 h-5 mr-2" />
              Baixar PDF
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              className="flex-1 border-2"
            >
              <Send className="w-5 h-5 mr-2" />
              Enviar Email
            </Button>
          </div>
        </div>

        {/* Preview */}
        <div className="lg:sticky lg:top-6 lg:self-start">
          <Card className="border-2 border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                <span className="font-bold">Preview da Proposta</span>
              </div>
            </div>

            <div className="p-8 bg-white min-h-[600px]">
              {/* Document Preview */}
              <div className="space-y-6">
                {/* Header */}
                <div className="text-center pb-6 border-b-2 border-slate-200">
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">
                    Proposta Comercial
                  </h1>
                  <p className="text-slate-600">
                    {new Date().toLocaleDateString('pt-BR', { 
                      day: '2-digit', 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </p>
                </div>

                {/* Client Info */}
                <div>
                  <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">
                    Cliente
                  </h2>
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <p className="font-bold text-slate-900 text-lg">
                      {nomeCliente || "[Nome do Cliente]"}
                    </p>
                    <p className="text-slate-600 text-sm mt-1">
                      {emailCliente || "[email@cliente.com]"}
                    </p>
                  </div>
                </div>

                {/* Service Details */}
                <div>
                  <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">
                    Projeto
                  </h2>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Nome do Serviço</p>
                      <p className="font-bold text-slate-900 text-lg">
                        {nomeServico || "[Nome do Serviço/Projeto]"}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Descrição</p>
                      <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
                        {descricao || "[Descrição detalhada do projeto será exibida aqui]"}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Investment */}
                <div>
                  <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">
                    Investimento
                  </h2>
                  
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border-2 border-orange-200">
                    <div className="text-center mb-4">
                      <p className="text-sm text-slate-600 mb-1">Valor Total</p>
                      <p className="text-4xl font-bold text-slate-900">
                        {formatCurrency(valor)}
                      </p>
                    </div>

                    {condicoesPagamento !== "integral" && (
                      <div className="pt-4 border-t border-orange-200">
                        <p className="text-sm font-bold text-slate-700 mb-2">Condições de Pagamento:</p>
                        {condicoesPagamento === "50-50" && (
                          <div className="space-y-1 text-sm text-slate-700">
                            <p>• 1ª parcela: {formatCurrency(getValorParcela())} (entrada)</p>
                            <p>• 2ª parcela: {formatCurrency(getValorParcela())} (na entrega)</p>
                          </div>
                        )}
                        {condicoesPagamento === "30-70" && (
                          <div className="space-y-1 text-sm text-slate-700">
                            <p>• 1ª parcela: {formatCurrency(getValorParcela())} (entrada - 30%)</p>
                            <p>• 2ª parcela: {formatCurrency(valor * 0.7)} (na entrega - 70%)</p>
                          </div>
                        )}
                        {condicoesPagamento === "3x" && (
                          <div className="space-y-1 text-sm text-slate-700">
                            <p>• 3 parcelas mensais de {formatCurrency(getValorParcela())}</p>
                            <p className="text-xs text-slate-600">sem juros</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Timeline */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <p className="text-xs text-slate-500 mb-1">Prazo de Entrega</p>
                    <p className="font-bold text-slate-900">
                      {prazo || "[Prazo]"}
                    </p>
                  </div>
                  
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <p className="text-xs text-slate-500 mb-1">Válida até</p>
                    <p className="font-bold text-slate-900">
                      {formatDate(validade)}
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Footer */}
                <div className="text-center pt-4">
                  <p className="text-sm text-slate-600 mb-4">
                    Estamos à disposição para esclarecer quaisquer dúvidas.
                  </p>
                  <div className="bg-slate-100 rounded-lg p-4 text-xs text-slate-600">
                    <p className="font-bold text-slate-900 mb-1">Hub do Empreendedor</p>
                    <p>contato@hubempreendedor.com.br</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
