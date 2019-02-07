import React from 'react'
import App, { Container } from 'next/app'
import * as Sentry from '@sentry/browser'
import { Provider } from 'mobx-react'
import { format } from 'date-fns'
import Store from '../store'
// import { SENTRY_PUBLIC_DSN } from 'env';
import Footer from '../components/footer'

import Header from '../components/header'

class Layout extends React.Component {
  render() {
    const { children } = this.props

    return (
      <div className="layout">
        <Header />
        {children}
        <Footer />
        <style jsx>
          {`
            .layout {
              height: 100%;
              width: 100%;
            }
          `}
        </style>
        <style jsx global>
          {`
            html,
            document,
            body {
              height: 100%;
              width: 100%;
              margin: 0;
              font-family: sans-serif;
              font-size: 14px;
              background-color: #fafafa;
            }
            #__next {
              height: 100%;
            }
            .small {
              font-size: 0.8em;
            }
          `}
        </style>
      </div>
    )
  }
}

export default class MyApp extends App {
  constructor(props) {
    super(props)

    // if (SENTRY_PUBLIC_DSN) {
    //   Sentry.init({
    //     dsn: SENTRY_PUBLIC_DSN,
    //   });
    // }

    this.store = new Store() // initStore(props.isServer, props.initialState);
  }

  static async getInitialProps({ Component, ctx, req }) {
    const isServer = !!req
    // const store = initStore(isServer);

    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return {
      // initialState: getSnapshot(store),
      pageProps,
      isServer,
    }
  }

  componentDidCatch(error, errorInfo) {
    // if (SENTRY_PUBLIC_DSN) {
    //   Sentry.configureScope((scope) => {
    //     Object.keys(errorInfo).forEach((key) => {
    //       scope.setExtra(key, errorInfo[key]);
    //     });
    //   });
    //   Sentry.captureException(error);
    // }

    super.componentDidCatch(error, errorInfo)
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <Provider store={this.store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </Container>
    )
  }
}
