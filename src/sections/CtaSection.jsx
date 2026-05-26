import Icon from "../components/Icon";
import { ICONS } from "../constants/icons";

const CtaSection = () => (
  <section className="cta-section">
    <div className="cta-inner">
      <div className="section-tag" style={{ justifyContent: "center" }}>
        Comece agora
      </div>
      <h2 className="cta-title">
        Pronto para
        <br />
        transformar sua
        <br />
        confecção?
      </h2>
      <p className="cta-desc">
        Junte-se a mais de 320 confecções que já utilizam o TexControl para
        gerenciar sua produção com mais eficiência.
      </p>
      <div className="cta-btns">
        <button className="btn-primary">
          Acessar sistema <Icon d={ICONS.arrowRight} size={16} />
        </button>
        <button className="btn-secondary">Fale conosco</button>
      </div>
    </div>
  </section>
);

export default CtaSection;
