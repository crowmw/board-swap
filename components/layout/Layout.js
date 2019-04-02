import Navbar from './NavBar'
import Footer from './Footer'

export default ({ children }) => {
  return (
    <>
      <Navbar>
        {children}
        <Footer />
      </Navbar>
    </>
  )
}