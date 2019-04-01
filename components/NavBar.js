import { Menu, Responsive, Container, Image, Icon } from 'semantic-ui-react'
import { useState, Fragment } from 'react'
import Link from 'next/link'

const MobileNavBar = () => {
  return (
    <Menu fixed='top' inverted color='purple' borderless={true}>
      <Menu.Item>
        <Link href='/'>
          <Image size='mini' src='https://react.semantic-ui.com/logo.png' />
        </Link>
      </Menu.Item>
      <Menu.Menu icon='true' position='right' borderless="true" >
        <Link href='/'>
          <Menu.Item>
            <Icon name='add' size='large' fitted />
          </Menu.Item>
        </Link>
        <Link href='/'>
          <Menu.Item>
            <Icon name='search' size='large' fitted />
          </Menu.Item>
        </Link>
        <Link href='/'>
          <Menu.Item>
            <Icon name='star' size='large' fitted />
          </Menu.Item>
        </Link>
        <Link href='/signin'>
          <Menu.Item>
            <Icon name='user' size='large' fitted />
          </Menu.Item>
        </Link>
      </Menu.Menu>
    </Menu>
  )
}

const NavBarChildren = ({ children }) => (
  <Container fluid style={{ position: 'absolute', top: "5em" }}>{children}</Container>
)

// const NavBarDesktop = ({ leftItems, rightItems }) => (
//   <Menu fixed="top" inverted>
//     <Menu.Item>
//       <Image size="mini" src="https://react.semantic-ui.com/logo.png" />
//     </Menu.Item>
//     {_.map(leftItems, item => (
//       <Menu.Item {...item} />
//     ))}
//     <Menu.Menu position="right">
//       {_.map(rightItems, item => (
//         <Menu.Item {...item} />
//       ))}
//     </Menu.Menu>
//   </Menu>
// );

const NavBar = ({ children, authorization }) => {
  const [visible, setVisible] = useState(false)

  return (
    <Fragment>
      <Responsive {...Responsive.onlyMobile}>
        <MobileNavBar />
        <NavBarChildren>{children}</NavBarChildren>
      </Responsive>
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <MobileNavBar />
        <NavBarChildren>{children}</NavBarChildren>
      </Responsive>
      {/* <Responsive minWidth={Responsive.onlyTablet.minWidth}>
            <NavBarDesktop leftItems={leftItems} rightItems={rightItems} />
            <NavBarChildren>{children}</NavBarChildren>
          </Responsive> */}
    </Fragment>
  )
}

export default NavBar