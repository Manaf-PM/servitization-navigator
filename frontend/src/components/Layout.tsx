import type { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="app-shell">
      <main className="container">
        <header className="topbar">
          <div className="brand">
            <div className="logo">SN</div>
            <div>Servitization Navigator</div>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}