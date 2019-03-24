import { Provider } from 'react-redux'
import App, { Container } from 'next/app'
import Head from 'next/head'
import withRedux from 'next-redux-wrapper'
import { initStore } from '../redux/index'

export default withRedux(initStore, { debug: false })(
  class BoardSwap extends App {
    static async getInitialProps({ Component, ctx }) {
      return {
        pageProps: Component.getInitialProps ? await Component.getInitialProps(ctx) : {}
      }
    }

    render() {
      const { Component, pageProps, store } = this.props
      return (
        <Container>
          <Provider store={store}>
            <Head>
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <meta charSet="utf-8" />
            </Head>
            <Component {...pageProps} />
          </Provider>
        </Container>
      )
    }
  }
)