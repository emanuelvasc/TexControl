import { useState } from "react";
import Icon from "../components/Icon";
import { ICONS } from "../constants/icons";
import NewCustomerModal from "./modals/NewCustomerModal";

const CustomersPage = () => {
  const [customers, setCustomers] = useState([
    {
      id: "CLI-001",
      name: "Esporte Total",
      email: "contato@esportetotal.com",
      orders: 12,
      total: "R$ 48.000",
    },
    {
      id: "CLI-002",
      name: "Team Runners",
      email: "vendas@teamrunners.com",
      orders: 8,
      total: "R$ 32.000",
    },
    {
      id: "CLI-003",
      name: "Atlética FC",
      email: "compras@atleticafc.com",
      orders: 6,
      total: "R$ 24.500",
    },
    {
      id: "CLI-004",
      name: "GymWear Pro",
      email: "pedidos@gymwearpro.com",
      orders: 15,
      total: "R$ 61.200",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveCustomer = (newCustomer) => {
    setCustomers([newCustomer, ...customers]);
  };

  const totalOrders = customers.reduce((acc, c) => acc + c.orders, 0);
  const totalRevenue = customers.reduce(
    (acc, c) => acc + parseInt(c.total.replace("R$ ", "").replace(".", "")),
    0,
  );

  return (
    <div className="page-customers">
      <NewCustomerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCustomer}
      />

      <div className="page-header">
        <div>
          <h1 className="page-title">Clientes</h1>
          <p className="page-subtitle">Cadastro e histórico de clientes</p>
        </div>
        <button className="btn-new-order" onClick={() => setIsModalOpen(true)}>
          <Icon d={ICONS.plus} size={16} /> Novo Cliente
        </button>
      </div>

      <div className="customers-stats">
        <div className="customer-stat">
          <span className="stat-num">{customers.length}</span>
          <span>Clientes Ativos</span>
        </div>
        <div className="customer-stat">
          <span className="stat-num">R${totalRevenue.toLocaleString()}</span>
          <span>Faturamento Total</span>
        </div>
        <div className="customer-stat">
          <span className="stat-num">{totalOrders}</span>
          <span>Total Pedidos</span>
        </div>
      </div>

      <div className="customers-table-wrapper">
        <table className="customers-table-custom">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Pedidos</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td className="customer-id">{customer.id}</td>
                <td>
                  <strong>{customer.name}</strong>
                </td>
                <td>{customer.email}</td>
                <td>{customer.orders}</td>
                <td>{customer.total}</td>
                <td className="actions-cell">
                  <button className="icon-btn">
                    <Icon d={ICONS.eye} size={14} />
                  </button>
                  <button className="icon-btn">
                    <Icon d={ICONS.file} size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomersPage;
