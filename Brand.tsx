import { useId } from "react";

type LogoProps = {
  className?: string;
};

/** Inner circular mark of the Sindh Swim Hub identity — no outer ajrak square. */
export function Logo({ className = "h-12 w-12" }: LogoProps) {
  const clipId = `logo-clip-${useId().replace(/:/g, "")}`;

  return (
    <svg
      viewBox="0 0 300 300"
      className={className}
      role="img"
      aria-label="Sindh Swim Hub logo"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id={clipId}>
          <circle cx="150" cy="150" r="139" />
        </clipPath>
      </defs>

      <circle cx="150" cy="150" r="148" fill="#FFFFFF" />
      <circle cx="150" cy="150" r="139" fill="#0A1F44" />

      <g clipPath={`url(#${clipId})`}>
        <circle cx="150" cy="150" r="139" fill="#0A1F44" />

        {/* Water droplets */}
        <circle cx="91" cy="112" r="4.2" fill="#7EB6EC" opacity="0.9" />
        <circle cx="198" cy="111" r="5" fill="#7EB6EC" opacity="0.75" />
        <circle cx="212" cy="124" r="3.2" fill="#7EB6EC" opacity="0.65" />
        <circle cx="78" cy="173" r="3.5" fill="#FFFFFF" opacity="0.75" />
        <circle cx="225" cy="175" r="3.5" fill="#FFFFFF" opacity="0.75" />

        {/* Freestyle swimmer silhouette */}
        <circle cx="113" cy="102" r="13.5" fill="#FFFFFF" />
        <path
          d="M123 104 C140 84 163 84 182 97"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          d="M112 119 C117 113 125 113 131 117 L150 129 L187 128 C195 128 199 133 196 137 C193 141 188 141 182 140 L146 139 L125 138 C115 138 108 130 112 119 Z"
          fill="#FFFFFF"
        />
        <path
          d="M119 124 C106 123 98 128 88 127"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <path
          d="M145 130 C158 130 169 137 187 136"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="9"
          strokeLinecap="round"
        />

        {/* White, red and light-blue wave bands */}
        <path
          d="M-5 147 C45 133 88 160 150 147 C212 134 255 160 305 147"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="7"
        />
        <path
          d="M-5 161 C45 147 88 174 150 161 C212 148 255 174 305 161"
          fill="none"
          stroke="#C41E3A"
          strokeWidth="8"
        />
        <path
          d="M-5 183 C45 169 88 196 150 183 C212 170 255 196 305 183"
          fill="none"
          stroke="#7EB6EC"
          strokeWidth="7"
        />

        <text
          x="150"
          y="229"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="Cinzel, Georgia, serif"
          fontSize="43"
          fontWeight="700"
          letterSpacing="2.5"
        >
          SINDH
        </text>
        <text
          x="150"
          y="262"
          textAnchor="middle"
          fill="#D4A017"
          fontFamily="Cinzel, Georgia, serif"
          fontSize="19"
          fontWeight="700"
          letterSpacing="5.5"
        >
          SWIM HUB
        </text>
      </g>

      <circle cx="150" cy="150" r="143.5" fill="none" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.65" />
    </svg>
  );
}

type PatternProps = {
  className?: string;
  strong?: boolean;
  opacity?: number;
};

/** Subtle Sindhi ajrak-inspired diamond lattice rendered as a tiled SVG. */
export function AjrakPattern({ className = "", strong = false, opacity = 1 }: PatternProps) {
  const patternId = `ajrak-${useId().replace(/:/g, "")}`;

  return (
    <svg
      className={className}
      style={{ opacity }}
      aria-hidden="true"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id={patternId} width="44" height="44" patternUnits="userSpaceOnUse">
          {strong && <rect width="44" height="44" fill="#8E152B" />}
          <path
            d="M22 1 L43 22 L22 43 L1 22 Z"
            fill="none"
            stroke={strong ? "#FFFFFF" : "#C41E3A"}
            strokeOpacity={strong ? "0.34" : "0.52"}
            strokeWidth="1.15"
          />
          <path
            d="M22 9 L35 22 L22 35 L9 22 Z"
            fill="none"
            stroke={strong ? "#FFFFFF" : "#C41E3A"}
            strokeOpacity={strong ? "0.2" : "0.26"}
            strokeWidth="0.9"
          />
          <circle
            cx="22"
            cy="22"
            r="3.5"
            fill="#0A1F44"
            stroke={strong ? "#9CC9F5" : "#6FA9E6"}
            strokeOpacity={strong ? "0.75" : "0.55"}
            strokeWidth="1"
          />
          <circle cx="0" cy="0" r="1.7" fill={strong ? "#0A1F44" : "#000000"} opacity={strong ? "0.85" : "0.36"} />
          <circle cx="44" cy="0" r="1.7" fill={strong ? "#0A1F44" : "#000000"} opacity={strong ? "0.85" : "0.36"} />
          <circle cx="0" cy="44" r="1.7" fill={strong ? "#0A1F44" : "#000000"} opacity={strong ? "0.85" : "0.36"} />
          <circle cx="44" cy="44" r="1.7" fill={strong ? "#0A1F44" : "#000000"} opacity={strong ? "0.85" : "0.36"} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}

export function AjrakDivider() {
  return (
    <div className="relative h-9 overflow-hidden border-y border-sindh-red/35 bg-navy-deep">
      <AjrakPattern strong className="absolute inset-0 h-full w-full" opacity={0.68} />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-transparent to-navy-deep" />
      <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-sindh-gold/80 bg-navy shadow-[0_0_16px_rgba(212,160,23,0.55)]" />
    </div>
  );
}
