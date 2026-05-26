import { useState } from "react";

const NewFinancialModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    value: "",
    type: "Receita",
    date: new Date().toISOString().split("T")[0],
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      id: `FIN-${Math.floor(Math.random() * 900) + 100}`,
      ...formData,
      value: `R$ ${parseFloat(formData.value).toLocaleString("pt-BR")}`,
    };
    onSave(newTransaction);
    onClose();
    setFormData({
      name: "",
      value: "",
      type: "Receita",
      date: new Date().toISOString().split("T")[0],
      description: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Nova Transação</h2>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Descrição *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Tipo *</label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
            >
              <option>Receita</option>
              <option>Despesa</option>
            </select>
          </div>
          <div className="form-group">
            <label>Valor (R$) *</label>
            <input
              type="number"
              step="0.01"
              value={formData.value}
              onChange={(e) =>
                setFormData({ ...formData, value: e.target.value })
              }
              required
            />
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
          <div className="form-group">
            <label>Observações</label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows="3"
            ></textarea>
          </div>
          <div className="modal-buttons">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-save">
              Salvar Transação
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewFinancialModal;
