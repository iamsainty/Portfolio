import { Funnel_Sans, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/Footer";
import { AdminAuthProvider } from "@/context/adminAuthContext";
import { ProjectProvider } from "@/context/projectContext";
import { BlogProvider } from "@/context/blogContext";
import Script from "next/script";
import { UserAuthProvider } from "@/context/user/authContext";
import { BlogCommentProvider } from "@/context/blogCommentContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const funnelSans = Funnel_Sans({
  variable: "--font-funnel-sans", // Add this
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-0RVS5CP3S2`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-0RVS5CP3S2');
  `}
        </Script>
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="nUb5b+mJnjM5CCCEkPXVlA"
          async
        />
        <meta
          name="google-site-verification"
          content="GhtSs3z27IAUGukWh38CcKxeUUO_o_y9OCRaozedRUg"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${funnelSans.variable} antialiased`}
      >
        <UserAuthProvider>
          <AdminAuthProvider>
            <ProjectProvider>
              <BlogProvider>
                <BlogCommentProvider>
                  <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                  >
                    <Navbar />
                    {children}
                    <Footer />
                  </ThemeProvider>
                </BlogCommentProvider>
              </BlogProvider>
            </ProjectProvider>
          </AdminAuthProvider>
        </UserAuthProvider>
      </body>
    </html>
  );
}
