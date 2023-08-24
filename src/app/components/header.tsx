export default function Header({ title }: { title: string }) {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="main-title">
          { title }
        </h1>
      </div>
    </header>
  )
}