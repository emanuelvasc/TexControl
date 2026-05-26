import { useState } from "react";
import Icon from "../components/Icon";
import { ICONS } from "../constants/icons";
import OrdersPage from "./OrdersPage";
import ProductionPage from "./ProductionPage";
import StockPage from "./StockPage";
import CustomersPage from "./CustomersPage";
import EmployeesPage from "./EmployeesPage";
import FinancialPage from "./FinancialPage";
import ReportsPage from "./ReportsPage";

const DashboardPage = ({ onLogout }) => {
  const [activePage, setActivePage] = useState("dashboard");

  const menuItems = [
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
    {
      id: "customers",
      label: "Clientes",
      icon: ICONS.users,
      section: "GESTÃO",
    },
    { id: "employees", label: "Funcionários", icon: ICONS.users },
    { id: "financial", label: "Financeiro", icon: ICONS.dollar },
    { id: "reports", label: "Relatórios", icon: ICONS.file },
  ];

  let prevSection = "";

  return (
    <div className="app">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-mark">T</div>
          <div className="sidebar-logo-text">
            TEX<span>CTRL</span>
          </div>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const showSection = item.section && item.section !== prevSection;
            if (item.section) prevSection = item.section;
            return (
              <div key={item.id}>
                {showSection && (
                  <div className="sidebar-section">{item.section}</div>
                )}
                <div
                  className={`sidebar-link${activePage === item.id ? " active" : ""}`}
                  onClick={() => setActivePage(item.id)}
                >
                  <Icon d={item.icon} size={18} />
                  <span>{item.label}</span>
                </div>
              </div>
            );
          })}
        </nav>
        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="user-avatar">A</div>
            <div className="user-info">
              <div className="user-name">Admin</div>
              <div className="user-role">Gestor</div>
            </div>
          </div>
          <button className="btn-logout" onClick={onLogout}>
            <Icon d={ICONS.logout} size={14} /> Sair
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="main-content">
        <div className="topnav">
          <div className="page-title">
            {menuItems.find((item) => item.id === activePage)?.label ||
              "Dashboard"}
          </div>
          <div className="topnav-right">
            <div className="search-bar">
              <Icon d={ICONS.search} size={14} />
              <input type="text" placeholder="Buscar..." />
            </div>
            <div className="notification-bell">
              <Icon d={ICONS.bell} size={18} />
              <span className="notification-badge">2</span>
            </div>
          </div>
        </div>

        <div className="dash-content">
          {activePage === "dashboard" && <DashboardHome />}
          {activePage === "orders" && <OrdersPage />}
          {activePage === "production" && <ProductionPage />}
          {activePage === "stock" && <StockPage />}
          {activePage === "customers" && <CustomersPage />}
          {activePage === "employees" && <EmployeesPage />}
          {activePage === "financial" && <FinancialPage />}
          {activePage === "reports" && <ReportsPage />}
        </div>
      </div>
    </div>
  );
};

// COMPONENTE HOME DO DASHBOARD
const DashboardHome = () => {
  const orders = [
    {
      id: "#7841",
      client: "Esporte Total",
      product: "Uniformes Ciclismo",
      qty: 120,
      status: "Em produção",
    },
    {
      id: "#7840",
      client: "Team Runners",
      product: "Camisetas Corrida",
      qty: 80,
      status: "Concluído",
    },
    {
      id: "#7839",
      client: "Atlética FC",
      product: "Kit Futebol Completo",
      qty: 200,
      status: "Pendente",
    },
    {
      id: "#7838",
      client: "GymWear Pro",
      product: "Leggings Performance",
      qty: 150,
      status: "Em produção",
    },
  ];

  const getStatusClass = (status) => {
    if (status === "Em produção") return "status-production";
    if (status === "Concluído") return "status-done";
    return "status-pending";
  };

  return (
    <div>
      {/* KPI CARDS */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon orange">
            <Icon d={ICONS.orders} size={22} />
          </div>
          <div className="kpi-label">Pedidos Ativos</div>
          <div className="kpi-value">47</div>
          <div className="kpi-delta up">↑ +8 essa semana</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon purple">
            <Icon d={ICONS.production} size={22} />
          </div>
          <div className="kpi-label">Peças / Hoje</div>
          <div className="kpi-value">2.4K</div>
          <div className="kpi-delta up">↑ +340 vs ontem</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon green">
            <Icon d={ICONS.chart} size={22} />
          </div>
          <div className="kpi-label">Eficiência</div>
          <div className="kpi-value">94%</div>
          <div className="kpi-delta up">↑ +2.1% vs meta</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon yellow">
            <Icon d={ICONS.dollar} size={22} />
          </div>
          <div className="kpi-label">Faturamento</div>
          <div className="kpi-value">R$128K</div>
          <div className="kpi-delta up">↑ Mês atual</div>
        </div>
      </div>

      {/* CHARTS AND TABLES */}
      <div className="dashboard-grid">
        {/* LEFT COLUMN */}
        <div className="dashboard-card">
          <div className="card-header">
            <span>Produção semanal</span>
            <span className="card-badge">ESTA SEMANA</span>
          </div>
          <div className="chart-bars">
            {[65, 82, 54, 91, 73, 88, 76].map((h, i) => (
              <div className="chart-bar-item" key={i}>
                <div className="chart-bar" style={{ height: `${h}%` }}></div>
                <span className="chart-label">
                  {["S", "T", "Q", "Q", "S", "S", "D"][i]}
                </span>
              </div>
            ))}
          </div>

          <div className="card-header" style={{ marginTop: 24 }}>
            <span>Últimos pedidos</span>
          </div>
          <table className="orders-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Produto</th>
                <th>Qtd</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="order-id">{order.id}</td>
                  <td>{order.client}</td>
                  <td className="order-product">{order.product}</td>
                  <td className="order-qty">{order.qty}</td>
                  <td>
                    <span
                      className={`status-badge ${getStatusClass(order.status)}`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* RIGHT COLUMN */}
        <div className="dashboard-right">
          <div className="dashboard-card">
            <div className="card-header">
              <span>Produção em andamento</span>
            </div>
            <div className="production-list">
              {[
                { name: "Uniformes Ciclismo", pct: 68, color: "orange" },
                { name: "Kit Futebol Completo", pct: 35, color: "purple" },
                { name: "Leggings Performance", pct: 82, color: "green" },
                { name: "Agasalhos Treino", pct: 95, color: "yellow" },
              ].map((prod) => (
                <div className="production-item" key={prod.name}>
                  <div className="production-header">
                    <span>{prod.name}</span>
                    <span>{prod.pct}%</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className={`progress-fill ${prod.color}`}
                      style={{ width: `${prod.pct}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-header">
              <span>Atividade recente</span>
            </div>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-dot orange"></div>
                <span>
                  <strong>Pedido #7841</strong> entrou em produção
                </span>
                <span className="activity-time">2min</span>
              </div>
              <div className="activity-item">
                <div className="activity-dot green"></div>
                <span>
                  <strong>Pedido #7840</strong> concluído — 80 pçs
                </span>
                <span className="activity-time">1h</span>
              </div>
              <div className="activity-item">
                <div className="activity-dot purple"></div>
                <span>
                  Estoque <strong>Malha Poliéster</strong> abaixo do mínimo
                </span>
                <span className="activity-time">3h</span>
              </div>
              <div className="activity-item">
                <div className="activity-dot yellow"></div>
                <span>
                  Novo cliente <strong>GymWear Pro</strong> cadastrado
                </span>
                <span className="activity-time">5h</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
