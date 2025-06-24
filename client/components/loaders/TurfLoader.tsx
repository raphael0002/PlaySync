import React from "react";

const TurfLoader = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-green-900 to-emerald-800 flex items-center justify-center z-50">
      <div className="relative">
        <div
          className="w-32 h-32 rounded-full border-4 border-transparent bg-gradient-to-r oversampling-2xl from-emerald-400 via-green-500 to-teal-400 animate-spin"
          style={{
            animationDuration: "2s",
          }}
        >
          <div className="w-full h-full rounded-full border-4 border-slate-900"></div>
        </div>
        <div
          className="absolute inset-2 w-24 h-24 rounded-full border-2 border-white/30 animate-spin"
          style={{
            animationDuration: "3s",
            animationDirection:
              "reverse",
          }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-gradient-to-br from-white to-green-100 rounded-full flex items-center justify-center shadow-lg animate-pulse">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              className="text-green-400"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M8 12h8"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M12 8v8"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M9.5 9.5l5 5"
                stroke="currentColor"
                strokeWidth="0.8"
              />
              <path
                d="M14.5 9.5l-5 5"
                stroke="currentColor"
                strokeWidth="0.8"
              />
              <circle
                cx="12"
                cy="12"
                r="3"
                stroke="currentColor"
                strokeWidth="0.5"
                fill="none"
              />
            </svg>
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/40 rounded-full animate-ping"
              style={{
                top: `${20 + i * 10}%`,
                left: `${15 + i * 12}%`,
                animationDelay: `${
                  i * 0.3
                }s`,
                animationDuration: "2s",
              }}
            />
          ))}
        </div>
        <div className="absolute -inset-4 w-40 h-40">
          <svg
            className="w-full h-full transform -rotate-90"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="2"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#progressGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="283"
              strokeDashoffset="100"
              className="animate-pulse"
              style={{
                animation:
                  "progress 3s ease-in-out infinite",
              }}
            />
            <defs>
              <linearGradient
                id="progressGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop
                  offset="0%"
                  stopColor="#10b981"
                />
                <stop
                  offset="50%"
                  stopColor="#34d399"
                />
                <stop
                  offset="100%"
                  stopColor="#6ee7b7"
                />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes progress {
            0% { 
              stroke-dashoffset: 283;
              opacity: 0.5;
            }
            50% { 
              stroke-dashoffset: 50;
              opacity: 1;
            }
            100% { 
              stroke-dashoffset: 283;
              opacity: 0.5;
            }
          }
        `,
        }}
      />
    </div>
  );
};

export default TurfLoader;
