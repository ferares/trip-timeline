export default function Photos({ title, albumURL }: { title: string, albumURL: string }) {
  return (
    <div className="section section--photos">
      <h2 className="section-title">
        Fotos
      </h2>
      <a className="photos-link" href={albumURL} target="_blank">
        Ver álbum de &quot;{title}&quot; en Google Fotos
      </a>
    </div>
  )
}