import { useState } from "react";

const NewReportModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "Produção",
    period: "Mensal",
    format: "PDF",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReport = {
      id: `REL-${Math.floor(Math.random() * 900) + 100}`,
      ...formData,
      date: new Date().toLocaleDateString("pt-BR"),
      icon:
        formData.type === "Produção"
          ? "📊"
          : formData.type === "Financeiro"
            ? "💰"
            : "📋",
      size: "0 KB",
    };
    onSave(newReport);
    onClose();
    setFormData({
      name: "",
      type: "Produção",
      period: "Mensal",
      format: "PDF",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Gerar Relatório</h2>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome do Relatório *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              placeholder="Ex: Relatório de Produção - Maio"
            />
          </div>
          <div className="form-group">
            <label>Tipo de Relatório *</label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
            >
              <option>Produção</option>
              <option>Financeiro</option>
              <option>Pedidos</option>
              <option>Estoque</option>
              <option>Clientes</option>
            </select>
          </div>
          <div className="form-group">
            <label>Período</label>
            <select
              value={formData.period}
              onChange={(e) =>
                setFormData({ ...formData, period: e.target.value })
              }
            >
              <option>Diário</option>
              <option>Semanal</option>
              <option>Mensal</option>
              <option>Trimestral</option>
              <option>Anual</option>
            </select>
          </div>
          <div className="form-group">
            <label>Formato de Exportação</label>
            <select
              value={formData.format}
              onChange={(e) =>
                setFormData({ ...formData, format: e.target.value })
              }
            >
              <option>PDF</option>
              <option>Excel</option>
              <option>CSV</option>
            </select>
          </div>
          <div className="modal-buttons">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-save">
              Gerar Relatório
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewReportModal;
