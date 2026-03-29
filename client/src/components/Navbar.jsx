import { useState } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&display=swap');

  .nav-root * { font-family: 'Outfit', sans-serif; box-sizing: border-box; }

  @keyframes ripple  { to { transform: scale(4); opacity: 0; } }
  @keyframes labelUp { from { opacity:0; transform:translateY(5px); } to { opacity:1; transform:translateY(0); } }
  @keyframes homePop {
    0%   { transform: scale(1) translateY(0); }
    35%  { transform: scale(1.18) translateY(-4px); }
    65%  { transform: scale(0.94) translateY(1px); }
    100% { transform: scale(1) translateY(0); }
  }
  @keyframes iconGrow {
    0%   { transform: scale(0.7); opacity:0.4; }
    60%  { transform: scale(1.15); }
    100% { transform: scale(1);   opacity:1; }
  }
  @keyframes ringPulse {
    0%   { box-shadow: 0 0 0 0 rgba(220,38,38,0.45); }
    70%  { box-shadow: 0 0 0 10px rgba(220,38,38,0); }
    100% { box-shadow: 0 0 0 0 rgba(220,38,38,0); }
  }

  .ripple-el   { animation: ripple   0.55s ease-out forwards; }
  .label-up    { animation: labelUp  0.25s ease forwards; }
  .home-pop    { animation: homePop  0.42s cubic-bezier(.36,.07,.19,.97) forwards; }
  .icon-grow   { animation: iconGrow 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards; }
  .ring-pulse  { animation: ringPulse 0.6s ease-out forwards; }

  .nav-icon-wrap {
    transition: transform 0.28s cubic-bezier(0.34,1.56,0.64,1);
  }
