import { useState } from "react";
import Icon from "../components/Icon";
import { ICONS } from "../constants/icons";
import ConfirmModal from "../components/ConfirmModal";

const ProductionPage = () => {
  const [productionLines, setProductionLines] = useState([
    {
      id: 1,
      name: "Linha A - Costura",
      progress: 78,
      color: "#F4541D",
      orders: ["Uniformes Ciclismo", "Camisetas Corrida"],
    },
    {
      id: 2,
      name: "Linha B - Corte",
      progress: 62,
      color: "#8B6FF5",
      orders: ["Kit Futebol Completo"],
    },
    {
      id: 3,
      name: "Linha C - Acabamento",
      progress: 91,
      color: "#10b981",
      orders: ["Leggings Performance", "Agasalhos Treino"],
    },
    {
      id: 4,
      name: "Linha D - Estamparia",
      progress: 45,
      color: "#f59e0b",
      orders: ["Camisas Personalizadas"],
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLine, setEditingLine] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    color: "#F4541D",
    orders: "",
  });

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedLineId, setSelectedLineId] = useState(null);
  const [newOrderName, setNewOrderName] = useState("");

  // Estados para o modal de confirmação
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: null,
  });

  const colors = [
    { value: "#F4541D", name: "Laranja" },
    { value: "#8B6FF5", name: "Roxo" },
    { value: "#10b981", name: "Verde" },
    { value: "#f59e0b", name: "Amarelo" },
    { value: "#3b82f6", name: "Azul" },
    { value: "#ef4444", name: "Vermelho" },
    { value: "#ec4899", name: "Rosa" },
  ];

  const totalProgress =
    productionLines.length > 0
      ? Math.round(
          productionLines.reduce((acc, line) => acc + line.progress, 0) /
            productionLines.length,
        )
      : 0;

  const totalOrders = productionLines.reduce(
    (acc, line) => acc + line.orders.length,
    0,
  );

  // Função para mostrar modal de confirmação
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

  const handleOpenModal = () => {
    setEditingLine(null);
    setFormData({ name: "", color: "#F4541D", orders: "" });
    setIsModalOpen(true);
  };

  const handleEditLine = (line) => {
    setEditingLine(line);
    setFormData({
      name: line.name,
      color: line.color,
      orders: line.orders.join(", "),
    });
    setIsModalOpen(true);
  };

  const handleSaveLine = () => {
    if (!formData.name.trim()) {
      alert("Digite o nome da linha de produção");
      return;
    }

    const ordersArray = formData.orders
      .split(",")
      .map((o) => o.trim())
      .filter((o) => o);

    if (editingLine) {
      setProductionLines(
        productionLines.map((line) =>
          line.id === editingLine.id
            ? {
                ...line,
                name: formData.name,
                color: formData.color,
                orders: ordersArray,
              }
            : line,
        ),
      );
    } else {
      const newLine = {
        id: Date.now(),
        name: formData.name,
        progress: 0,
        color: formData.color,
        orders: ordersArray,
      };
      setProductionLines([...productionLines, newLine]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteLine = (id, lineName) => {
    showConfirm(
      "Remover Linha",
      `Tem certeza que deseja remover a linha "${lineName}"? Esta ação não pode ser desfeita.`,
      () => {
        setProductionLines(productionLines.filter((line) => line.id !== id));
      },
    );
  };

  const handleUpdateProgress = (id, newProgress) => {
    const progress = Math.min(100, Math.max(0, newProgress));
    setProductionLines(
      productionLines.map((line) =>
        line.id === id ? { ...line, progress } : line,
      ),
    );
  };

  const handleRemoveOrder = (lineId, orderName, orderIndex) => {
    showConfirm(
      "Remover Ordem",
      `Tem certeza que deseja remover a ordem "${orderName}" da linha de produção?`,
      () => {
        setProductionLines(
          productionLines.map((line) =>
            line.id === lineId
              ? {
                  ...line,
                  orders: line.orders.filter((_, i) => i !== orderIndex),
                }
              : line,
          ),
        );
      },
    );
  };

  const handleOpenOrderModal = (lineId) => {
    setSelectedLineId(lineId);
    setNewOrderName("");
    setIsOrderModalOpen(true);
  };

  const handleSaveOrder = () => {
    if (!newOrderName.trim()) {
      alert("Digite o nome da ordem de produção");
      return;
    }

    setProductionLines(
      productionLines.map((line) =>
        line.id === selectedLineId
          ? { ...line, orders: [...line.orders, newOrderName.trim()] }
          : line,
      ),
    );
    setIsOrderModalOpen(false);
    setNewOrderName("");
  };

  return (
    <div className="page-production">
      {/* Modal de Confirmação Personalizado */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() =>
          setConfirmModal({
            isOpen: false,
            title: "",
            message: "",
            onConfirm: null,
          })
        }
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
      />

      {/* Modal de Nova/Editar Linha */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingLine ? "Editar Linha" : "Nova Linha de Produção"}</h2>
              <button
                className="modal-close"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveLine();
              }}
            >
              <div className="form-group">
                <label>Nome da Linha *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Ex: Linha E - Estamparia"
                  required
                />
              </div>
              <div className="form-group">
                <label>Cor da Linha</label>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {colors.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, color: color.value })
                      }
                      style={{
                        width: "40px",
                        height: "40px",
                        background: color.value,
                        border:
                          formData.color === color.value
                            ? "3px solid white"
                            : "1px solid var(--border)",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label>Ordens de Produção (separadas por vírgula)</label>
                <textarea
                  value={formData.orders}
                  onChange={(e) =>
                    setFormData({ ...formData, orders: e.target.value })
                  }
                  placeholder="Ex: Camisetas, Calças, Uniformes"
                  rows="3"
                />
                <small style={{ color: "var(--muted)" }}>
                  Digite os nomes das ordens separados por vírgula
                </small>
              </div>
              <div className="modal-buttons">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-save">
                  {editingLine ? "Salvar Alterações" : "Criar Linha"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para Adicionar Ordem */}
      {isOrderModalOpen && (
        <div
          className="modal-overlay"
          onClick={() => setIsOrderModalOpen(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Adicionar Ordem de Produção</h2>
              <button
                className="modal-close"
                onClick={() => setIsOrderModalOpen(false)}
              >
                ✕
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveOrder();
              }}
            >
              <div className="form-group">
                <label>Nome da Ordem *</label>
                <input
                  type="text"
                  value={newOrderName}
                  onChange={(e) => setNewOrderName(e.target.value)}
                  placeholder="Ex: Uniformes Novos, Camisetas Verão"
                  required
                  autoFocus
                />
              </div>
              <div className="modal-buttons">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setIsOrderModalOpen(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-save">
                  Adicionar Ordem
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Produção</h1>
          <p className="page-subtitle">
            Linhas de produção e ordens em andamento
          </p>
        </div>
        <button className="btn-new-order" onClick={handleOpenModal}>
          <Icon d={ICONS.plus} size={16} /> Nova Linha
        </button>
      </div>

      {/* KPIs */}
      <div className="production-kpis">
        <div className="kpi-prod">
          <span className="kpi-value">{productionLines.length}</span>
          <span>Linhas Ativas</span>
        </div>
        <div className="kpi-prod">
          <span className="kpi-value">{totalProgress}%</span>
          <span>Eficiência Geral</span>
        </div>
        <div className="kpi-prod">
          <span className="kpi-value">{totalOrders}</span>
          <span>Ordens em Andamento</span>
        </div>
      </div>

      {/* Linhas de Produção */}
      <div className="production-lines">
        {productionLines.length === 0 ? (
          <div className="empty-state">
            <p>Nenhuma linha de produção cadastrada</p>
            <button className="btn-primary" onClick={handleOpenModal}>
              Criar primeira linha
            </button>
          </div>
        ) : (
          productionLines.map((line) => (
            <div className="production-line" key={line.id}>
              <div className="line-header">
                <div className="line-title">
                  <h3>{line.name}</h3>
                  <div className="line-actions">
                    <button
                      className="icon-btn"
                      onClick={() => handleEditLine(line)}
                      title="Editar"
                    >
                      <Icon d={ICONS.file} size={14} />
                    </button>
                    <button
                      className="icon-btn delete"
                      onClick={() => handleDeleteLine(line.id, line.name)}
                      title="Remover"
                    >
                      ✕
                    </button>
                  </div>
                </div>
                <div className="line-progress-control">
                  <span className="line-progress">{line.progress}%</span>
                  <div className="progress-buttons">
                    <button
                      onClick={() =>
                        handleUpdateProgress(line.id, line.progress - 10)
                      }
                      disabled={line.progress <= 0}
                    >
                      -10%
                    </button>
                    <button
                      onClick={() =>
                        handleUpdateProgress(line.id, line.progress + 10)
                      }
                      disabled={line.progress >= 100}
                    >
                      +10%
                    </button>
                  </div>
                </div>
              </div>

              {/* Barra de Progresso */}
              <div className="line-bar">
                <div
                  className="line-fill"
                  style={{ width: `${line.progress}%`, background: line.color }}
                ></div>
              </div>

              {/* Ordens de Produção */}
              <div className="line-orders">
                <div className="orders-header">
                  <span>📋 Ordens de produção:</span>
                  <button
                    className="add-order-btn"
                    onClick={() => handleOpenOrderModal(line.id)}
                  >
                    <Icon d={ICONS.plus} size={12} /> Adicionar
                  </button>
                </div>
                <div className="orders-list">
                  {line.orders.length === 0 ? (
                    <span className="empty-orders">
                      Nenhuma ordem nesta linha
                    </span>
                  ) : (
                    line.orders.map((order, idx) => (
                      <div key={idx} className="order-tag">
                        <span>{order}</span>
                        <button
                          className="remove-order"
                          onClick={() => handleRemoveOrder(line.id, order, idx)}
                        >
                          ✕
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductionPage;
