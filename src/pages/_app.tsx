// import '@/styles/globals.css';
import Head from 'next/head';
import { Router } from 'next/router';
import { useEffect, useState } from 'react';

// import ThemeComponent from '@/theme/theme-component';
// ** Config Imports
import '@/config/i18n';
// import { SettingsConsumer, SettingsProvider } from '@/core/context/setting-context';
import AccountProvider from '@/contexts/AccountProvider';

export default function App({ Component, pageProps, router }: App.Props) {
  const pageLoading = usePageLoading(router);
  // const getConfig = Component.getConfig ?? (() => undefined);
  const getLayout = Component.getLayout ?? ((page: React.ReactElement) => page);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>Sample Landing Page with Components - powered by ButterCMS</title>
        <meta
          name="description"
          content="Sample Landing Page with Components - powered by ButterCMS"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="https://buttercms.com/static/v2/images/favicon.png"
        />
      </Head>

      {pageLoading ? (
        <div>loading..</div>
      ) : (
        // <SettingsProvider {...getConfig()}>
        //   <SettingsConsumer>
        //     {({ settings }) => (
        //       <ThemeComponent settings={settings}>
        //         {getLayout(<Component {...pageProps} />)}
        //       </ThemeComponent>
        //     )}
        //   </SettingsConsumer>
        // </SettingsProvider>
        <AccountProvider>{getLayout(<Component {...pageProps} />)}</AccountProvider>
      )}
    </>
  );
}

function usePageLoading(router: Router) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const showLoader = () => {
      setLoading(true);
    };

    const removeLoader = () => {
      setLoading(false);
    };

    Router.events.on('routeChangeStart', showLoader);
    Router.events.on('routeChangeComplete', removeLoader);
    Router.events.on('routeChangeError', removeLoader);

    return () => {
      Router.events.off('routeChangeStart', showLoader);
      Router.events.off('routeChangeComplete', removeLoader);
      Router.events.off('routeChangeError', removeLoader);
    };
  }, [router]);

  return loading;
}

// App.getInitialProps = async (appContext: AppContext) => {
//   const appProps = await NextApp.getInitialProps(appContext);
//   const authToken = 'aa'; //process.env.NEXT_PUBLIC_BUTTER_CMS_API_KEY
//   const mainMenu = [];

//   if (authToken) {
//     // try {
//     //   mainMenu = await getMenus();
//     // } catch (e) {
//     //   console.error("Couldn't load main menu links.", e);
//     // }
//   }

//   return { ...appProps, mainMenu };
// };
