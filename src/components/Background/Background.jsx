import React from 'react'

function Background({theme}) {
  return <div className={`ambient ${theme}`} aria-hidden="true"><div className="stars">{Array.from({length: 35},(_,i)=><i key={i} style={{"--i":i}} />)}</div><div className="cloud cloud-a" /><div className="cloud cloud-b" /><div className="moon-sun">{theme === "dark" ? "☾" : "☼"}</div><div className="particles">{Array.from({length: 12},(_,i)=><i key={i} style={{"--i":i}} />)}</div></div>;
}

export default Background