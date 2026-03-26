const axios = require("axios");

if (!process.env.ASAAS_API_KEY) {
  console.error("ERRO: variável ASAAS_API_KEY não definida. Configure no arquivo .env ou nas variáveis de ambiente.");
}

// Use ASAAS_ENVIRONMENT=sandbox para testes, produção é o padrão
const isSandbox = process.env.ASAAS_ENVIRONMENT === "sandbox";
const baseURL = isSandbox
  ? "https://sandbox.asaas.com/api/v3"
  : "https://www.asaas.com/api/v3";

if (isSandbox) {
  console.warn("Asaas rodando em modo SANDBOX");
}

const asaas = axios.create({
  baseURL,
  headers: {
    "access_token": process.env.ASAAS_API_KEY,
    "Content-Type": "application/json"
  }
});

module.exports = asaas;
