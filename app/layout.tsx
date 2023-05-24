import Header from "@/components/Header";
import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "E-commerce NextJS",
  description: "Simple E commerce build with NextJS 13.4",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={jakarta.className}>
        {/* <Header /> */}
        {children}
      </body>
    </html>
  );
}
