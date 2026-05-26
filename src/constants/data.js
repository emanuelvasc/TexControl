import { ICONS } from "./icons";

// NAVEGAÇÃO DO SIDEBAR
export const NAV_ITEMS = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: ICONS.home,
    section: "PRINCIPAL",
  },
  {
    id: "orders",
    label: "Pedidos",
    icon: ICONS.orders,
    section: "OPERACIONAL",
  },
  { id: "production", label: "Produção", icon: ICONS.production },
  { id: "stock", label: "Estoque", icon: ICONS.stock },
  { id: "customers", label: "Clientes", icon: ICONS.users, section: "GESTÃO" },
  { id: "employees", label: "Funcionários", icon: ICONS.users },
  { id: "financial", label: "Financeiro", icon: ICONS.dollar },
  { id: "reports", label: "Relatórios", icon: ICONS.file },
];

// PEDIDOS
export const ORDERS = [
  {
    id: "#7841",
    client: "Esporte Total",
    product: "Uniformes Ciclismo",
    qty: 120,
    status: "Em produção",
    date: "20/05",
  },
  {
    id: "#7840",
    client: "Team Runners",
    product: "Camisetas Corrida",
    qty: 80,
    status: "Concluído",
    date: "19/05",
  },
  {
    id: "#7839",
    client: "Atlética FC",
    product: "Kit Futebol Completo",
    qty: 200,
    status: "Pendente",
    date: "22/05",
  },
  {
    id: "#7838",
    client: "GymWear Pro",
    product: "Leggings Performance",
    qty: 150,
    status: "Em produção",
    date: "21/05",
  },
  {
    id: "#7837",
    client: "Sport Studio",
    product: "Agasalhos Treino",
    qty: 60,
    status: "Concluído",
    date: "18/05",
  },
];

// STATUS
export const STATUS_CLASS = {
  "Em produção": "em-producao",
  Concluído: "concluido",
  Pendente: "pendente",
};

// ESTOQUE
export const STOCK_ITEMS = [
  { id: "#MAT01", name: "Malha Poliéster", sub: "1.200m disponíveis" },
  { id: "#MAT02", name: "Zíper YKK #5", sub: "4.800 unidades" },
  { id: "#MAT03", name: "Elástico 2cm", sub: "800m disponíveis" },
  { id: "#MAT04", name: "Fio Nylon 40", sub: "320 cones" },
  { id: "#MAT05", name: "Aviamento Botão", sub: "9.200 unidades" },
  { id: "#MAT06", name: "Etiqueta Bordada", sub: "2.100 unidades" },
];

// CLIENTES
export const CUSTOMER_ITEMS = [
  { id: "#CLI01", name: "Esporte Total", sub: "12 pedidos · R$ 48.000" },
  { id: "#CLI02", name: "Team Runners", sub: "8 pedidos · R$ 32.000" },
  { id: "#CLI03", name: "Atlética FC", sub: "6 pedidos · R$ 24.500" },
  { id: "#CLI04", name: "GymWear Pro", sub: "15 pedidos · R$ 61.200" },
];

// FUNCIONÁRIOS
export const EMPLOYEE_ITEMS = [
  { id: "#FUN01", name: "Ana Oliveira", sub: "Costureira · Linha A" },
  { id: "#FUN02", name: "Carlos Silva", sub: "Cortador · Linha B" },
  { id: "#FUN03", name: "Maria Santos", sub: "Acabamento · Linha A" },
  { id: "#FUN04", name: "João Ferreira", sub: "Inspetor de qualidade" },
];

// FINANCEIRO
export const FINANCIAL_ITEMS = [
  { id: "#FIN01", name: "Faturamento Mai/25", sub: "R$ 128.400 · +12% vs abr" },
  { id: "#FIN02", name: "Custos Produção", sub: "R$ 74.200 · -3% vs abr" },
  { id: "#FIN03", name: "Margem Bruta", sub: "42,2% · Meta: 40%" },
  { id: "#FIN04", name: "Contas a Receber", sub: "R$ 48.800 vencendo em 30d" },
];

// RELATÓRIOS
export const REPORT_ITEMS = [
  { id: "#REL01", name: "Produção Mensal", sub: "Maio 2025 · PDF / Excel" },
  {
    id: "#REL02",
    name: "Eficiência por Linha",
    sub: "Semana 21 · PDF / Excel",
  },
  { id: "#REL03", name: "Pedidos por Cliente", sub: "Q1 2025 · PDF / Excel" },
  { id: "#REL04", name: "Inventário Geral", sub: "Atualizado hoje · PDF" },
];

// PRODUÇÃO EM ANDAMENTO
export const PRODUCTION_ITEMS = [
  { name: "Uniformes Ciclismo", pct: 68, color: "var(--orange)" },
  { name: "Kit Futebol Completo", pct: 35, color: "var(--accent2)" },
  { name: "Leggings Performance", pct: 82, color: "#10b981" },
  { name: "Agasalhos Treino", pct: 95, color: "#f59e0b" },
];

// GRÁFICO DE BARRAS
export const CHART_BARS = [65, 82, 54, 91, 73, 88, 76];
export const CHART_DAYS = ["S", "T", "Q", "Q", "S", "S", "D"];

