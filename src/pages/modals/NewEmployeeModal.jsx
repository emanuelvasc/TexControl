import { useState } from "react";

const NewEmployeeModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    sector: "Linha A",
    status: "Ativo",
    efficiency: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEmployee = {
      id: `FUN-${Math.floor(Math.random() * 900) + 100}`,
      ...formData,
      efficiency: formData.efficiency ? `${formData.efficiency}%` : "-",
    };
    onSave(newEmployee);
    onClose();
    setFormData({
      name: "",
      role: "",
      sector: "Linha A",
      status: "Ativo",
      efficiency: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Novo Funcionário</h2>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome Completo *</label>
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
            <label>Função *</label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Setor *</label>
            <select
              value={formData.sector}
              onChange={(e) =>
                setFormData({ ...formData, sector: e.target.value })
              }
            >
              <option>Linha A</option>
              <option>Linha B</option>
              <option>Linha C</option>
              <option>Linha D</option>
              <option>Qualidade</option>
              <option>Administração</option>
            </select>
          </div>
          <div className="form-group">
            <label>Status</label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            >
              <option>Ativo</option>
              <option>Férias</option>
              <option>Ausente</option>
            </select>
          </div>
          <div className="form-group">
            <label>Eficiência (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={formData.efficiency}
              onChange={(e) =>
                setFormData({ ...formData, efficiency: e.target.value })
              }
              placeholder="Ex: 95"
            />
          </div>
          <div className="modal-buttons">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-save">
              Salvar Funcionário
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewEmployeeModal;
