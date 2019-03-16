import Link from 'next/link'
import LoginForm from '../components/forms/login'

export default () => (
  <div>
    <h1> Login To Continue! </h1>
    <Link href="/">
      <a>Home</a>
    </Link>
    <LoginForm />
  </div>
)
