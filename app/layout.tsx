import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@styles/globals.css";
import { Nav, Provider } from "@components";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prompt App",
  description: "Discover & share AI prompts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
