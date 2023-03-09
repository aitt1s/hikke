import { IntlProvider } from "react-intl";
import en from "../lang/en.json";
import fi_FI from "../lang/fi-FI.json";
import { useState } from "react";

import "../styles/globals.css";

const messages = {
  en,
  "fi-FI": fi_FI,
};

function MyApp({ Component, pageProps }) {
  const [locale, setLocale] = useState('fi-FI')

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <Component {...pageProps} />
    </IntlProvider>);
}

export default MyApp;
