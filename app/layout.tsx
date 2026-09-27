import type { Metadata } from "next";
import Link from "next/link";
import { Geist_Mono, Inter } from "next/font/google";
import BrandMark from "./_lib/BrandMark";
import Nav from "./_lib/Nav";
import PrevNext from "./_lib/PrevNext";
import ThemeToggle from "./_lib/ThemeToggle";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Learn Next.js in Y Minutes",
    template: "%s | Learn Next.js in Y Minutes",
  },
  description: "Short lessons with live demos for the latest Next.js.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t)document.documentElement.dataset.theme=t}catch(e){}`,
          }}
        />
      </head>
      <body>
        <header className="topbar">
          <Link href="/" className="brand">
            <BrandMark />
            Learn Next.js in Y Minutes
          </Link>
          <div className="topbar-actions">
            <span className="pill">Next.js 16.3</span>
            <ThemeToggle />
          </div>
        </header>
        <div className="shell">
          <aside>
            <Nav />
          </aside>
          <div className="content">
            <main>
              {children}
              <PrevNext />
            </main>
            <footer className="footer">
              <span>
                Built by{" "}
                <a href="https://github.com/fadlihdytullah">Fadli Hidayatullah</a>
                {" · "}
                <a href="https://github.com/fadlihdytullah/learn-nextjs-in-y-minutes">
                  Source on GitHub
                </a>
              </span>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
