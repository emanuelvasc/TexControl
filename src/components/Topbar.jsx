import Icon from "./Icon";
import { ICONS } from "../constants/icons";

const Topbar = () => (
  <div className="topbar">
    <div className="topbar-left">
      <a href="#">
        <Icon d={ICONS.phone} size={12} /> (11) 99999-0000
      </a>
      <a href="#">
        <Icon d={ICONS.mail} size={12} /> contato@texcontrol.com.br
      </a>
    </div>
    <div className="topbar-right">
      <div className="topbar-social">
        <a href="#">
          <Icon d={ICONS.instagram} size={14} />
        </a>
        <a href="#">
          <Icon d={ICONS.linkedin} size={14} />
        </a>
      </div>
      <div className="topbar-bell">
        <Icon d={ICONS.bell} size={16} />
        <span className="topbar-badge">3</span>
      </div>
    </div>
  </div>
);

export default Topbar;
