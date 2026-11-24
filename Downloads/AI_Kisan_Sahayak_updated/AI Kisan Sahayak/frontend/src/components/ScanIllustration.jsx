/* The hero picture: a leaf with the marks a scan would pick out. */

export default function ScanIllustration({ label, confidence }) {
  return (
    <svg
      className="scan-art"
      viewBox="0 0 400 460"
      role="img"
      aria-label={`${label} ${confidence}`}
    >
      {/* leaf */}
      <path
        d="M200 46C306 96 346 208 304 306C272 378 232 410 200 420C168 410 128 378 96 306C54 208 94 96 200 46Z"
        fill="#2F8A4A"
      />
      <path
        d="M200 46C306 96 346 208 304 306C272 378 232 410 200 420C168 410 128 378 96 306C54 208 94 96 200 46Z"
        fill="none"
        stroke="#1F5A32"
        strokeWidth="4"
      />
      {/* veins */}
      <g stroke="#9ED2A8" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.8">
        <path d="M200 50V416" />
        <path d="M200 130C170 140 142 156 120 180" />
        <path d="M200 130C230 140 258 156 280 180" />
        <path d="M200 205C165 216 135 236 112 266" />
        <path d="M200 205C235 216 265 236 288 266" />
        <path d="M200 285C175 296 152 314 136 338" />
        <path d="M200 285C225 296 248 314 264 338" />
      </g>

      {/* lesions: yellow halo, brown body, ring */}
      <g>
        <circle cx="150" cy="212" r="30" fill="#E8A317" opacity="0.35" />
        <circle cx="150" cy="212" r="19" fill="#6B3F1D" />
        <circle cx="150" cy="212" r="10" fill="none" stroke="#C9A24B" strokeWidth="2.5" />

        <circle cx="256" cy="168" r="24" fill="#E8A317" opacity="0.35" />
        <circle cx="256" cy="168" r="14" fill="#6B3F1D" />
        <circle cx="256" cy="168" r="7" fill="none" stroke="#C9A24B" strokeWidth="2.5" />

        <circle cx="238" cy="296" r="34" fill="#E8A317" opacity="0.35" />
        <circle cx="238" cy="296" r="22" fill="#6B3F1D" />
        <circle cx="238" cy="296" r="12" fill="none" stroke="#C9A24B" strokeWidth="2.5" />

        <circle cx="168" cy="332" r="18" fill="#E8A317" opacity="0.3" />
        <circle cx="168" cy="332" r="10" fill="#6B3F1D" />
      </g>

      {/* detection frame around the largest spot */}
      <g stroke="#E8A317" strokeWidth="4" strokeLinecap="round" fill="none">
        <path d="M202 260V252H210" />
        <path d="M274 252H282V260" />
        <path d="M282 332V340H274" />
        <path d="M210 340H202V332" />
      </g>

      {/* label tag */}
      <path d="M282 296H306" stroke="#E8A317" strokeWidth="2.5" />
      <g>
        <rect x="306" y="262" width="90" height="68" rx="10" fill="#FBEFC9" />
        <text x="316" y="286" fontSize="13" fontWeight="700" fill="#2B2118" fontFamily="Hind, sans-serif">
          {label}
        </text>
        <text x="316" y="314" fontSize="22" fontWeight="700" fill="#2B2118" fontFamily="Yatra One, Hind, serif">
          {confidence}
        </text>
      </g>

      {/* scan line, the one moving part */}
      <g className="scan-line">
        <rect x="52" y="0" width="296" height="3" rx="1.5" fill="#E8A317" />
        <rect x="52" y="-22" width="296" height="22" fill="url(#scanGlow)" />
      </g>
      <defs>
        <linearGradient id="scanGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E8A317" stopOpacity="0" />
          <stop offset="1" stopColor="#E8A317" stopOpacity="0.35" />
        </linearGradient>
      </defs>
    </svg>
  );
}
