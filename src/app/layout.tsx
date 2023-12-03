import "~/styles/globals.css";

import { Inter } from "next/font/google";
import Navbar from "./(Navbar)/navbar";
import { Toaster } from "react-hot-toast";

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
        className={`font-sans ${inter.variable} flex dark:bg-neutral-900 dark:text-white`}
      >
        <Navbar />
        <main className="flex w-screen flex-row">{children}</main>
        <Toaster
          toastOptions={{ className: "dark:font-white dark:bg-neutral-800" }}
          position="bottom-right"
        />
      </body>
    </html>
  );
}
``;
