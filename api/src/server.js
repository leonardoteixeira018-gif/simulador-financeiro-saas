require("dotenv").config();
const express = require("express");
const cors = require("cors");

const checkoutRouter = require("./routes/checkout");
const webhookRouter = require("./routes/webhook");

const app = express();

const allowedOrigins = [
  "https://bubuya.com.br",
  "https://www.bubuya.com.br",
  "https://simulador-financeiro-saas.vercel.app",
  "http://localhost:5173",
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (server-to-server, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS: origem não permitida: ${origin}`));
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Preflight para todas as rotas

app.use(express.json());

app.get("/health", (req, res) => res.json({ status: "ok" }));
app.use("/checkout", checkoutRouter);
app.use("/webhook", webhookRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));
