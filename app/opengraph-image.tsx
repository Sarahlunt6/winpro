import { ImageResponse } from "next/og";

// Sitewide OpenGraph image (§8). Cascades to every route unless a page overrides it.
// Also used as the Twitter card image (Twitter falls back to og:image).
export const runtime = "nodejs";
export const alt = "WinPro Window Cleaning — St. George & Southern Utah";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#16202E",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 18,
              height: 64,
              background: "#4FA8D8",
              borderRadius: 999,
            }}
          />
          <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: -1 }}>
            WinPro Window Cleaning
          </div>
        </div>
        <div
          style={{
            fontSize: 68,
            fontWeight: 800,
            lineHeight: 1.05,
            marginTop: 40,
            maxWidth: 900,
            letterSpacing: -2,
          }}
        >
          Dirty windows? Consider them handled.
        </div>
        <div style={{ fontSize: 32, color: "#BFE3F5", marginTop: 28 }}>
          Streak-free window cleaning · St. George &amp; Southern Utah
        </div>
      </div>
    ),
    { ...size },
  );
}
