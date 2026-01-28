import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { DateProvider } from "@/components/DateContext";
import { UserProvider } from "@/components/UserContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Restrau Bee Admin",
  description: "POS Analytics Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning tabIndex={-1}>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${outfit.variable} antialiased min-h-screen font-sans transition-colors duration-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <DateProvider>
            <UserProvider>
              {children}
            </UserProvider>
          </DateProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

