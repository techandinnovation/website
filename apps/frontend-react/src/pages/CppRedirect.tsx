import { useEffect } from "react";

const TARGET_URL =
  "https://chivalrous-hydrofoil-427.notion.site/C-Complete-Course-HandBook-26f4a80d73c1807fa72efb65852af388";

export default function CppRedirect() {
  useEffect(() => {
    const t = setTimeout(() => {
      window.location.href = TARGET_URL;
    }, 900);

    return () => clearTimeout(t);
  }, []);

  return (
    <div style={containerStyle}>
      <svg
        width="48"
        height="48"
        viewBox="0 0 38 38"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(1 1)" strokeWidth="2">
            <circle strokeOpacity=".5" cx="18" cy="18" r="18" stroke="#111827" />
            <path d="M36 18c0-9.94-8.06-18-18-18" stroke="#4F46E5">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 18 18"
                to="360 18 18"
                dur="0.9s"
                repeatCount="indefinite"
              />
            </path>
          </g>
        </g>
      </svg>

      <div style={{ marginTop: 16, color: "#111827", fontSize: 16 }}>redirecting ....</div>

      <a href={TARGET_URL} style={linkStyle}>
        Open now
      </a>
    </div>
  );
}

const containerStyle: React.CSSProperties = {
  minHeight: "60vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const linkStyle: React.CSSProperties = {
  marginTop: 12,
  color: "#4F46E5",
  textDecoration: "underline",
};
