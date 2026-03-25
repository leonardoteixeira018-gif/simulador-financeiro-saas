import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { supabase } from "../../lib/supabase";

export type TransactionType = "entrada" | "saida";

export interface Transaction {
  id: string;
  valor: number;
  tipo: TransactionType;
  categoria: string;
  data: string;
  descricao?: string;
  createdAt: Date;
}

export interface CashFlowSummary {
  saldoAtual: number;
  totalEntradas: number;
  totalSaidas: number;
  lucro: number;
  margemLucro: number;
}

export interface Insight {
  id: string;
  tipo: "alerta" | "sucesso" | "info";
  mensagem: string;
  icone: string;
}

interface CashFlowContextType {
  transactions: Transaction[];
  summary: CashFlowSummary;
  insights: Insight[];
  loading: boolean;
  addTransaction: (transaction: Omit<Transaction, "id" | "createdAt">) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  getTransactionsByPeriod: (period: "dia" | "semana" | "mes" | "ano") => Transaction[];
  getLimitStatus: () => { used: number; limit: number; percentage: number };
  canAddTransaction: () => boolean;
}

const CashFlowContext = createContext<CashFlowContextType | undefined>(undefined);

export const CATEGORIAS_ENTRADA = [
  "Vendas",
  "Serviços prestados",
  "Recebimentos de clientes",
  "Outros ganhos"
];

export const CATEGORIAS_SAIDA = [
  "Fornecedores/Mercadorias",
  "Custos de produção",
  "Frete/Entregas",
  "Aluguel",
  "Internet/Telefonia",
  "Energia/Água",
  "Anúncios/Marketing",
  "Ferramentas/Software",
  "Taxas/Tarifas",
  "Impostos",
  "Retirada do proprietário",
  "Despesas diversas"
];

const FREE_LIMIT = 30;

