import './globals.css';

export const metadata = {
  title: 'Weather Dashboard',
  description: 'Dashboard for your weather widgets',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="">
        <header className="bg-blue-500 text-white p-4 shadow">
          <h1 className="text-xl font-bold">Widgets Dashboard</h1>
        </header>

        <main className="p-8 min-h-screen">{children}</main>

        <footer className="bg-gray-200 text-gray-700 p-4 mt-8 text-center">
          &copy; 2025 Weather App
        </footer>
      </body>
    </html>
  );
}
