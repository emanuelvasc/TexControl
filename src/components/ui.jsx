import { useState, useContext, createContext } from 'react';

// ============ CORES ============
export const COLORS = {
  dark: {
    bg: '#0a0b0f',
    surface: '#12141a',
    surfaceAlt: '#1a1d26',
    border: '#252836',
    borderHover: '#373a50',
    text: '#f0f1f5',
    textMuted: '#8890a8',
    textFaint: '#4a5068',
    accent: '#ff5a1f',
    accentHover: '#ff7a45',
    accentGlow: 'rgba(255,90,31,0.18)',
    success: '#22c55e',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6',
    purple: '#8b5cf6',
    teal: '#14b8a6',
  },
  light: {
    bg: '#f4f5f7',
    surface: '#ffffff',
    surfaceAlt: '#f8f9fb',
    border: '#e4e6ef',
    borderHover: '#c9ccdb',
    text: '#14161f',
    textMuted: '#5a6080',
    textFaint: '#a0a8c0',
    accent: '#ff5a1f',
    accentHover: '#e04a10',
    accentGlow: 'rgba(255,90,31,0.12)',
    success: '#16a34a',
    warning: '#d97706',
    danger: '#dc2626',
    info: '#2563eb',
    purple: '#7c3aed',
    teal: '#0d9488',
  },
};

// ============ CONTEXT ============
const ThemeContext = createContext({ theme: 'dark' });

export const ThemeProvider = ({ children, theme = 'dark' }) => {
  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// ============ HOOK ============
export const useThemeColors = () => {
  const { theme } = useContext(ThemeContext);
  return COLORS[theme] || COLORS.dark;
};

// ============ STATUS BADGE ============
export function StatusBadge({ status }) {
  const statusConfig = {
    orcamento: { label: 'Orcamento', color: '#8890a8', bg: 'rgba(136,144,168,0.15)' },
    confirmado: { label: 'Confirmado', color: '#3b82f6', bg: 'rgba(59,130,246,0.15)' },
    producao: { label: 'Em Producao', color: '#f59e0b', bg: 'rgba(245,158,11,0.15)' },
    corte: { label: 'Corte', color: '#ff5a1f', bg: 'rgba(255,90,31,0.15)' },
    sublimacao: { label: 'Sublimacao', color: '#8b5cf6', bg: 'rgba(139,92,246,0.15)' },
    costura: { label: 'Costura', color: '#14b8a6', bg: 'rgba(20,184,166,0.15)' },
    acabamento: { label: 'Acabamento', color: '#ec4899', bg: 'rgba(236,72,153,0.15)' },
    finalizado: { label: 'Finalizado', color: '#22c55e', bg: 'rgba(34,197,94,0.15)' },
    entregue: { label: 'Entregue', color: '#22c55e', bg: 'rgba(34,197,94,0.08)' },
  };

  const cfg = statusConfig[status] || { label: status, color: '#888', bg: 'rgba(136,136,136,0.15)' };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        padding: '3px 10px',
        borderRadius: 20,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.05em',
        color: cfg.color,
        background: cfg.bg,
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: cfg.color,
          display: 'inline-block',
        }}
      />
      {cfg.label}
    </span>
  );
}

// ============ AVATAR ============
export function Avatar({ name, size = 34, color }) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
  const hue = (name.charCodeAt(0) * 37) % 360;
  const bg = color || `hsl(${hue},60%,35%)`;

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.35,
        fontWeight: 700,
        color: '#fff',
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

// ============ PROGRESS BAR ============
export function ProgressBar({ value, max = 100, color = '#ff5a1f', height = 6 }) {
  const pct = Math.min(Math.max((value / max) * 100, 0), 100);
  const c = useThemeColors();

  return (
    <div style={{ height, borderRadius: 99, background: c.border, overflow: 'hidden' }}>
      <div
        style={{
          height: '100%',
          borderRadius: 99,
          width: `${pct}%`,
          background: `linear-gradient(90deg, ${color}, ${color}cc)`,
          transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)',
        }}
      />
    </div>
  );
}

