import { useState } from "react";
import Icon from "../components/Icon";
import { ICONS } from "../constants/icons";
import NewReportModal from "./modals/NewReportModal";
import ConfirmModal from "../components/ConfirmModal";

const ReportsPage = () => {
  const [reports, setReports] = useState([
    {
      id: 1,
      name: "Produção Mensal",
      date: "Maio 2025",
      size: "2.4 MB",
      icon: "📊",
      type: "Produção",
      author: "Admin",
      downloads: 45,
    },
    {
      id: 2,
      name: "Eficiência por Linha",
      date: "Semana 21",
      size: "1.8 MB",
      icon: "📈",
      type: "Produção",
      author: "Admin",
      downloads: 32,
    },
    {
      id: 3,
      name: "Pedidos por Cliente",
      date: "Q1 2025",
      size: "3.1 MB",
      icon: "📋",
      type: "Pedidos",
      author: "Admin",
      downloads: 28,
    },
    {
      id: 4,
      name: "Inventário Geral",
      date: "Atualizado",
      size: "856 KB",
      icon: "📦",
      type: "Estoque",
      author: "Admin",
      downloads: 56,
    },
    {
      id: 5,
      name: "Análise Financeira",
      date: "Maio 2025",
      size: "1.2 MB",
      icon: "💰",
      type: "Financeiro",
      author: "Admin",
      downloads: 41,
    },
    {
      id: 6,
      name: "Produtividade",
      date: "Maio 2025",
      size: "945 KB",
      icon: "⚡",
      type: "Produção",
      author: "Admin",
      downloads: 23,
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: null,
  });
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
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

  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(
      () => setNotification({ show: false, message: "", type: "" }),
      3000,
    );
  };

  const handleSaveReport = (newReport) => {
    setReports([{ ...newReport, id: Date.now(), downloads: 0 }, ...reports]);
    showNotification("Relatório gerado com sucesso!", "success");
  };

  const handleDeleteReport = (id, name) => {
    showConfirm(
      "Remover Relatório",
      `Tem certeza que deseja remover o relatório "${name}"?`,
      () => {
        setReports(reports.filter((report) => report.id !== id));
        showNotification(
          `Relatório "${name}" removido com sucesso!`,
          "success",
        );
      },
    );
  };

  const handleViewDetails = (report) => {
    setSelectedReport(report);
  };

  const handleDownload = (report) => {
    // Incrementa o contador de downloads
    setReports(
      reports.map((r) =>
        r.id === report.id ? { ...r, downloads: r.downloads + 1 } : r,
      ),
    );
    showNotification(
      `Download do relatório "${report.name}" iniciado!`,
      "success",
    );
  };

  const totalDownloads = reports.reduce((acc, r) => acc + r.downloads, 0);
  const totalSize = reports.reduce((acc, r) => acc + parseFloat(r.size), 0);
  const avgSize =
    reports.length > 0 ? (totalSize / reports.length).toFixed(1) : 0;

  // Função para pegar a cor do tipo
  const getTypeColor = (type) => {
    switch (type) {
      case "Produção":
        return "#10b981";
      case "Financeiro":
        return "#f59e0b";
      case "Pedidos":
        return "#3b82f6";
      case "Estoque":
        return "#8b5cf6";
      default:
        return "#F4541D";
    }
  };

  return (
    <div className="page-reports">
      {/* Notificação Toast */}
      {notification.show && (
        <div className={`toast-notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
      />
      <NewReportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveReport}
      />

      {/* Modal de Detalhes */}
      {selectedReport && (
        <div className="modal-overlay" onClick={() => setSelectedReport(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Detalhes do Relatório</h2>
              <button
                className="modal-close"
                onClick={() => setSelectedReport(null)}
              >
                ✕
              </button>
            </div>
            <div className="report-details">
              <div className="detail-icon">{selectedReport.icon}</div>
              <h3>{selectedReport.name}</h3>
              <div className="detail-row">
                <span>Tipo:</span>
                <span style={{ color: getTypeColor(selectedReport.type) }}>
                  {selectedReport.type}
                </span>
              </div>
              <div className="detail-row">
                <span>Data:</span>
                <span>{selectedReport.date}</span>
              </div>
              <div className="detail-row">
                <span>Tamanho:</span>
                <span>{selectedReport.size}</span>
              </div>
              <div className="detail-row">
                <span>Autor:</span>
                <span>{selectedReport.author}</span>
              </div>
              <div className="detail-row">
                <span>Downloads:</span>
                <span>{selectedReport.downloads}</span>
              </div>
              <div className="modal-buttons">
                <button
                  className="btn-cancel"
                  onClick={() => setSelectedReport(null)}
                >
                  Fechar
                </button>
                <button
                  className="btn-save"
                  onClick={() => handleDownload(selectedReport)}
                >
                  Baixar Relatório
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Relatórios</h1>
          <p className="page-subtitle">Análises e exportações do sistema</p>
        </div>
        <button className="btn-new-order" onClick={() => setIsModalOpen(true)}>
          <Icon d={ICONS.plus} size={16} /> Gerar Relatório
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon">📄</div>
          <div className="stat-info">
            <span className="stat-number">{reports.length}</span>
            <span className="stat-label">Total Relatórios</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📥</div>
          <div className="stat-info">
            <span className="stat-number">{totalDownloads}</span>
            <span className="stat-label">Total Downloads</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💾</div>
          <div className="stat-info">
            <span className="stat-number">{avgSize} MB</span>
            <span className="stat-label">Tamanho Médio</span>
          </div>
        </div>
      </div>

      {/* Lista de Relatórios */}
      <div className="reports-list-container">
        {reports.map((report) => (
          <div className="report-card" key={report.id}>
            <div className="report-card-icon">{report.icon}</div>
            <div className="report-card-content">
              <h3>{report.name}</h3>
              <div className="report-card-meta">
                <span className="meta-date">📅 {report.date}</span>
                <span
                  className="meta-type"
                  style={{
                    background: `${getTypeColor(report.type)}20`,
                    color: getTypeColor(report.type),
                  }}
                >
                  {report.type}
                </span>
                <span className="meta-size">💾 {report.size}</span>
                <span className="meta-downloads">📥 {report.downloads}</span>
              </div>
            </div>
            <div className="report-card-actions">
              <button
                className="action-btn view"
                onClick={() => handleViewDetails(report)}
                title="Visualizar detalhes"
              >
                <Icon d={ICONS.eye} size={18} />
              </button>
              <button
                className="action-btn download"
                onClick={() => handleDownload(report)}
                title="Baixar relatório"
              >
                <Icon d={ICONS.arrowRight} size={18} />
              </button>
              <button
                className="action-btn delete"
                onClick={() => handleDeleteReport(report.id, report.name)}
                title="Remover relatório"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsPage;
