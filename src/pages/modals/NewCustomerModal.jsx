import { useState } from "react";

const NewCustomerModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    document: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCustomer = {
      id: `CLI-${Math.floor(Math.random() * 900) + 100}`,
      ...formData,
      orders: 0,
      total: "R$ 0",
    };
    onSave(newCustomer);
    onClose();
    setFormData({ name: "", email: "", phone: "", document: "" });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Novo Cliente</h2>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome / Razão Social *</label>
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
            <label>E-mail *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Telefone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="(11) 99999-9999"
            />
          </div>
          <div className="form-group">
            <label>CNPJ/CPF</label>
            <input
              type="text"
              value={formData.document}
              onChange={(e) =>
                setFormData({ ...formData, document: e.target.value })
              }
            />
          </div>
          <div className="modal-buttons">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-save">
              Salvar Cliente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewCustomerModal;
