import React from 'react'

function Icon({ name }) {
  const icons = {
    arrow: "↗", down: "↓", sun: "☼", moon: "☾", menu: "☰", close: "×",
    github: "GH", linkedin: "in", mail: "✉", check: "✓", external: "↗"
  };
  return <span aria-hidden="true">{icons[name] || name}</span>;
}

export default Icon