import { useEffect, useState } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

  @keyframes rollRight {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-10px); }
  }

  @keyframes shadowBreath {
    0%, 100% { transform: scaleX(1);   opacity: 0.18; }
    50%       { transform: scaleX(0.6); opacity: 0.07; }
  }

  @keyframes dotBlink {
    0%, 100% { opacity: 0.2; }
    50%       { opacity: 1;   }
  }

  .ball-wrapper {
    animation: float 2s ease-in-out infinite;
  }

  .ball-seam {
    animation: rollRight 0.5s linear infinite;
    transform-origin: 50% 50%;
  }

  .ball-shadow {
    animation: shadowBreath 2s ease-in-out infinite;
  }

  .dot { animation: dotBlink 1.2s ease-in-out infinite; }
  .dot:nth-child(2) { animation-delay: 0.2s; }
  .dot:nth-child(3) { animation-delay: 0.4s; }
`;

export default function Loading() {
  return (
    <>
      <style>{style}</style>

      {/* Full mobile-screen, light mode */}
      <div
        className="flex flex-col items-center justify-center gap-6 bg-white"
        style={{ minHeight: "100svh" }}
      >

        {/* Ball + shadow stack */}
        <div className="flex flex-col items-center gap-2">

          {/* Floating wrapper */}
          <div className="ball-wrapper">

            {/* Ball shell */}
            <div
              className="relative rounded-full"
              style={{
                width: "72px",
                height: "72px",
                background:
                  "radial-gradient(circle at 38% 35%, #f87171 0%, #dc2626 45%, #991b1b 100%)",
                boxShadow: "0 8px 24px rgba(220,38,38,0.22), inset 0 -4px 8px rgba(0,0,0,0.18)",
              }}
            >
              {/* Specular dot */}
              <div
                className="absolute rounded-full"
                style={{
                  width: "28%",
                  height: "18%",
                  top: "14%",
                  left: "20%",
                  background:
                    "radial-gradient(ellipse, rgba(255,255,255,0.6) 0%, transparent 80%)",
                  filter: "blur(1.5px)",
                }}
              />

              {/* Rotating seam */}
              <div className="ball-seam absolute inset-0 w-full h-full">
                <svg
                  viewBox="0 0 72 72"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  {/* Primary seam curve */}
                  <path
                    d="M36 4 C62 4, 68 36, 36 36 C4 36, 10 68, 36 68"
                    fill="none"
                    stroke="rgba(255,255,255,0.55)"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  {/* Mirror seam curve */}
                  <path
                    d="M36 4 C10 4, 4 36, 36 36 C68 36, 62 68, 36 68"
                    fill="none"
                    stroke="rgba(255,255,255,0.25)"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeDasharray="2 4"
                  />
                  {/* Stitch marks */}
                  {[...Array(6)].map((_, i) => {
                    const t = (i + 0.8) / 6.5;
                    const cx = 36 + 30 * Math.sin(t * Math.PI) * 0.55;
                    const cy = 4 + 64 * t;
                    return (
                      <line
                        key={i}
                        x1={cx - 3}
                        y1={cy - 1.5}
                        x2={cx + 3}
                        y2={cy + 1.5}
                        stroke="rgba(255,255,255,0.7)"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                      />
                    );
                  })}
                </svg>
              </div>
            </div>
          </div>

          {/* Ground shadow */}
          <div
            className="ball-shadow rounded-full"
            style={{
              width: "48px",
              height: "6px",
              background:
                "radial-gradient(ellipse, rgba(153,27,27,0.35) 0%, transparent 80%)",
              filter: "blur(3px)",
            }}
          />
        </div>

        {/* Label + dots */}
        <div className="flex flex-col items-center gap-2">
          <span
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "1.8rem",
              letterSpacing: "0.18em",
              color: "#dc2626",
              lineHeight: 1,
            }}
          >
            LOADING
          </span>

          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="dot rounded-full bg-red-300"
                style={{
                  width: "10px",
                  height: "10px",
                  animationDelay: `${i * 0.2}s`,
                  display: "inline-block",
                }}
              />
            ))}
          </div>
        </div>

      </div>
    </>
  );
}