// src/pages/DashboardClientPage.jsx
import { useState, useEffect } from "react";
import Icon from "../components/Icon";
import Navbar from "../components/Navbar";
import { ICONS } from "../constants/icons";
import SettingsPage from "./SettingsPage";

const DashboardClientPage = ({ onLogout, userData }) => {
  const [activePage, setActivePage] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Função para navegação via navbar
  const handleNavbarNavigate = (page) => {
    setActivePage(page);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const menuItems = [
    { id: "home", label: "Início", icon: ICONS.home, section: "MENU" },
    { id: "order", label: "Solicitar Encomenda", icon: ICONS.plus },
    { id: "myorders", label: "Minhas Encomendas", icon: ICONS.orders }, // ← MOVIDO PARA DEPOIS DE SOLICITAR ENCOMENDA
    { id: "about", label: "Sobre Nós", icon: ICONS.info },
    { id: "contact", label: "Contato", icon: ICONS.mail },
    { id: "settings", label: "Configurações", icon: ICONS.settings, section: "CONTA" },
  ];

  let prevSection = "";

  return (
    <div className="app">
      <Navbar 
        scrolled={true} 
        isLanding={false}
        isClient={true}
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        onNavigate={handleNavbarNavigate}
      />

      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>
      )}

      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div style={{ padding: "20px 16px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 10 }}>
          <div className="logo-mark">T</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 20 }}>TEX<span style={{ color: "var(--orange)" }}>CONTROL</span></div>
        </div>

        <nav style={{ padding: "16px 12px", flex: 1 }}>
          {menuItems.map((item) => {
            const showSection = item.section && item.section !== prevSection;
            if (item.section) prevSection = item.section;
            return (
              <div key={item.id}>
                {showSection && (
                  <div style={{ padding: "12px 12px 4px", fontSize: 10, color: "rgba(255,255,255,0.3)" }}>
                    {item.section}
                  </div>
                )}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "10px 12px",
                    borderRadius: 10,
                    cursor: "pointer",
                    marginBottom: 4,
                    color: activePage === item.id ? "var(--orange)" : "var(--muted)",
                    background: activePage === item.id ? "rgba(244,84,29,0.1)" : "transparent"
                  }}
                  onClick={() => setActivePage(item.id)}
                >
                  <Icon d={item.icon} size={18} />
                  <span>{item.label}</span>
                </div>
              </div>
            );
          })}
        </nav>

        <div style={{ padding: 16, borderTop: "1px solid var(--border)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, var(--orange), var(--accent))", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>{userData?.name?.charAt(0) || "C"}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--white)" }}>{userData?.name || "Cliente"}</div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>{userData?.email || "cliente@email.com"}</div>
            </div>
          </div>
          <button onClick={onLogout} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "rgba(255,71,87,0.1)", border: "1px solid rgba(255,71,87,0.3)", borderRadius: 8, color: "#ff4757", padding: 10, cursor: "pointer" }}>
            <Icon d={ICONS.logout} size={14} /> Sair
          </button>
        </div>
      </aside>

      <div className="main-content">
        <div className="client-content">
          {activePage === "home" && <ClientHome setActivePage={setActivePage} />}
          {activePage === "order" && <ClientOrder userData={userData} />}
          {activePage === "myorders" && <ClientMyOrders userData={userData} />}
          {activePage === "about" && <ClientAbout />}
          {activePage === "contact" && <ClientContact />}
          {activePage === "settings" && <SettingsPage userData={userData} userType="client" />}
        </div>
      </div>
    </div>
  );
};