// ============ STAT CARD ============
export function StatCard({ label, value, sub, icon, color }) {
  const c = useThemeColors();
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: c.surface,
        border: `1px solid ${hov ? c.borderHover : c.border}`,
        borderRadius: 16,
        padding: '22px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        transition: 'all 0.25s ease',
        boxShadow: hov ? `0 8px 32px rgba(0,0,0,0.18), 0 0 0 1px ${color}22` : 'none',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 120,
          height: 80,
          background: `radial-gradient(circle at 80% 20%, ${color}18, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div
            style={{
              fontSize: 12,
              color: c.textMuted,
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: 6,
            }}
          >
            {label}
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: c.text,
              letterSpacing: '-0.03em',
              lineHeight: 1,
            }}
          >
            {value}
          </div>
        </div>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: `${color}20`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
            flexShrink: 0,
            boxShadow: `0 0 0 1px ${color}30`,
          }}
        >
          {icon}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div style={{ fontSize: 12, color: c.textMuted }}>{sub}</div>
      </div>
    </div>
  );
}

// ============ TABLE ============
export function Table({ columns, data, onRowClick }) {
  const c = useThemeColors();
  const [sortCol, setSortCol] = useState(null);
  const [sortDir, setSortDir] = useState('asc');

  const handleSort = (col) => {
    if (sortCol === col) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else {
      setSortCol(col);
      setSortDir('asc');
    }
  };

  const sorted = sortCol
    ? [...data].sort((a, b) => {
        const av = a[sortCol];
        const bv = b[sortCol];
        if (av < bv) return sortDir === 'asc' ? -1 : 1;
        if (av > bv) return sortDir === 'asc' ? 1 : -1;
        return 0;
      })
    : data;

  return (
    <div style={{ borderRadius: 14, border: `1px solid ${c.border}`, overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ background: c.surfaceAlt }}>
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={() => col.sortable !== false && handleSort(col.key)}
                style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontWeight: 700,
                  color: c.textMuted,
                  fontSize: 11,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  cursor: col.sortable !== false ? 'pointer' : 'default',
                  whiteSpace: 'nowrap',
                  userSelect: 'none',
                }}
              >
                {col.label}
                {sortCol === col.key && <span style={{ marginLeft: 4 }}>{sortDir === 'asc' ? '↑' : '↓'}</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => (
            <tr
              key={i}
              onClick={() => onRowClick && onRowClick(row)}
              style={{
                borderTop: `1px solid ${c.border}`,
                cursor: onRowClick ? 'pointer' : 'default',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => onRowClick && (e.currentTarget.style.background = c.surfaceAlt)}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              {columns.map((col) => (
                <td key={col.key} style={{ padding: '13px 16px', color: c.text, verticalAlign: 'middle' }}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ============ MODAL ============
export function Modal({ open, onClose, title, children, width = 520 }) {
  const c = useThemeColors();
  if (!open) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: 20,
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          width: '100%',
          maxWidth: width,
          background: c.surface,
          borderRadius: 20,
          border: `1px solid ${c.border}`,
          boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
          overflow: 'hidden',
          animation: 'slideUp 0.2s ease',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 24px',
            borderBottom: `1px solid ${c.border}`,
          }}
        >
          <div style={{ fontSize: 16, fontWeight: 700, color: c.text }}>{title}</div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: c.textMuted,
              cursor: 'pointer',
              fontSize: 20,
              lineHeight: 1,
              padding: 4,
              borderRadius: 6,
            }}
          >
            ×
          </button>
        </div>
        <div style={{ padding: 24, maxHeight: '70vh', overflowY: 'auto' }}>{children}</div>
      </div>
    </div>
  );
}

// ============ BUTTON ============
export function Button({ children, onClick, variant = 'primary', size = 'md', disabled, icon, style: extra }) {
  const c = useThemeColors();
  const [hov, setHov] = useState(false);

  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 7,
    borderRadius: 10,
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontWeight: 600,
    fontSize: size === 'sm' ? 12 : 13,
    letterSpacing: '0.01em',
    transition: 'all 0.18s ease',
    outline: 'none',
    padding: size === 'sm' ? '6px 12px' : '10px 18px',
    opacity: disabled ? 0.5 : 1,
    ...extra,
  };

  const styles = {
    primary: {
      background: hov ? c.accentHover : c.accent,
      color: '#fff',
      boxShadow: hov ? `0 4px 20px ${c.accentGlow}` : 'none',
    },
    secondary: {
      background: hov ? c.surfaceAlt : c.surface,
      color: c.text,
      border: `1px solid ${c.border}`,
    },
    ghost: {
      background: hov ? c.surfaceAlt : 'transparent',
      color: c.textMuted,
    },
    danger: {
      background: hov ? '#dc2626' : `${c.danger}20`,
      color: hov ? '#fff' : c.danger,
      border: `1px solid ${c.danger}40`,
    },
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      disabled={disabled}
      style={{ ...base, ...styles[variant] }}
    >
      {icon && <span style={{ fontSize: 14 }}>{icon}</span>}
      {children}
    </button>
  );
}

// ============ INPUT ============
export function Input({ label, value, onChange, type = 'text', placeholder, required, options, style: extra }) {
  const c = useThemeColors();
  const [focus, setFocus] = useState(false);

  const shared = {
    width: '100%',
    borderRadius: 10,
    border: `1px solid ${focus ? c.accent : c.border}`,
    background: c.surfaceAlt,
    color: c.text,
    fontSize: 13,
    padding: '10px 14px',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
    ...extra,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      {label && (
        <label style={{ fontSize: 12, fontWeight: 600, color: c.textMuted, letterSpacing: '0.05em' }}>
          {label}
          {required && ' *'}
        </label>
      )}
      {options ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={shared}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value} style={{ background: c.surface }}>
              {o.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={shared}
        />
      )}
    </div>
  );
}

// ============ SPINNER ============
export function Spinner() {
  const c = useThemeColors();

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: `3px solid ${c.accent}20`,
          borderTopColor: c.accent,
          animation: 'spin 0.7s linear infinite',
        }}
      />
    </div>
  );
}