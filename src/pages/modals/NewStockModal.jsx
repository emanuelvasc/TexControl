import { useState } from "react";

const NewStockModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "Tecidos",
    quantity: "",
    min: "",
    supplier: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: `MAT-${Math.floor(Math.random() * 900) + 100}`,
      ...formData,
      qty: formData.quantity,
      status:
        parseInt(formData.quantity) < parseInt(formData.min) ? "alert" : "ok",
    };
    onSave(newItem);
    onClose();
    setFormData({
      name: "",
      category: "Tecidos",
      quantity: "",
      min: "",
      supplier: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Adicionar ao Estoque</h2>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome do Material *</label>
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
            <label>Categoria *</label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              <option>Tecidos</option>
              <option>Aviamentos</option>
              <option>Linhas</option>
              <option>Elásticos</option>
              <option>Etiquetas</option>
              <option>Embalagens</option>
            </select>
          </div>
          <div className="form-group">
            <label>Quantidade *</label>
            <input
              type="text"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: e.target.value })
              }
              placeholder="Ex: 1.200m ou 500 un"
              required
            />
          </div>
          <div className="form-group">
            <label>Quantidade Mínima *</label>
            <input
              type="text"
              value={formData.min}
              onChange={(e) =>
                setFormData({ ...formData, min: e.target.value })
              }
              placeholder="Ex: 500m"
              required
            />
          </div>
          <div className="form-group">
            <label>Fornecedor</label>
            <input
              type="text"
              value={formData.supplier}
              onChange={(e) =>
                setFormData({ ...formData, supplier: e.target.value })
              }
            />
          </div>
          <div className="modal-buttons">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-save">
              Adicionar Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewStockModal;