// ========== PÁGINA INICIAL - PRODUTOS ==========
const ClientHome = ({ setActivePage }) => {
  const products = [
    {
      id: 1,
      name: "Camisetas Personalizadas",
      description: "Alta qualidade, diversas cores e estampas",
      price: "A partir de R$ 29,90",
      image: "https://lumarepersonalizados.com.br/wp-content/uploads/2021/07/2f1feefb-3ce2-4645-a45b-3d6d65fae158.jpg",
      tag: "Mais Vendido"
    },
    {
      id: 2,
      name: "Uniformes Esportivos",
      description: "Tecnologia e conforto para sua equipe",
      price: "A partir de R$ 89,90",
      image: "https://cf.shopee.com.br/file/bc720e4937ccb88b87dc84bd441089dd",
      tag: "Novidade"
    },
    {
      id: 3,
      name: "Moletons e Jaquetas",
      description: "Ideal para times e uniformes corporativos",
      price: "A partir de R$ 129,90",
      image: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m228oru9n4dge1",
      tag: "Premium"
    },
    {
      id: 4,
      name: "Bolsas e Mochilas",
      description: "Personalização completa para sua marca",
      price: "A partir de R$ 49,90",
      image: "https://www.maggenta.com.br/imagem/mochila-saco-personalizada-pm952.jpg",
      tag: "Oferta"
    },
    {
      id: 5,
      name: "Bonés e Acessórios",
      description: "Complementos perfeitos para sua coleção",
      price: "A partir de R$ 19,90",
      image: "https://camisetasrapido.com.br/wp-content/uploads/2025/07/20.png",
      tag: "Promoção"
    },
    {
      id: 6,
      name: "Agasalhos Térmicos",
      description: "Proteção e estilo para dias frios",
      price: "A partir de R$ 159,90",
      image: "https://wbl.blob.core.windows.net/cdn/135/1-jaqueta-corta-vento-misty-540x690mm-em-tecido-tactel-4x0-impressao-ultra-hd-sublimatica-tamanho-p-costura-912628.png",
      tag: "Inverno 2025"
    },
  ];

  const goToOrderPage = () => {
    setActivePage("order");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <div className="client-hero">
        <div className="client-hero-content">
          <h1>Moda e Qualidade<br /><span>para sua marca</span></h1>
          <p>Confecção de peças personalizadas com excelência e prazo garantido</p>
          <button className="btn-primary" onClick={goToOrderPage}>
            Solicitar Orçamento →
          </button>
        </div>
      </div>

      <div id="products" className="client-products">
        <div className="page-header">
          <div>
            <h1 className="page-title">Nossos Produtos</h1>
            <p className="page-subtitle">Confira nossa linha de produtos personalizáveis</p>
          </div>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                {product.tag && <span className="product-tag">{product.tag}</span>}
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="product-price">{product.price}</div>
                <button className="btn-secondary" onClick={goToOrderPage}>
                  Solicitar Orçamento
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="client-differentials">
        <div className="page-header">
          <h1 className="page-title">Por que escolher a TEXCONTROL?</h1>
        </div>
        <div className="differentials-grid">
          <div className="differential-card">
            <Icon d={ICONS.production} size={40} color="var(--orange)" />
            <h3>Produção Própria</h3>
            <p>Controle total de qualidade desde a matéria-prima</p>
          </div>
          <div className="differential-card">
            <Icon d={ICONS.orders} size={40} color="var(--orange)" />
            <h3>Prazo Garantido</h3>
            <p>Entregamos no prazo combinado ou seu dinheiro de volta</p>
          </div>
          <div className="differential-card">
            <Icon d={ICONS.stock} size={40} color="var(--orange)" />
            <h3>Personalização Total</h3>
            <p>Estampas, bordados e modelagens exclusivas</p>
          </div>
          <div className="differential-card">
            <Icon d={ICONS.chart} size={40} color="var(--orange)" />
            <h3>Atendimento 24/7</h3>
            <p>Suporte dedicado para sua empresa</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ========== PÁGINA MINHAS ENCOMENDAS ==========
const ClientMyOrders = ({ userData }) => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const loadOrders = () => {
      setIsLoading(true);
      const storedOrders = JSON.parse(localStorage.getItem("client_orders") || "[]");
      const myOrders = storedOrders.filter(
        (order) => order.clientEmail === userData?.email
      );
      myOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
      setOrders(myOrders);
      setIsLoading(false);
    };
    
    loadOrders();
  }, [userData?.email]);

  const filteredOrders = orders.filter((order) => {
    if (filter === "all") return true;
    if (filter === "pending") return order.status === "Aguardando aprovação" || order.status === "Pendente";
    if (filter === "production") return order.status === "Em produção";
    if (filter === "completed") return order.status === "Concluído";
    return true;
  });

  const getStatusClass = (status) => {
    switch (status) {
      case "Em produção": return "status-production";
      case "Concluído": return "status-done";
      default: return "status-pending";
    }
  };

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === "Aguardando aprovação" || o.status === "Pendente").length,
    production: orders.filter(o => o.status === "Em produção").length,
    completed: orders.filter(o => o.status === "Concluído").length,
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Minhas Encomendas</h1>
          <p className="page-subtitle">Acompanhe todos os seus pedidos realizados</p>
        </div>
      </div>

      <div className="orders-stats">
        <div className="stat-box">
          <span className="stat-value">{stats.total}</span>
          <span className="stat-label">Total de pedidos</span>
        </div>
        <div className="stat-box">
          <span className="stat-value" style={{ color: "#f59e0b" }}>{stats.pending}</span>
          <span className="stat-label">Aguardando</span>
        </div>
        <div className="stat-box">
          <span className="stat-value" style={{ color: "#8b5cf6" }}>{stats.production}</span>
          <span className="stat-label">Em produção</span>
        </div>
        <div className="stat-box">
          <span className="stat-value" style={{ color: "#10b981" }}>{stats.completed}</span>
          <span className="stat-label">Concluídos</span>
        </div>
      </div>

      <div className="orders-filters">
        <button className={`filter-btn ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>Todos</button>
        <button className={`filter-btn ${filter === "pending" ? "active" : ""}`} onClick={() => setFilter("pending")}>Aguardando</button>
        <button className={`filter-btn ${filter === "production" ? "active" : ""}`} onClick={() => setFilter("production")}>Em produção</button>
        <button className={`filter-btn ${filter === "completed" ? "active" : ""}`} onClick={() => setFilter("completed")}>Concluídos</button>
      </div>

      <div className="orders-list-container">
        {isLoading ? (
          <div className="loading-state">Carregando seus pedidos...</div>
        ) : filteredOrders.length === 0 ? (
          <div className="empty-state">
            <Icon d={ICONS.orders} size={48} color="var(--muted)" />
            <p>Você ainda não tem nenhum pedido</p>
          </div>
        ) : (
          <div className="orders-grid">
            {filteredOrders.map((order) => (
              <div className="order-card" key={order.id}>
                <div className="order-header">
                  <span className="order-id">{order.id}</span>
                  <span className={`order-status ${getStatusClass(order.status)}`}>{order.status}</span>
                </div>
                <div className="order-body">
                  <h3>{order.product}</h3>
                  <div className="order-details">
                    <div className="detail-item"><span>Quantidade:</span><strong>{order.quantity} peças</strong></div>
                    {order.color && <div className="detail-item"><span>Cor(es):</span><strong>{order.color}</strong></div>}
                    {order.size && <div className="detail-item"><span>Tamanhos:</span><strong>{order.size}</strong></div>}
                    <div className="detail-item"><span>Data do pedido:</span><strong>{order.date}</strong></div>
                    {order.deadline && <div className="detail-item"><span>Prazo desejado:</span><strong>{order.deadline}</strong></div>}
                  </div>
                  {order.details && (
                    <div className="order-observations">
                      <strong>Observações:</strong>
                      <p>{order.details}</p>
                    </div>
                  )}
                </div>
                <div className="order-footer">
                  <button className="btn-outline">Acompanhar</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ========== PÁGINA SOLICITAR ENCOMENDA ==========
const ClientOrder = ({ userData }) => {
  const [order, setOrder] = useState({
    product: "",
    quantity: "",
    color: "",
    size: "",
    details: "",
    deadline: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const productOptions = [
    "Camisetas Personalizadas",
    "Uniformes Esportivos",
    "Moletons e Jaquetas",
    "Bolsas e Mochilas",
    "Bonés e Acessórios",
    "Agasalhos Térmicos",
    "Outro (especificar nos detalhes)",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newOrder = {
      id: "#" + Math.floor(Math.random() * 9000 + 1000),
      client: userData?.name || "Cliente",
      clientEmail: userData?.email,
      product: order.product,
      quantity: order.quantity,
      color: order.color,
      size: order.size,
      details: order.details,
      deadline: order.deadline,
      status: "Aguardando aprovação",
      date: new Date().toLocaleDateString(),
    };
    
    const existingOrders = JSON.parse(localStorage.getItem("client_orders") || "[]");
    existingOrders.push(newOrder);
    localStorage.setItem("client_orders", JSON.stringify(existingOrders));
    
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setOrder({ product: "", quantity: "", color: "", size: "", details: "", deadline: "" });
    
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Solicitar Encomenda</h1>
          <p className="page-subtitle">Preencha o formulário e receba um orçamento personalizado</p>
        </div>
      </div>

      {submitted && (
        <div className="success-message" style={{ marginBottom: 20 }}>
          ✅ Pedido enviado com sucesso! Entraremos em contato em até 24h.
        </div>
      )}

      <div className="order-form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group half">
              <label className="form-label">Produto *</label>
              <select className="form-input" value={order.product} onChange={(e) => setOrder({ ...order, product: e.target.value })} required>
                <option value="">Selecione um produto</option>
                {productOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div className="form-group half">
              <label className="form-label">Quantidade *</label>
              <input className="form-input" type="number" placeholder="Número de peças" value={order.quantity} onChange={(e) => setOrder({ ...order, quantity: e.target.value })} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group half">
              <label className="form-label">Cor(es)</label>
              <input className="form-input" type="text" placeholder="Ex: Azul, Vermelho, Preto" value={order.color} onChange={(e) => setOrder({ ...order, color: e.target.value })} />
            </div>
            <div className="form-group half">
              <label className="form-label">Tamanhos</label>
              <input className="form-input" type="text" placeholder="Ex: P, M, G, GG" value={order.size} onChange={(e) => setOrder({ ...order, size: e.target.value })} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group half">
              <label className="form-label">Prazo desejado</label>
              <input className="form-input" type="date" value={order.deadline} onChange={(e) => setOrder({ ...order, deadline: e.target.value })} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Detalhes adicionais</label>
            <textarea className="form-input" rows="5" placeholder="Especificações técnicas, estampas, bordados, observações..." value={order.details} onChange={(e) => setOrder({ ...order, details: e.target.value })} />
          </div>

          <div className="form-info-box">
            <Icon d={ICONS.info} size={20} />
            <span>Após enviar, você receberá um orçamento detalhado por e-mail em até 24 horas úteis.</span>
          </div>

          <button type="submit" className="btn-login-full">Enviar Solicitação</button>
        </form>
      </div>
    </div>
  );
};

// ========== PÁGINA SOBRE NÓS ==========
const ClientAbout = () => {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Sobre a TEXCONTROL</h1>
          <p className="page-subtitle">Conheça nossa história e compromisso com a qualidade</p>
        </div>
      </div>

      <div className="about-container">
        <div className="about-hero">
          <div className="about-hero-text">
            <h2>+7 anos</h2>
            <p>transformando a indústria têxtil</p>
          </div>
        </div>

        <div className="about-section">
          <h3>Nossa História</h3>
          <p>Fundada em 2018, a TEXCONTROL nasceu com o propósito de revolucionar o mercado de confecções personalizadas. Com investimento em tecnologia e mão de obra especializada, rapidamente nos tornamos referência em qualidade e prazo de entrega.</p>
          <p>Hoje, atendemos centenas de clientes em todo o Brasil, desde pequenas empresas até grandes marcas, sempre com o compromisso de entregar produtos que superam expectativas.</p>
        </div>

        <div className="about-stats">
          <div className="stat-item"><span className="stat-number">500+</span><span className="stat-label">Clientes atendidos</span></div>
          <div className="stat-item"><span className="stat-number">1M+</span><span className="stat-label">Peças produzidas</span></div>
          <div className="stat-item"><span className="stat-number">98%</span><span className="stat-label">Taxa de satisfação</span></div>
          <div className="stat-item"><span className="stat-number">24h</span><span className="stat-label">Resposta média</span></div>
        </div>

        <div className="about-section">
          <h3>Nossa Missão</h3>
          <p>Oferecer soluções têxteis de alta qualidade, com personalização total e prazos garantidos, contribuindo para o sucesso e crescimento dos nossos clientes.</p>
        </div>

        <div className="about-section">
          <h3>Nossos Valores</h3>
          <div className="values-grid">
            <div className="value-card"><Icon d={ICONS.chart} size={30} color="var(--orange)" /><h4>Inovação</h4><p>Buscamos constantemente novas tecnologias e processos</p></div>
            <div className="value-card"><Icon d={ICONS.users} size={30} color="var(--orange)" /><h4>Transparência</h4><p>Relacionamento honesto e claro com todos os clientes</p></div>
            <div className="value-card"><Icon d={ICONS.home} size={30} color="var(--orange)" /><h4>Compromisso</h4><p>Entregamos o que prometemos, com qualidade e pontualidade</p></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ========== PÁGINA CONTATO ==========
const ClientContact = () => {
  const [contact, setContact] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setContact({ name: "", email: "", phone: "", subject: "", message: "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Fale Conosco</h1>
          <p className="page-subtitle">Estamos prontos para atender você</p>
        </div>
      </div>

      {submitted && <div className="success-message" style={{ marginBottom: 20 }}>✅ Mensagem enviada com sucesso! Responderemos em breve.</div>}

      <div className="contact-grid">
        <div className="contact-info">
          <div className="contact-info-card">
            <h3>Informações de Contato</h3>
            <div className="contact-details">
              <div className="contact-item"><Icon d={ICONS.phone} size={20} color="var(--orange)" /><div><strong>Telefone</strong><p>(11) 99999-0000</p></div></div>
              <div className="contact-item"><Icon d={ICONS.mail} size={20} color="var(--orange)" /><div><strong>E-mail</strong><p>contato@texcontrol.com.br</p></div></div>
              <div className="contact-item"><Icon d={ICONS.home} size={20} color="var(--orange)" /><div><strong>Endereço</strong><p>Rua da Indústria, 1000 - São Paulo, SP</p></div></div>
              <div className="contact-item"><Icon d={ICONS.clock} size={20} color="var(--orange)" /><div><strong>Horário de Atendimento</strong><p>Segunda a Sexta: 8h às 18h</p></div></div>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <div className="dashboard-card">
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group half"><input className="form-input" type="text" placeholder="Seu nome *" value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} required /></div>
                <div className="form-group half"><input className="form-input" type="email" placeholder="Seu e-mail *" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} required /></div>
              </div>
              <div className="form-row">
                <div className="form-group half"><input className="form-input" type="tel" placeholder="Seu telefone" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} /></div>
                <div className="form-group half"><input className="form-input" type="text" placeholder="Assunto *" value={contact.subject} onChange={(e) => setContact({ ...contact, subject: e.target.value })} required /></div>
              </div>
              <div className="form-group"><textarea className="form-input" rows="5" placeholder="Sua mensagem *" value={contact.message} onChange={(e) => setContact({ ...contact, message: e.target.value })} required /></div>
              <button type="submit" className="btn-login-full">Enviar Mensagem</button>
            </form>
          </div>
        </div>
      </div>

      <div className="contact-map">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.197464112045!2d-46.64655552458423!3d-23.56219756234981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59d8bff1c2b5%3A0x4d6d4c4e4c4e4c4e!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr" width="100%" height="300" style={{ border: 0, borderRadius: 12 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Mapa TEXCONTROL"></iframe>
      </div>
    </div>
  );
};

export default DashboardClientPage;