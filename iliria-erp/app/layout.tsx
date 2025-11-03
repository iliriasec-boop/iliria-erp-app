export const metadata = {
  title: 'Iliria ERP',
  description: 'Warehouse & Offers web app'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="el">
      <body style={{fontFamily:'system-ui, Arial', maxWidth: 1100, margin: '0 auto'}}>
        {children}
      </body>
    </html>
  )
}
