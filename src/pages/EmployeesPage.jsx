import { useState } from "react";
import Icon from "../components/Icon";
import { ICONS } from "../constants/icons";
import NewEmployeeModal from "./modals/NewEmployeeModal";
import ConfirmModal from "../components/ConfirmModal";

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([
    {
      id: "FUN-001",
      name: "Ana Oliveira",
      role: "Costureira",
      sector: "Linha A",
      status: "Ativo",
      efficiency: "96%",
      phone: "(11) 99999-1111",
      email: "ana@texcontrol.com",
      admission: "10/01/2023",
    },
    {
      id: "FUN-002",
      name: "Carlos Silva",
      role: "Cortador",
      sector: "Linha B",
      status: "Ativo",
      efficiency: "88%",
      phone: "(11) 99999-2222",
      email: "carlos@texcontrol.com",
      admission: "15/03/2023",
    },
    {
      id: "FUN-003",
      name: "Maria Santos",
      role: "Acabamento",
      sector: "Linha A",
      status: "Ativo",
      efficiency: "92%",
      phone: "(11) 99999-3333",
      email: "maria@texcontrol.com",
      admission: "20/02/2023",
    },
    {
      id: "FUN-004",
      name: "João Ferreira",
      role: "Inspetor",
      sector: "Qualidade",
      status: "Ativo",
      efficiency: "100%",
      phone: "(11) 99999-4444",
      email: "joao@texcontrol.com",
      admission: "05/01/2023",
    },
    {
      id: "FUN-005",
      name: "Patrícia Lima",
      role: "Estampadora",
      sector: "Linha D",
      status: "Férias",
      efficiency: "-",
      phone: "(11) 99999-5555",
      email: "patricia@texcontrol.com",
      admission: "10/04/2023",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
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

  const handleSaveEmployee = (newEmployee) => {
    if (editingEmployee) {
      setEmployees(
        employees.map((emp) =>
          emp.id === editingEmployee.id ? { ...newEmployee, id: emp.id } : emp,
        ),
      );
      setEditingEmployee(null);
    } else {
      setEmployees([newEmployee, ...employees]);
    }
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setIsModalOpen(true);
  };

  const handleDeleteEmployee = (id, name) => {
    showConfirm(
      "Remover Funcionário",
      `Tem certeza que deseja remover ${name}?`,
      () => {
        setEmployees(employees.filter((emp) => emp.id !== id));
      },
    );
  };

  const activeEmployees = employees.filter((e) => e.status === "Ativo").length;

  return (
    <div className="page-employees">
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
      />
      <NewEmployeeModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingEmployee(null);
        }}
        onSave={handleSaveEmployee}
        editingEmployee={editingEmployee}
      />

      <div className="page-header">
        <div>
          <h1 className="page-title">Funcionários</h1>
          <p className="page-subtitle">Gestão de equipe e desempenho</p>
        </div>
        <button className="btn-new-order" onClick={() => setIsModalOpen(true)}>
          <Icon d={ICONS.plus} size={16} /> Novo Funcionário
        </button>
      </div>

      <div className="employees-stats">
        <div className="employee-stat">
          <span className="stat-num">{employees.length}</span>
          <span>Total Funcionários</span>
        </div>
        <div className="employee-stat">
          <span className="stat-num">{activeEmployees}</span>
          <span>Ativos</span>
        </div>
        <div className="employee-stat">
          <span className="stat-num">92%</span>
          <span>Eficiência Média</span>
        </div>
      </div>

      <div className="employees-grid-custom">
        {employees.map((emp) => (
          <div className="employee-card-custom" key={emp.id}>
            <div className="employee-avatar-custom">{emp.name.charAt(0)}</div>
            <h3>{emp.name}</h3>
            <p className="employee-role-custom">{emp.role}</p>
            <p className="employee-sector-custom">{emp.sector}</p>
            <div className="employee-details">
              <div className="employee-detail-item">
                <span>📞</span>
                {emp.phone}
              </div>
              <div className="employee-detail-item">
                <span>✉️</span>
                {emp.email}
              </div>
              <div className="employee-detail-item">
                <span>📅</span>Admissão: {emp.admission}
              </div>
            </div>
            <div className="employee-footer">
              <span
                className={`employee-status-badge ${emp.status === "Ativo" ? "active" : "vacation"}`}
              >
                {emp.status}
              </span>
              <span className="employee-efficiency">{emp.efficiency}</span>
              <div className="employee-actions">
                <button
                  className="icon-btn"
                  onClick={() => handleEditEmployee(emp)}
                >
                  <Icon d={ICONS.file} size={14} />
                </button>
                <button
                  className="icon-btn delete"
                  onClick={() => handleDeleteEmployee(emp.id, emp.name)}
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeesPage;
