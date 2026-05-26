import { useState } from "react";
import Icon from "../../components/Icon";
import { ICONS } from "../../constants/icons";

const NewOrderModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    client: "",
    product: "",
    qty: "",
    status: "Pendente",
    date: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOrder = {
      id: `#${Math.floor(Math.random() * 9000) + 1000}`,
      ...formData,
      qty: parseInt(formData.qty),
    };
    onSave(newOrder);
    onClose();
    setFormData({
      client: "",
      product: "",
      qty: "",
      status: "Pendente",
      date: new Date().toISOString().split("T")[0],
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Novo Pedido</h2>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Cliente *</label>
            <input
              type="text"
              value={formData.client}
              onChange={(e) =>
                setFormData({ ...formData, client: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Produto *</label>
            <input
              type="text"
              value={formData.product}
              onChange={(e) =>
                setFormData({ ...formData, product: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Quantidade *</label>
            <input
              type="number"
              value={formData.qty}
              onChange={(e) =>
                setFormData({ ...formData, qty: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            >
              <option>Pendente</option>
              <option>Em produção</option>
              <option>Concluído</option>
            </select>
          </div>
          <div className="form-group">
            <label>Data</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            />
          </div>
          <div className="modal-buttons">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-save">
              Salvar Pedido
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewOrderModal;
