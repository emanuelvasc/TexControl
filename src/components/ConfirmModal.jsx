const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="confirm-modal-overlay" onClick={onClose}>
      <div
        className="confirm-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="confirm-modal-header">
          <h3>{title || "Confirmar"}</h3>
        </div>
        <div className="confirm-modal-body">
          <p>{message || "Tem certeza que deseja realizar esta ação?"}</p>
        </div>
        <div className="confirm-modal-footer">
          <button className="confirm-btn-cancel" onClick={onClose}>
            Cancelar
          </button>
          <button className="confirm-btn-ok" onClick={onConfirm}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
