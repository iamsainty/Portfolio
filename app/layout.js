import { Open_Sans } from "next/font/google";
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
import { UserEditProfileProvider } from "@/context/user/profileEditContext";
import { Toaster } from "@/components/ui/sonner";

const openSans = Open_Sans({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
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
        <Script id="gtm-script" strategy="afterInteractive">
          {`
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-NCWHKRWQ');
  `}
        </Script>

        <meta
          name="google-site-verification"
          content="GhtSs3z27IAUGukWh38CcKxeUUO_o_y9OCRaozedRUg"
        />
        <meta name="yandex-verification" content="36ed0d13a996b828" />

        {/* Bing Webmaster */}
        <meta name="msvalidate.01" content="5BDA7303E56E77ABAC146B77B6B88FA1" />
      </head>
      <body className={`${openSans.className} antialiased`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NCWHKRWQ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <UserEditProfileProvider>
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
                      <Toaster />
                    </ThemeProvider>
                  </BlogCommentProvider>
                </BlogProvider>
              </ProjectProvider>
            </AdminAuthProvider>
          </UserAuthProvider>
        </UserEditProfileProvider>
      </body>
    </html>
  );
}
