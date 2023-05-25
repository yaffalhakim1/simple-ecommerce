import Header from "@/components/Header";
import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "E-commerce NextJS",
  description: "Simple E commerce build with NextJS 13.4",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://ecommerce-nextjs.vercel.app/",
    site_name: "E-commerce NextJS",
    images:
      "https://og.sznm.dev/api/generate?heading=Simple+E-commerce&text=Built+with+NextJS+13.4&template=color&center=true",
  },
  twitter: {
    title: "E-commerce NextJS",
    description: "Simple E commerce build with NextJS 13.4",
    card: "summary_large_image",
    creator: "@pengenradiant",
    images: [
      "https://og.sznm.dev/api/generate?heading=Simple+E-commerce&text=Built+with+NextJS+13.4&template=color&center=true",
    ],
  },
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
