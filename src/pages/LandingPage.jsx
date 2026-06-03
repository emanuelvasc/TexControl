import Icon from "../components/Icon";
import { ICONS } from "../constants/icons";

const LandingPage = ({ onLogin }) => {
  // Função para rolar até a seção de recursos
  const scrollToResources = () => {
    const resourcesSection = document.getElementById("recursos");
    if (resourcesSection) {
      resourcesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      {/* Hero - INÍCIO */}
      <section id="inicio" className="hero">
        <div className="hero-bg" />
        <div className="hero-content">
          <div className="hero-left">
            <h1 className="hero-title">
              Transformando
              <br />
              produção em
              <br />
              <em>controle total</em>
            </h1>
            <p className="hero-desc">
              Gerencie pedidos, estoque, produção e desempenho em um único
              sistema projetado para confecções modernas.
            </p>
            <div className="hero-btns">
              <button className="btn-primary" onClick={onLogin}>
                Entrar no sistema →
              </button>
              <button className="btn-secondary" onClick={scrollToResources}>
                Explorar recursos
              </button>
            </div>
          </div>
          <div className="hero-card">
            <div className="stat-row">
              <div className="stat-item">
                <div className="stat-num">
                  2.4<span>K</span>
                </div>
                <div className="stat-label">Peças produzidas hoje</div>
                <div className="stat-bar">
                  <div className="stat-fill" style={{ width: "78%" }} />
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-num">
                  98<span>%</span>
                </div>
                <div className="stat-label">Taxa de eficiência</div>
                <div className="stat-bar">
                  <div className="stat-fill" style={{ width: "98%" }} />
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-num">47</div>
                <div className="stat-label">Pedidos ativos</div>
                <div className="stat-bar">
                  <div className="stat-fill" style={{ width: "62%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features - RECURSOS (adicione o id) */}
      <section id="recursos" className="features">
        <h2 className="section-title">
          Sistema completo
          <br />
          <span>para sua confecção</span>
        </h2>
        <div className="features-grid">
          <div className="feature-block">
            <div className="feature-name">Controle de Pedidos</div>
            <p className="feature-desc">
              Gerencie todo o fluxo de pedidos desde a entrada até a entrega.
            </p>
          </div>
          <div className="feature-block">
            <div className="feature-name">Produção Inteligente</div>
            <p className="feature-desc">
              Monitore linhas de produção e acompanhe o desempenho de cada
              equipe.
            </p>
          </div>
          <div className="feature-block">
            <div className="feature-name">Estoque</div>
            <p className="feature-desc">
              Controle de insumos, tecidos e produtos acabados com alertas
              automáticos.
            </p>
          </div>
          <div className="feature-block">
            <div className="feature-name">Relatórios</div>
            <p className="feature-desc">
              Dashboards analíticos completos para tomada de decisão baseada em
              dados reais.
            </p>
          </div>
        </div>
      </section>

      {/* Seção PRODUÇÃO */}
      <section id="producao" className="features" style={{ paddingTop: 0 }}>
        <h2 className="section-title">
          Produção<span>Inteligente</span>
        </h2>
        <div className="features-grid">
          <div className="feature-block">
            <div className="feature-name">Linhas de Produção</div>
            <p className="feature-desc">
              Acompanhamento em tempo real da eficiência de cada linha.
            </p>
          </div>
          <div className="feature-block">
            <div className="feature-name">OEE - Eficiência Global</div>
            <p className="feature-desc">
              Métricas completas de disponibilidade, performance e qualidade.
            </p>
          </div>
        </div>
      </section>

      {/* Seção SOBRE */}
      <section id="sobre" className="features" style={{ paddingTop: 0 }}>
        <h2 className="section-title">
          Sobre a<span>TEXCONTROL</span>
        </h2>
        <div className="features-grid">
          <div className="feature-block">
            <div className="feature-name">Nossa Missão</div>
            <p className="feature-desc">
              Transformar a gestão de confecções com tecnologia e inovação.
            </p>
          </div>
          <div className="feature-block">
            <div className="feature-name">Nossa Visão</div>
            <p className="feature-desc">
              Ser referência em gestão industrial no setor têxtil.
            </p>
          </div>
          <div className="feature-block">
            <div className="feature-name">Nossos Valores</div>
            <p className="feature-desc">
              Inovação, transparência e compromisso com resultados.
            </p>
          </div>
          <div className="feature-block">
            <div className="feature-name">+7 anos</div>
            <p className="feature-desc">
              De experiência transformando confecções.
            </p>
          </div>
        </div>
      </section>

      {/* Footer - CONTATO */}
      <footer id="contato">
        <div className="footer-grid">
          <div>
            <div className="footer-logo-wrap">
              <span className="nav-logo" style={{ fontSize: 22 }}>
                <div className="logo-mark">T</div>
                TEX<span style={{ color: "var(--orange)" }}>CONTROL</span>
              </span>
            </div>
            <p className="footer-desc">
              Sistema de gestão industrial para confecções.
            </p>
          </div>
          <div>
            <div className="footer-col-title">Sistema</div>
            <ul className="footer-links">
              <li>
                <a href="#">Dashboard</a>
              </li>
              <li>
                <a href="#">Pedidos</a>
              </li>
              <li>
                <a href="#">Produção</a>
              </li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Empresa</div>
            <ul className="footer-links">
              <li>
                <a href="#">Sobre nós</a>
              </li>
              <li>
                <a href="#">Clientes</a>
              </li>
              <li>
                <a href="#">Contato</a>
              </li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Contato</div>
            <ul className="footer-links">
              <li>
                <a href="#">(11) 99999-0000</a>
              </li>
              <li>
                <a href="#">contato@texcontrol.com.br</a>
              </li>
              <li>
                <a href="#">São Paulo, SP</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 TEXCONTROL. Todos os direitos reservados.</span>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;