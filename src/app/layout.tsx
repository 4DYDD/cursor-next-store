import type { Metadata, Viewport } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-quicksand",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Cursor Tokoku",
  description:
    "Toko online kekinian pake Next.js, belanja cepet dan aman banget!",
  keywords: ["next.js", "react", "typescript"],
  authors: [{ name: "Somwan" }],
  openGraph: {
    title: "Cursor Tokoku",
    description:
      "Toko online kekinian pake Next.js, belanja cepet dan aman banget!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${quicksand.variable} ${quicksand.className}`}>
        {children}
      </body>
    </html>
  );
}
