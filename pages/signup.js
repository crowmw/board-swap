import Link from 'next/link'
import SignupForm from '../components/forms/SignUpForm'

export default () => (
  <div>
    <h1> Create An Account! </h1>
    <Link href="/">
      <a>Home</a>
    </Link>
    <SignupForm />
  </div>
)
