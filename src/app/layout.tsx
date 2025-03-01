
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="m-0 p-0">
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
