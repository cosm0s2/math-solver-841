import React, { useState } from 'react';
import { Eye, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface InteractiveGraphProps {
  type?: 'argand' | 'parabola' | 'ellipse' | 'hyperbola' | 'function_curve' | 'integral_area';
  data?: Record<string, any>;
  title?: string;
}

export const InteractiveGraph: React.FC<InteractiveGraphProps> = ({
  type = 'argand',
  data = {},
  title = 'التمثيل البياني الهندسي التفاعلي',
}) => {
  const [zoom, setZoom] = useState(1);
  const [showLabels, setShowLabels] = useState(true);

  const width = 360;
  const height = 260;
  const cx = width / 2;
  const cy = height / 2;

  // Zoom handlers
  const handleZoomIn = () => setZoom((z) => Math.min(2, z + 0.2));
  const handleZoomOut = () => setZoom((z) => Math.max(0.6, z - 0.2));
  const handleReset = () => setZoom(1);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-white shadow-xl my-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
            <Eye className="w-4 h-4" />
          </span>
          <h4 className="text-sm font-semibold text-slate-200">{title}</h4>
        </div>
        <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-lg">
          <button
            type="button"
            onClick={handleZoomIn}
            className="p-1 hover:bg-slate-700 rounded text-slate-300 hover:text-white transition"
            title="تكبير"
            aria-label="تكبير الرسم البياني"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleZoomOut}
            className="p-1 hover:bg-slate-700 rounded text-slate-300 hover:text-white transition"
            title="تصغير"
            aria-label="تصغير الرسم البياني"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="p-1 hover:bg-slate-700 rounded text-slate-300 hover:text-white transition"
            title="إعادة ضبط"
            aria-label="إعادة ضبط الرسم البياني"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setShowLabels(!showLabels)}
            className={`px-2 py-0.5 text-xs rounded transition font-medium ${
              showLabels ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400'
            }`}
            aria-label="تبديل تسميات النقاط"
          >
            {showLabels ? 'التسميات: مفعّلة' : 'التسميات: مخفية'}
          </button>
        </div>
      </div>

      <div className="relative flex justify-center items-center overflow-hidden bg-slate-950/60 rounded-xl p-2 border border-slate-800/50">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full max-w-[360px] h-[220px] select-none transition-transform duration-200"
          style={{ transform: `scale(${zoom})` }}
        >
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width={width} height={height} fill="url(#grid)" />

          {/* Coordinate Axes */}
          <line x1="20" y1={cy} x2={width - 20} y2={cy} stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1={cx} y1="20" x2={cx} y2={height - 20} stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />

          {/* Arrowheads and axis labels */}
          <text x={width - 25} y={cy - 6} fill="#94a3b8" fontSize="10" fontWeight="bold">
            {type === 'argand' ? 'Re (الحقيقي)' : 'X'}
          </text>
          <text x={cx + 8} y="25" fill="#94a3b8" fontSize="10" fontWeight="bold">
            {type === 'argand' ? 'Im (التخيلي)' : 'Y'}
          </text>

          {/* Type Specific Visuals */}
          {type === 'argand' && (
            <g>
              {/* Unit circle or modulus ring */}
              <circle cx={cx} cy={cy} r="50" fill="none" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
              
              {/* Vector for z = 1 - √3 i (Fourth Quadrant) */}
              {/* Scale: 1 unit = 25px -> x = +25px, y = +43.3px (down in SVG) */}
              <line
                x1={cx}
                y1={cy}
                x2={cx + 40}
                y2={cy + 69}
                stroke="#10b981"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx={cx + 40} cy={cy + 69} r="5" fill="#10b981" className="animate-pulse" />

              {/* Arc representing argument theta = 5pi/3 */}
              <path
                d={`M ${cx + 30} ${cy} A 30 30 0 1 1 ${cx + 15} ${cy + 26}`}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2"
                strokeDasharray="2 2"
              />

              {showLabels && (
                <>
                  <text x={cx + 48} y={cy + 75} fill="#34d399" fontSize="11" fontWeight="bold">
                    z = 1 - √3i
                  </text>
                  <text x={cx + 15} y={cy - 12} fill="#fbbf24" fontSize="10">
                    θ = 5π/3 (الربع الرابع)
                  </text>
                  <text x={cx + 25} y={cy + 40} fill="#38bdf8" fontSize="10">
                    r = 2
                  </text>
                </>
              )}
            </g>
          )}

          {type === 'ellipse' && (
            <g>
              {/* Ellipse: a = 5 (scaled to 75px), b = 3 (scaled to 45px) */}
              <ellipse
                cx={cx}
                cy={cy}
                rx="75"
                ry="45"
                fill="rgba(16, 185, 129, 0.08)"
                stroke="#10b981"
                strokeWidth="2.5"
              />
              {/* Foci: c = 4 (scaled to 60px) */}
              <circle cx={cx + 60} cy={cy} r="4" fill="#ef4444" />
              <circle cx={cx - 60} cy={cy} r="4" fill="#ef4444" />
              {/* Vertices */}
              <circle cx={cx + 75} cy={cy} r="3" fill="#38bdf8" />
              <circle cx={cx - 75} cy={cy} r="3" fill="#38bdf8" />

              {showLabels && (
                <>
                  <text x={cx + 52} y={cy - 8} fill="#f87171" fontSize="10" fontWeight="bold">
                    F₁(4, 0)
                  </text>
                  <text x={cx - 82} y={cy - 8} fill="#f87171" fontSize="10" fontWeight="bold">
                    F₂(-4, 0)
                  </text>
                  <text x={cx + 78} y={cy + 14} fill="#38bdf8" fontSize="10">
                    V₁(5, 0)
                  </text>
                  <text x={cx - 110} y={cy + 14} fill="#38bdf8" fontSize="10">
                    V₂(-5, 0)
                  </text>
                  <text x={cx - 30} y={cy - 48} fill="#a7f3d0" fontSize="9">
                    المحور الكبير 2a = 10
                  </text>
                </>
              )}
            </g>
          )}

          {type === 'hyperbola' && (
            <g>
              {/* Asymptotes */}
              <line x1={cx - 90} y1={cy - 60} x2={cx + 90} y2={cy + 60} stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" />
              <line x1={cx - 90} y1={cy + 60} x2={cx + 90} y2={cy - 60} stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" />

              {/* Right branch of hyperbola */}
              <path
                d={`M ${cx + 100} ${cy - 55} Q ${cx + 45} ${cy} ${cx + 100} ${cy + 55}`}
                fill="none"
                stroke="#f43f5e"
                strokeWidth="2.5"
              />
              {/* Left branch of hyperbola */}
              <path
                d={`M ${cx - 100} ${cy - 55} Q ${cx - 45} ${cy} ${cx - 100} ${cy + 55}`}
                fill="none"
                stroke="#f43f5e"
                strokeWidth="2.5"
              />
              {/* Foci */}
              <circle cx={cx + 65} cy={cy} r="4" fill="#fbbf24" />
              <circle cx={cx - 65} cy={cy} r="4" fill="#fbbf24" />

              {showLabels && (
                <>
                  <text x={cx + 68} y={cy - 8} fill="#fbbf24" fontSize="10">F₁(c, 0)</text>
                  <text x={cx - 95} y={cy - 8} fill="#fbbf24" fontSize="10">F₂(-c, 0)</text>
                  <text x={cx + 20} y={cy + 40} fill="#f43f5e" fontSize="9">x²/a² - y²/b² = 1</text>
                </>
              )}
            </g>
          )}

          {type === 'integral_area' && (
            <g>
              {/* Curve f(x) = x^3 - 4x. Roots at -2, 0, 2 */}
              {/* Region 1: [-2, 0] above x-axis, shaded green */}
              <path
                d={`M ${cx - 60} ${cy} C ${cx - 45} ${cy - 50}, ${cx - 20} ${cy - 40}, ${cx} ${cy} Z`}
                fill="rgba(16, 185, 129, 0.25)"
                stroke="#10b981"
                strokeWidth="2"
              />
              {/* Region 2: [0, 2] below x-axis, shaded orange with absolute value */}
              <path
                d={`M ${cx} ${cy} C ${cx + 20} ${cy + 40}, ${cx + 45} ${cy + 50}, ${cx + 60} ${cy} Z`}
                fill="rgba(245, 158, 11, 0.25)"
                stroke="#f59e0b"
                strokeWidth="2"
              />

              <circle cx={cx - 60} cy={cy} r="4" fill="#38bdf8" />
              <circle cx={cx} cy={cy} r="4" fill="#38bdf8" />
              <circle cx={cx + 60} cy={cy} r="4" fill="#38bdf8" />

              {showLabels && (
                <>
                  <text x={cx - 48} y={cy - 20} fill="#34d399" fontSize="10" fontWeight="bold">
                    A₁ = 4
                  </text>
                  <text x={cx + 20} y={cy + 25} fill="#fbbf24" fontSize="10" fontWeight="bold">
                    |A₂| = 4
                  </text>
                  <text x={cx - 75} y={cy + 15} fill="#94a3b8" fontSize="9">x = -2</text>
                  <text x={cx - 5} y={cy + 15} fill="#94a3b8" fontSize="9">x = 0</text>
                  <text x={cx + 55} y={cy + 15} fill="#94a3b8" fontSize="9">x = 2</text>
                </>
              )}
            </g>
          )}

          {type === 'function_curve' && (
            <g>
              {/* Parabola f(x) = (2 - x)^2 on [0, 4] with vertex at (2, 0) */}
              <path
                d={`M ${cx - 50} ${cy - 50} Q ${cx} ${cy} ${cx + 50} ${cy - 50}`}
                fill="none"
                stroke="#a855f7"
                strokeWidth="2.5"
              />
              {/* c = 2 tangent point where f'(c) = 0 */}
              <line x1={cx - 35} y1={cy} x2={cx + 35} y2={cy} stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
              <circle cx={cx} cy={cy} r="4.5" fill="#ef4444" />

              {showLabels && (
                <>
                  <text x={cx - 15} y={cy + 18} fill="#f87171" fontSize="10" fontWeight="bold">
                    c = 2 (f'(c) = 0)
                  </text>
                  <text x={cx - 45} y={cy - 55} fill="#c084fc" fontSize="9">
                    f(x) = (2 - x)²
                  </text>
                </>
              )}
            </g>
          )}
        </svg>
      </div>
      <div className="mt-2 text-center text-xs text-slate-400">
        💡 اسحب أو استخدم أزرار التكبير للتفاعل مع المحاور والنقاط الحرجة
      </div>
    </div>
  );
};
