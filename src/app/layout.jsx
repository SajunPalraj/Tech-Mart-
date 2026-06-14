import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import LayoutWrapper from "@/Helper/LayoutWrapper";
import FloatingControls from "@/Helper/FloatingControls";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata = {
  title: "Home 12 – Tech Mart",
  description: "Tech Mart homepage replica built with Next.js",
};

import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "pk_test_c2V0dGxlZC1tdXR0LTg4LmNsZXJrLmFjY291bnRzLmRldiQ"}>
          <AuthProvider>
            <CartProvider>
              <AppRouterCacheProvider>
                <NextTopLoader color="blue" initialPosition={0.08} crawlSpeed={200} height={3} speed={200} showSpinner={false} easing="ease" />
                <FloatingControls />
                <Navbar />
                <LayoutWrapper>
                  {children}
                </LayoutWrapper>
                <Footer />
              </AppRouterCacheProvider>
            </CartProvider>
          </AuthProvider>
          <div id="clerk-captcha" style={{ display: "none" }} />
        </ClerkProvider>
      </body>
    </html>
  );
}
