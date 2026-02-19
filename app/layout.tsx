import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Tailwind CDN */}
        <script src="https://cdn.tailwindcss.com"></script>

        {/* Enable Dark Mode via class */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                darkMode: 'class'
              }
            `,
          }}
        />
      </head>

      <body className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}