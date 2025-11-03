export default function Home() {
  return (
    <main style={{padding: 24}}>
      <h1>Iliria ERP</h1>
      <ul style={{lineHeight: '2rem'}}>
        <li><a href="/categories">Κατηγορίες</a></li>
        <li><a href="/products">Αποθήκη</a></li>
      </ul>
      <p>Προχώρα πρώτα στις Κατηγορίες και μετά στην Αποθήκη.</p>
    </main>
  )
}
