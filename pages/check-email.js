import Link from 'next/link'

export default () => (
  <div>
    <h1> Teraz musisz aktywować swoje konto! </h1>
    <p>Kliknij w link który właśnie Ci przesłaliśmy. Sprawdź skrzynkę e-mail, jeśli nie możesz znaleźć naszego e-maila sprawdź folder Spam</p>
    <p>Wróć na <Link href="/">
      <a>stronę główną</a>
    </Link>
    </p>
  </div>
)
