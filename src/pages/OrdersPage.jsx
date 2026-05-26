import { useState } from "react";
import Icon from "../components/Icon";
import { ICONS } from "../constants/icons";
import NewOrderModal from "./modals/NewOrderModal";
import ConfirmModal from "../components/ConfirmModal";

const OrdersPage = () => {
  const [orders, setOrders] = useState([
    {
      id: "#7841",
      client: "Esporte Total",
      product: "Uniformes Ciclismo",
      qty: 120,
      status: "Em produção",
      date: "20/05/2025",
    },
    {
      id: "#7840",
      client: "Team Runners",
      product: "Camisetas Corrida",
      qty: 80,
      status: "Concluído",
      date: "19/05/2025",
    },
    {
      id: "#7839",
      client: "Atlética FC",
      product: "Kit Futebol Completo",
      qty: 200,
      status: "Pendente",
      date: "22/05/2025",
    },
    {
      id: "#7838",
      client: "GymWear Pro",
      product: "Leggings Performance",
      qty: 150,
      status: "Em produção",
      date: "21/05/2025",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: null,
  });

  const showConfirm = (title, message, onConfirm) => {
    setConfirmModal({
      isOpen: true,
      title,
      message,
      onConfirm: () => {
        onConfirm();
        setConfirmModal({
          isOpen: false,
          title: "",
          message: "",
          onConfirm: null,
        });
      },
    });
  };

  const handleSaveOrder = (newOrder) => {
    if (editingOrder) {
      setOrders(
        orders.map((order) =>
          order.id === editingOrder.id ? { ...newOrder, id: order.id } : order,
        ),
      );
      setEditingOrder(null);
    } else {
      setOrders([newOrder, ...orders]);
    }
  };

  const handleEditOrder = (order) => {
    setEditingOrder(order);
    setIsModalOpen(true);
  };

  const handleDeleteOrder = (id, client) => {
    showConfirm(
      "Remover Pedido",
      `Tem certeza que deseja remover o pedido de ${client}?`,
      () => {
        setOrders(orders.filter((order) => order.id !== id));
      },
    );
  };

  const getStatusClass = (status) => {
    if (status === "Em produção") return "status-production";
    if (status === "Concluído") return "status-done";
    return "status-pending";
  };

  const totalValue = orders.reduce((acc, o) => acc + o.qty * 100, 0);

  return (
    <div className="page-orders">
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
      />
      <NewOrderModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingOrder(null);
        }}
        onSave={handleSaveOrder}
        editingOrder={editingOrder}
      />

      <div className="page-header">
        <div>
          <h1 className="page-title">Pedidos</h1>
          <p className="page-subtitle">Gestão completa de pedidos e status</p>
        </div>
        <button className="btn-new-order" onClick={() => setIsModalOpen(true)}>
          <Icon d={ICONS.plus} size={16} /> Novo Pedido
        </button>
      </div>

      <div className="orders-stats">
        <div className="stat-box">
          <span className="stat-value">{orders.length}</span>
          <span className="stat-label">Total Pedidos</span>
        </div>
        <div className="stat-box">
          <span className="stat-value">
            {orders.filter((o) => o.status === "Concluído").length}
          </span>
          <span className="stat-label">Concluídos</span>
        </div>
        <div className="stat-box">
          <span className="stat-value">R${totalValue.toLocaleString()}</span>
          <span className="stat-label">Faturamento</span>
        </div>
      </div>

      <div className="orders-table-wrapper">
        <table className="orders-table-custom">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Produto</th>
              <th>Qtd</th>
              <th>Data</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="order-id">{order.id}</td>
                <td>{order.client}</td>
                <td className="order-product">{order.product}</td>
                <td>{order.qty} pçs</td>
                <td>{order.date}</td>
                <td>
                  <span
                    className={`status-badge-custom ${getStatusClass(order.status)}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="order-actions-cell">
                  <button
                    className="icon-btn"
                    onClick={() => handleEditOrder(order)}
                  >
                    <Icon d={ICONS.file} size={14} />
                  </button>
                  <button
                    className="icon-btn delete"
                    onClick={() => handleDeleteOrder(order.id, order.client)}
                  >
                    <Icon d={ICONS.x} size={14} />
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

export default OrdersPage;
