"use client";

function LayoutWrapper({ children }) {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
      }}
    >
      {children}
    </div>
  );
}

export default LayoutWrapper;