// LINHAS DE PRODUÇÃO
export const PRODUCTION_LINES = [
  {
    id: "L-A",
    name: "Linha A — Costura",
    status: "Ativa",
    pct: 78,
    items: ["Uniformes Ciclismo · 120pçs", "Camisetas Corrida · 80pçs"],
    color: "var(--orange)",
  },
  {
    id: "L-B",
    name: "Linha B — Corte",
    status: "Ativa",
    pct: 62,
    items: ["Kit Futebol · 200pçs"],
    color: "var(--accent2)",
  },
  {
    id: "L-C",
    name: "Linha C — Acabamento",
    status: "Ativa",
    pct: 91,
    items: ["Leggings Performance · 150pçs", "Agasalhos Treino · 60pçs"],
    color: "#10b981",
  },
  {
    id: "L-D",
    name: "Linha D — Estamparia",
    status: "Pausa",
    pct: 0,
    items: ["—"],
    color: "#f59e0b",
  },
];

// ATIVIDADES RECENTES
export const ACTIVITIES = [
  {
    dot: "var(--orange)",
    text: "<strong>Pedido #7841</strong> entrou em produção",
    time: "2min",
  },
  {
    dot: "#10b981",
    text: "<strong>Pedido #7840</strong> concluído — 80 pçs",
    time: "1h",
  },
  {
    dot: "var(--accent2)",
    text: "Estoque <strong>Malha Poliéster</strong> abaixo do mínimo",
    time: "3h",
  },
  {
    dot: "#f59e0b",
    text: "Novo cliente <strong>GymWear Pro</strong> cadastrado",
    time: "5h",
  },
  {
    dot: "var(--orange)",
    text: "Meta de produção <strong>atingida</strong> hoje",
    time: "7h",
  },
];

// KPIS DO DASHBOARD
export const KPI_ITEMS = [
  {
    label: "Pedidos Ativos",
    value: "47",
    delta: "+8 essa semana",
    up: true,
    icon: ICONS.orders,
    color: "var(--orange)",
  },
  {
    label: "Peças / Hoje",
    value: "2.4K",
    delta: "+340 vs ontem",
    up: true,
    icon: ICONS.production,
    color: "var(--accent2)",
  },
  {
    label: "Eficiência",
    value: "94%",
    delta: "+2.1% vs meta",
    up: true,
    icon: ICONS.chart,
    color: "#10b981",
  },
  {
    label: "Faturamento",
    value: "128K",
    delta: "Mês atual",
    up: true,
    icon: ICONS.dollar,
    color: "#f59e0b",
  },
];

// BRANDS (PARCEIROS)
export const BRANDS_LIST = [
  "NIKE",
  "ADIDAS",
  "FILA",
  "PUMA",
  "MIZUNO",
  "UNDER ARMOUR",
  "OLYMPIKUS",
  "TOPPER",
];

// FEATURES (FUNCIONALIDADES)
export const FEATURES_LIST = [
  {
    num: "01",
    icon: ICONS.orders,
    name: "Controle de Pedidos",
    desc: "Gerencie todo o fluxo de pedidos desde a entrada até a entrega. Acompanhe status em tempo real, prazos e prioridades.",
    tags: ["Rastreamento", "Prazos", "Prioridades", "Notificações"],
  },
  {
    num: "02",
    icon: ICONS.production,
    name: "Produção Inteligente",
    desc: "Monitore linhas de produção, distribua tarefas e acompanhe o desempenho de cada equipe.",
    tags: ["Linhas", "Metas", "Eficiência"],
  },
  {
    num: "03",
    icon: ICONS.stock,
    name: "Estoque",
    desc: "Controle de insumos, tecidos e produtos acabados com alertas automáticos.",
    tags: ["Insumos", "Alertas", "Inventário"],
  },
  {
    num: "04",
    icon: ICONS.chart,
    name: "Relatórios",
    desc: "Dashboards analíticos completos para tomada de decisão baseada em dados reais.",
    tags: ["Analytics", "Exportar", "KPIs"],
  },
];

// STATS DO HERO
export const HERO_STATS = [
  { num: "2.4", unit: "K", lbl: "Peças produzidas hoje", fill: 78 },
  { num: "98", unit: "%", lbl: "Taxa de eficiência", fill: 98 },
  { num: "47", unit: "", lbl: "Pedidos ativos", fill: 62 },
];

// VISUAL SECTION POINTS
export const VISUAL_POINTS = [
  {
    n: "01",
    title: "Visibilidade total",
    desc: "Acompanhe cada etapa do processo produtivo em tempo real, de qualquer lugar.",
  },
  {
    n: "02",
    title: "Integração completa",
    desc: "Pedidos, estoque, produção e financeiro conectados em um único sistema.",
  },
  {
    n: "03",
    title: "Dados que decidem",
    desc: "Relatórios inteligentes que transformam dados brutos em insights acionáveis.",
  },
];

// VISUAL SECTION BARS
export const VISUAL_BARS = [
  { label: "Eficiência produtiva", pct: 94, color: "var(--orange)" },
  { label: "Redução de desperdício", pct: 78, color: "var(--accent)" },
  { label: "Pontualidade nas entregas", pct: 89, color: "#10b981" },
];
