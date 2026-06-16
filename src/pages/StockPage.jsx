import { useState, useEffect } from "react";
import Icon from "../components/Icon";
import { ICONS } from "../constants/icons";
import { supabase } from "../lib/supabase";

const StockPage = () => {
  const [stock, setStock] = useState(null); // 👈 importante (evita flash)
  const [showForm, setShowForm] = useState(false);

  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    qty: "",
    min: "",
  });

  const loadStock = async () => {
    const { data, error } = await supabase
      .from("stock")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Erro ao carregar estoque:", error);
      setStock([]);
      return;
    }

    setStock(data || []);
  };

  useEffect(() => {
    loadStock();
  }, []);

  const handleSave = async () => {
    if (!newItem.name.trim()) return;

    const qty = Number(newItem.qty) || 0;
    const min = Number(newItem.min) || 0;

    const { error } = await supabase.from("stock").insert([
      {
        name: newItem.name,
        category: newItem.category || "Geral",
        qty,
        min,
        status: qty <= min ? "alert" : "ok",
      },
    ]);

    if (error) {
      console.error(error);
      return;
    }

    setNewItem({
      name: "",
      category: "",
      qty: "",
      min: "",
    });

    setShowForm(false);
    loadStock();
  };

  const handleDelete = async (id) => {
    const { error } = await supabase
      .from("stock")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      return;
    }

    loadStock();
  };

  // =========================
  // 📊 ESTATÍSTICAS SEGURAS
  // =========================

  const totalItems = stock?.length || 0;

  const categories = new Set(
    stock?.map((item) => item.category) || []
  ).size;

  const alertItems =
    stock?.filter((item) => item.status === "alert").length || 0;

  return (
    <div className="page-stock">

      {/* HEADER */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Estoque</h1>
          <p className="page-subtitle">
            Controle de insumos e produtos
          </p>
        </div>

        <button
          className="btn-new-order"
          onClick={() => setShowForm(!showForm)}
        >
          <Icon d={ICONS.plus} size={16} />
          Adicionar Item
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="stock-form-container">
          <div className="stock-form">

            <input
              placeholder="Nome do material"
              value={newItem.name}
              onChange={(e) =>
                setNewItem({
                  ...newItem,
                  name: e.target.value,
                })
              }
            />

            <input
              placeholder="Categoria"
              value={newItem.category}
              onChange={(e) =>
                setNewItem({
                  ...newItem,
                  category: e.target.value,
                })
              }
            />

            <input
              type="number"
              placeholder="Quantidade"
              value={newItem.qty}
              onChange={(e) =>
                setNewItem({
                  ...newItem,
                  qty: e.target.value,
                })
              }
            />

            <input
              type="number"
              placeholder="Quantidade mínima"
              value={newItem.min}
              onChange={(e) =>
                setNewItem({
                  ...newItem,
                  min: e.target.value,
                })
              }
            />

            <button onClick={handleSave}>
              Salvar
            </button>

            <button onClick={() => setShowForm(false)}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* 📊 STATS */}
      <div className="stock-stats">
        <div className="stock-stat">
          <span className="stat-num">{totalItems}</span>
          <span>Itens no Estoque</span>
        </div>

        <div className="stock-stat">
          <span className="stat-num">{categories}</span>
          <span>Categorias</span>
        </div>

        <div className="stock-stat">
          <span className="stat-num">{alertItems}</span>
          <span>Itens com Alerta</span>
        </div>
      </div>

      {/* GRID (SAFE RENDER) */}
      <div className="stock-grid-custom">
        {stock === null ? (
          <div /> // 👈 nada aparece (evita flash 100%)
        ) : stock.length === 0 ? (
          <div className="empty-state">
            <p>Nenhum item no estoque</p>

            <button
              className="btn-primary"
              onClick={() => setShowForm(true)}
            >
              Adicionar primeiro item
            </button>
          </div>
        ) : (
          stock.map((item) => (
            <div
              key={item.id}
              className={`stock-item ${
                item.status === "alert" ? "alert" : ""
              }`}
            >
              <div className="stock-item-header">
                <span className="stock-id">
                  MAT-
                  {String(item.id).padStart(3, "0")}
                </span>

                {item.status === "alert" && (
                  <span className="alert-badge">
                    ⚠️ Baixo
                  </span>
                )}

                <button
                  className="icon-btn delete"
                  onClick={() => handleDelete(item.id)}
                >
                  ✕
                </button>
              </div>

              <h3>{item.name}</h3>
              <p className="stock-category">{item.category}</p>

              <div className="stock-qty">{item.qty}</div>

              <div className="stock-min">
                Mínimo: {item.min}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StockPage;