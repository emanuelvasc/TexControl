import { ICONS } from "./icons";

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

export const STATUS_CLASS = {
  "Em produção": "em-producao",
  Concluído: "concluido",
  Pendente: "pendente",
};