export function CashFlowProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  // Busca transações do Supabase sempre que o usuário mudar
  useEffect(() => {
    if (!user) {
      setTransactions([]);
      return;
    }

    async function fetchTransactions() {
      setLoading(true);
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", user!.id)
        .order("data", { ascending: false });

      if (!error && data) {
        setTransactions(
          data.map((t) => ({
            id: t.id,
            valor: Number(t.valor),
            tipo: t.tipo as TransactionType,
            categoria: t.categoria,
            data: t.data,
            descricao: t.descricao ?? undefined,
            createdAt: new Date(t.created_at),
          }))
        );
      }
      setLoading(false);
    }

    fetchTransactions();
  }, [user?.id]);

  // =============================================
  // Resumo calculado
  // =============================================
  const summary: CashFlowSummary = {
    totalEntradas: transactions
      .filter((t) => t.tipo === "entrada")
      .reduce((sum, t) => sum + t.valor, 0),
    totalSaidas: transactions
      .filter((t) => t.tipo === "saida")
      .reduce((sum, t) => sum + t.valor, 0),
    saldoAtual: 0,
    lucro: 0,
    margemLucro: 0,
  };

  summary.lucro = summary.totalEntradas - summary.totalSaidas;
  summary.saldoAtual = summary.lucro;
  summary.margemLucro =
    summary.totalEntradas > 0
      ? (summary.lucro / summary.totalEntradas) * 100
      : 0;

  // =============================================
  // Insights automáticos
  // =============================================
  const insights: Insight[] = [];

  if (summary.totalEntradas > 0) {
    const percentualCustos =
      (summary.totalSaidas / summary.totalEntradas) * 100;
    if (percentualCustos > 70) {
      insights.push({
        id: "custos-altos",
        tipo: "alerta",
        mensagem: `Seus custos representam ${percentualCustos.toFixed(0)}% da receita. Recomendamos reduzir despesas.`,
        icone: "⚠️",
      });
    }
  }

  if (summary.saldoAtual < 0) {
    insights.push({
      id: "saldo-negativo",
      tipo: "alerta",
      mensagem: "Seu saldo está negativo. Priorize recebimentos ou reduza gastos.",
      icone: "🚨",
    });
  }

  if (summary.margemLucro > 0 && summary.margemLucro < 20) {
    insights.push({
      id: "margem-baixa",
      tipo: "alerta",
      mensagem: `Sua margem de lucro está em ${summary.margemLucro.toFixed(0)}%. Considere revisar preços.`,
      icone: "📉",
    });
  }

  if (summary.margemLucro >= 40) {
    insights.push({
      id: "margem-saudavel",
      tipo: "sucesso",
      mensagem: `Parabéns! Sua margem de ${summary.margemLucro.toFixed(0)}% está saudável.`,
      icone: "✅",
    });
  }

  const entradas30Dias = getTransactionsByPeriod("mes").filter(
    (t) => t.tipo === "entrada"
  );
  const faturamentoMensal = entradas30Dias.reduce((sum, t) => sum + t.valor, 0);
  if (faturamentoMensal > 6000) {
    insights.push({
      id: "limite-mei",
      tipo: "info",
      mensagem: `Faturamento mensal em R$ ${faturamentoMensal.toLocaleString()}. Use o simulador MEI→ME.`,
      icone: "💡",
    });
  }

  if (transactions.length > 0 && getTransactionsByPeriod("mes").length < 5) {
    insights.push({
      id: "poucos-lancamentos",
      tipo: "info",
      mensagem: "Mantenha seu controle atualizado para insights mais precisos.",
      icone: "📝",
    });
  }

  if (transactions.length === 0 && !loading) {
    insights.push({
      id: "comece-agora",
      tipo: "info",
      mensagem: "Adicione seu primeiro lançamento para começar a controlar suas finanças!",
      icone: "🚀",
    });
  }

  // =============================================
  // Helpers
  // =============================================
  function getTransactionsByPeriod(
    period: "dia" | "semana" | "mes" | "ano"
  ): Transaction[] {
    const now = new Date();
    return transactions.filter((t) => {
      const transactionDate = new Date(t.data);
      const diffTime = Math.abs(now.getTime() - transactionDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      switch (period) {
        case "dia":   return diffDays <= 1;
        case "semana": return diffDays <= 7;
        case "mes":   return diffDays <= 30;
        case "ano":   return diffDays <= 365;
        default:      return true;
      }
    });
  }

  function getLimitStatus() {
    const monthTransactions = getTransactionsByPeriod("mes");
    const used = monthTransactions.length;
    const limit = user?.plan === "pro" ? Infinity : FREE_LIMIT;
    const percentage = limit === Infinity ? 0 : (used / limit) * 100;
    return { used, limit, percentage };
  }

  function canAddTransaction(): boolean {
    if (user?.plan === "pro") return true;
    const { used, limit } = getLimitStatus();
    return used < limit;
  }

  // =============================================
  // Mutations
  // =============================================
  async function addTransaction(
    transaction: Omit<Transaction, "id" | "createdAt">
  ) {
    if (!user) throw new Error("Usuário não autenticado");
    if (!canAddTransaction()) throw new Error("Limite de lançamentos atingido");

    const { data, error } = await supabase
      .from("transactions")
      .insert({
        user_id: user.id,
        valor: transaction.valor,
        tipo: transaction.tipo,
        categoria: transaction.categoria,
        data: transaction.data,
        descricao: transaction.descricao ?? null,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);

    const newTransaction: Transaction = {
      id: data.id,
      valor: Number(data.valor),
      tipo: data.tipo as TransactionType,
      categoria: data.categoria,
      data: data.data,
      descricao: data.descricao ?? undefined,
      createdAt: new Date(data.created_at),
    };

    setTransactions((prev) => [newTransaction, ...prev]);
  }

  async function deleteTransaction(id: string) {
    const { error } = await supabase
      .from("transactions")
      .delete()
      .eq("id", id);

    if (error) throw new Error(error.message);
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <CashFlowContext.Provider
      value={{
        transactions,
        summary,
        insights,
        loading,
        addTransaction,
        deleteTransaction,
        getTransactionsByPeriod,
        getLimitStatus,
        canAddTransaction,
      }}
    >
      {children}
    </CashFlowContext.Provider>
  );
}

export function useCashFlow() {
  const context = useContext(CashFlowContext);
  if (context === undefined) {
    throw new Error("useCashFlow must be used within a CashFlowProvider");
  }
  return context;
}
