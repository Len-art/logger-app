import React from 'react'
import { inject, observer, Provider } from 'mobx-react'
import { withRouter } from 'next/router'
import App, { Container } from 'next/app'
import Head from 'next/head'
import * as Sentry from '@sentry/browser'
import Store from '../store'
// import { SENTRY_PUBLIC_DSN } from 'env';
import Footer from '../components/footer'

import Header from '../components/header'

@withRouter
@inject('store')
@observer
class Layout extends React.Component {
  render() {
    const { children } = this.props
    return (
      <div className="layout">
        <Head>
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,shrink-to-fit=no"
            key="viewport"
          />
        </Head>
        <Header />
        {children}
        <Footer />
        <style jsx>
          {`
            .layout {
              height: 100%;

              padding: 100px 10px 70px 10px;
              box-sizing: border-box;
            }
          `}
        </style>
        <style jsx global>
          {`
            html,
            body {
              height: 100%;
              margin: 0;
            }
            html {
            }
            body {
              min-height: 100%;
              padding: 0;
              font-family: sans-serif;
              font-size: 14px;
              background-color: #f5f5f5;
              color: #222;
              --buttonBlue: rgb(8, 59, 153);
            }
            a {
              text-decoration: none;
              color: #222;
              margin: 0;
              padding: 0;
            }
            button {
              border-style: none;
              cursor: pointer;
              background-color: transparent;
            }
            .button:focus {
              outline: none;
            }
            #__next {
              min-height: 100%;
            }
            .small {
              font-size: 0.8em;
            }
            div {
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
