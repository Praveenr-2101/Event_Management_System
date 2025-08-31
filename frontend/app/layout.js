import "./globals.css";
import ClientLayout from "./ClientLayout";

export const metadata = {
  title: "Event Management App",
  description: "A platform for planning and managing events",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
