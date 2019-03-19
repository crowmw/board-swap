import Link from 'next/link'
import SignInForm from '../components/forms/SignInForm'

export default () => (
  <div>
    <h1> Sign in To BOARD SWAP! </h1>
    <Link href="/">
      <a>Home</a>
    </Link>
    <SignInForm />
  </div>
)
