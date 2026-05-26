import { useState } from "react";
import Icon from "../components/Icon";
import { ICONS } from "../constants/icons";
import NewStockModal from "./modals/NewStockModal";
import ConfirmModal from "../components/ConfirmModal";

const StockPage = () => {
  const [stock, setStock] = useState([
    {
      id: "MAT-001",
      name: "Malha Poliéster",
      category: "Tecidos",
      qty: "1.200m",
      min: "500m",
      status: "ok",
    },
    {
      id: "MAT-002",
      name: "Zíper YKK",
      category: "Aviamentos",
      qty: "4.800 un",
      min: "1.000 un",
      status: "ok",
    },
    {
      id: "MAT-003",
      name: "Elástico 2cm",
      category: "Elásticos",
      qty: "800m",
      min: "300m",
      status: "ok",
    },
    {
      id: "MAT-004",
      name: "Fio Nylon",
      category: "Linhas",
      qty: "320 un",
      min: "100 un",
      status: "ok",
    },
    {
      id: "MAT-005",
      name: "Botões",
      category: "Aviamentos",
      qty: "9.200 un",
      min: "2.000 un",
      status: "ok",
    },
    {
      id: "MAT-006",
      name: "Etiquetas",
      category: "Etiquetas",
      qty: "2.100 un",
      min: "500 un",
      status: "alert",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
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

  const handleSaveItem = (newItem) => {
    if (editingItem) {
      setStock(
        stock.map((item) =>
          item.id === editingItem.id ? { ...newItem, id: item.id } : item,
        ),
      );
      setEditingItem(null);
    } else {
      setStock([newItem, ...stock]);
    }
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDeleteItem = (id, name) => {
    showConfirm(
      "Remover Item",
      `Tem certeza que deseja remover ${name} do estoque?`,
      () => {
        setStock(stock.filter((item) => item.id !== id));
      },
    );
  };

  const totalItems = stock.length;
  const alertItems = stock.filter((item) => item.status === "alert").length;
  const categories = [...new Set(stock.map((item) => item.category))].length;

  return (
    <div className="page-stock">
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
      />
      <NewStockModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem(null);
        }}
        onSave={handleSaveItem}
        editingItem={editingItem}
      />

      <div className="page-header">
        <div>
          <h1 className="page-title">Estoque</h1>
          <p className="page-subtitle">Controle de insumos e produtos</p>
        </div>
        <button className="btn-new-order" onClick={() => setIsModalOpen(true)}>
          <Icon d={ICONS.plus} size={16} /> Adicionar Item
        </button>
      </div>

      <div className="stock-stats">
        <div className="stock-stat">
          <span className="stat-num">{totalItems}</span>
          <span>Itens no Estoque</span>
        </div>
        <div className="stock-stat">
          <span className="stat-num">{categories}</span>
          <span>Categorias</span>
        </div>
        <div className="stock-stat">
          <span className="stat-num">{alertItems}</span>
          <span>Itens com Alerta</span>
        </div>
      </div>

      <div className="stock-grid-custom">
        {stock.map((item) => (
          <div
            className={`stock-item ${item.status === "alert" ? "alert" : ""}`}
            key={item.id}
          >
            <div className="stock-item-header">
              <span className="stock-id">{item.id}</span>
              {item.status === "alert" && (
                <span className="alert-badge">⚠️ Baixo</span>
              )}
              <div className="stock-item-actions">
                <button
                  className="icon-btn"
                  onClick={() => handleEditItem(item)}
                >
                  <Icon d={ICONS.file} size={12} />
                </button>
                <button
                  className="icon-btn delete"
                  onClick={() => handleDeleteItem(item.id, item.name)}
                >
                  ✕
                </button>
              </div>
            </div>
            <h3>{item.name}</h3>
            <p className="stock-category">{item.category}</p>
            <div className="stock-qty">{item.qty}</div>
            <div className="stock-min">Mínimo: {item.min}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockPage;
