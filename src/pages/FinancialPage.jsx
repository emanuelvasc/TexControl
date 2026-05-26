import { useState } from "react";
import Icon from "../components/Icon";
import { ICONS } from "../constants/icons";
import NewFinancialModal from "./modals/NewFinancialModal";

const FinancialPage = () => {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      name: "Faturamento",
      value: "R$ 128.400",
      variation: "+12%",
      type: "up",
    },
    {
      id: 2,
      name: "Custos",
      value: "R$ 74.200",
      variation: "-3%",
      type: "down",
    },
    {
      id: 3,
      name: "Margem Bruta",
      value: "42,2%",
      variation: "+2%",
      type: "up",
    },
    {
      id: 4,
      name: "Lucro Líquido",
      value: "R$ 21.700",
      variation: "+8%",
      type: "up",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveTransaction = (newTransaction) => {
    setTransactions([newTransaction, ...transactions]);
  };

  return (
    <div className="page-financial">
      <NewFinancialModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTransaction}
      />

      <div className="page-header">
        <div>
          <h1 className="page-title">Financeiro</h1>
          <p className="page-subtitle">Receitas, custos e indicadores</p>
        </div>
        <button className="btn-new-order" onClick={() => setIsModalOpen(true)}>
          <Icon d={ICONS.plus} size={16} /> Nova Transação
        </button>
      </div>

      <div className="financial-grid-custom">
        {transactions.map((item, idx) => (
          <div className={`financial-card-custom ${item.type}`} key={idx}>
            <h3>{item.name}</h3>
            <div className="financial-value-custom">{item.value}</div>
            <div className={`financial-variation ${item.type}`}>
              {item.variation}
            </div>
          </div>
        ))}
      </div>

      <div className="financial-details">
        <div className="financial-section">
          <h3>Receitas do Mês</h3>
          <div className="receipt-item">
            <span>Vendas de Produtos</span>
            <span>R$ 98.400</span>
          </div>
          <div className="receipt-item">
            <span>Serviços</span>
            <span>R$ 22.000</span>
          </div>
          <div className="receipt-item total">
            <span>Total</span>
            <span>R$ 120.400</span>
          </div>
        </div>
        <div className="financial-section">
          <h3>Despesas do Mês</h3>
          <div className="receipt-item">
            <span>Matéria-prima</span>
            <span>R$ 42.300</span>
          </div>
          <div className="receipt-item">
            <span>Folha de Pagamento</span>
            <span>R$ 28.500</span>
          </div>
          <div className="receipt-item total">
            <span>Total</span>
            <span>R$ 70.800</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialPage;
