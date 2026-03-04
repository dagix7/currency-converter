
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen justify-between" suppressHydrationWarning>
        <Navbar/>
        <div className="grow">{children}</div>
        <Footer/>
      </body>
    </html>
  );
}
