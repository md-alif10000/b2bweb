import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "../src/components/redux/store";
import LanguageDetector from "i18next-browser-languagedetector";
import i18n from "i18next";
import HttpApi from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

import Cookies from "js-cookie";
import {useEffect} from'react'


i18n
  .use(initReactI18next)
  .use(LanguageDetector) // passes i18n down to react-i18next
  .use(HttpApi)
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    supportedLngs: ["en", "fr", "cn"],
    fallbackLng: "en",
    backend: {
      loadPath: "/assets/locales/{{lng}}/translation.json",
    },
    detection: {
      order: ["cookie", "htmlTag", "localStorage", "path"],
      caches: ["localStorage", "cookie"],
    },
    react: { useSuspense: false },
  });

function MyApp({ Component, pageProps }) {
 

  useEffect(() => {
    document.ge
    
    
  }, []);

  useEffect(() => {

  const html=  document.getElementsByTagName("html")
 const script= document.createElement("script")
 script.src=""

 document.body.appendChild(script)
 
    
    
    
  }, []);



  return (
    <>
     <Provider store={store}>
      <div id="google_element" align="right" ></div>
      <Component {...pageProps} />
    </Provider>
    
    </>
   
  );
}

export default MyApp;