`;

const ITEMS = [
  {
    id: "about", label: "About",
    icon: (a, sz) => (
      <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none"
        stroke={a ? "#dc2626" : "#c0c7d4"} strokeWidth={a ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
      </svg>
    ),
  },
  {
    id: "skills", label: "Skills",
    icon: (a, sz) => (
      <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none"
        stroke={a ? "#dc2626" : "#c0c7d4"} strokeWidth={a ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
  // CENTER — home placeholder, rendered separately
  {
    id: "projects", label: "Projects",
    icon: (a, sz) => (
      <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none"
        stroke={a ? "#dc2626" : "#c0c7d4"} strokeWidth={a ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
  },
  {
    id: "History", label: "History",
    icon: (a, sz) => (
      <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none"
        stroke={a ? "#dc2626" : "#c0c7d4"} strokeWidth={a ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      </svg>
    ),
  },
];

function NavItem({ item, isActive, onClick }) {
  const [animKey, setAnimKey] = useState(0);
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples(r => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples(r => r.filter(x => x.id !== id)), 600);
    if (!isActive) setAnimKey(k => k + 1);
    onClick(item.id);
  };

  const iconSize = isActive ? 26 : 20;

  return (
    <button onClick={handleClick} aria-label={item.label} style={{
      flex: 1, height: "100%", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      background: "none", border: "none", cursor: "pointer",
      position: "relative", overflow: "hidden",
      WebkitTapHighlightColor: "transparent", outline: "none", gap: 4,
    }}>
      {ripples.map(rp => (
        <span key={rp.id} className="ripple-el" style={{
          position:"absolute", borderRadius:"50%", width:36, height:36,
          left:rp.x-18, top:rp.y-18, background:"rgba(220,38,38,0.12)", pointerEvents:"none",
        }}/>
      ))}

      {/* Active pill */}
      {isActive && (
        <span style={{
          position:"absolute", width:45, height:45,
          background:"rgba(220,38,38,0.08)", borderRadius:99,
          top:"50%", left:"50%", transform:"translate(-50%,-66%)", pointerEvents:"none",
        }}/>
      )}

      {/* Icon — scales up when active */}
      <span
        key={`i-${animKey}-${isActive}`}
        className={isActive ? "icon-grow" : ""}
        style={{ display:"flex", zIndex:1, transition:"transform 0.28s cubic-bezier(0.34,1.56,0.64,1)" }}
      >
        {item.icon(isActive, iconSize)}
      </span>

      {/* Label */}
      <span key={`l-${isActive}`} className={isActive ? "label-up" : ""} style={{
        fontSize: 10, fontWeight: isActive ? 700 : 500,
        color: isActive ? "#dc2626" : "#b0b7c3",
        lineHeight: 1, zIndex: 1,
        opacity: isActive ? 1 : 0.8,
        letterSpacing: isActive ? "0.04em" : 0
      }}>
        {item.label}
      </span>

      {/* Glow dot */}
      {/* {isActive && (
        <span style={{
          position:"absolute", bottom:8, left:"50%", transform:"translateX(-50%)",
          width:4, height:4, borderRadius:"50%",
          background:"#dc2626", boxShadow:"0 0 8px rgba(220,38,38,0.7)",
        }}/>
      )} */}
    </button>
  );
}

function HomeButton({ isActive, onClick }) {
  const [popKey, setPopKey] = useState(0);
  const [ringKey, setRingKey] = useState(0);

  const handleClick = () => {
    setPopKey(k => k + 1);
    setRingKey(k => k + 1);
    onClick("home");
  };

  return (
    <div style={{ position:"relative", display:"flex", flexDirection:"column", alignItems:"center", flex:1 }}>
      {/* Notch dip in bar — purely decorative */}
      <div style={{
        position:"absolute", top:"-100%", left:"50%", transform:"translateX(-50%)",
        width:72, height:36,
        background:"#fff",
        borderRadius:"0 0 50px 50px",
        pointerEvents:"none",
      }}/>

      {/* Floating circle button */}
      <button
        key={`home-${popKey}`}
        onClick={handleClick}
        aria-label="Home"
        className={popKey > 0 ? "home-pop" : ""}
        style={{
          position:"absolute",
          top: -28,
          width: 56, height: 56,
          borderRadius:"50%",
          background: isActive
            ? "radial-gradient(circle at 38% 35%, #f87171, #dc2626 60%, #991b1b)"
            : "radial-gradient(circle at 38% 35%, #fca5a5, #ef4444 60%, #b91c1c)",
          border: "3.5px solid #fff",
          boxShadow: isActive
            ? "0 6px 20px rgba(220,38,38,0.45), 0 2px 6px rgba(0,0,0,0.12)"
            : "0 4px 14px rgba(220,38,38,0.28), 0 2px 4px rgba(0,0,0,0.08)",
          cursor:"pointer",
          display:"flex", alignItems:"center", justifyContent:"center",
          outline:"none",
          WebkitTapHighlightColor:"transparent",
          transition:"box-shadow 0.25s",
          zIndex: 10,
        }}
      >
        {/* Ring pulse on tap */}
        <span key={`ring-${ringKey}`} className={ringKey > 0 ? "ring-pulse" : ""} style={{
          position:"absolute", inset:0, borderRadius:"50%", pointerEvents:"none",
        }}/>

        {/* Home icon — bigger inside the circle */}
        <svg width={isActive ? 26 : 22} height={isActive ? 26 : 22} viewBox="0 0 24 24"
          fill="rgba(255,255,255,0.95)" stroke="rgba(255,255,255,0.95)"
          strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"
          style={{ transition:"width 0.25s, height 0.25s" }}>
          <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>
          <path d="M9 21V12h6v9" fill="rgba(255,255,255,0.6)" stroke="none"/>
        </svg>
      </button>

      {/* Label below the circle, inside bar */}
      <span key={`hl-${isActive}`} className={isActive ? "label-up" : ""} style={{
        position:"absolute",
        bottom: 8,
        fontSize: 10,
        fontWeight: isActive ? 700 : 500,
        color: isActive ? "#dc2626" : "#b0b7c3",
        lineHeight: 1,
        letterSpacing: isActive ? "0.04em" : 0,
        zIndex: 1,
      }}>
        Home
      </span>

      {/* Glow dot */}
      {isActive && (
        <span style={{
          position:"absolute", bottom:5, left:"50%", transform:"translateX(-50%)",
          width:4, height:4, borderRadius:"50%",
          background:"#dc2626", boxShadow:"0 0 8px rgba(220,38,38,0.7)",
        }}/>
      )}
    </div>
  );
}

export default function Navbar() {
  const [active, setActive] = useState("home");

  // Split items: 2 left, center home, 2 right
  const left  = ITEMS.slice(0, 2);
  const right = ITEMS.slice(2);

  return (
    <>
      <style>{style}</style>

      {/* Preview */}
      <div style={{
        minHeight:"100svh", background:"#fff",
        display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
        fontFamily:"'Outfit',sans-serif", paddingBottom:100,
      }}>
        <div style={{
          width:52, height:52, borderRadius:"50%",
          background:"radial-gradient(circle at 38% 35%, #f87171, #dc2626 60%, #991b1b)",
          boxShadow:"0 8px 28px rgba(220,38,38,0.28)", marginBottom:18,
        }}/>
        <p style={{ color:"#dc2626", fontWeight:700, fontSize:"1.3rem", letterSpacing:"0.12em" }}>
          {active.toUpperCase()}
        </p>
        <p style={{ color:"#d1d5db", fontSize:"0.78rem", marginTop:6, fontWeight:500 }}>tap the nav below</p>
      </div>

      {/* Nav bar */}
      <nav className="nav-root" style={{
        position:"fixed", bottom:18, left:"50%", transform:"translateX(-50%)",
        width:"calc(100% - 32px)", maxWidth:430, height:66,
        background:"#fff", borderRadius:26,
        display:"flex", alignItems:"center",
        zIndex:100, overflow:"visible",
        boxShadow:"0 2px 4px rgba(0,0,0,0.04), 0 8px 28px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.05)",
      }}>
        {/* Red hairline top */}
        <span style={{
          position:"absolute", top:0, left:"15%", width:"70%", height:2,
          background:"linear-gradient(90deg,transparent,#dc2626 40%,#dc2626 60%,transparent)",
          borderRadius:99, opacity:0.4, pointerEvents:"none",
        }}/>

        {/* Left items */}
        {left.map(item => (
          <NavItem key={item.id} item={item} isActive={active===item.id} onClick={setActive}/>
        ))}

        {/* Center Home */}
        <HomeButton isActive={active==="home"} onClick={setActive}/>

        {/* Right items */}
        {right.map(item => (
          <NavItem key={item.id} item={item} isActive={active===item.id} onClick={setActive}/>
        ))}
      </nav>
    </>
  );
}