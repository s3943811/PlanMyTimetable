import "~/styles/globals.css";

import { Inter } from "next/font/google";
import Navbar from "./(Navbar)/navbar";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "~/contexts/themeProvider";
import Footer from "./footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "PlanMyTimetable",
  description: "A simple webapp to plan your timetable interactively",
  icons: [{ rel: "icon", url: "/calendar3.svg" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${inter.variable} dark:bg-neutral-900 dark:text-white`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex">
            <Navbar />
            <main className="flex w-screen flex-row">{children}</main>
          </div>
          <Footer />
          <Toaster
            toastOptions={{ className: "dark:font-white dark:bg-neutral-800" }}
            position="bottom-right"
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
``;
