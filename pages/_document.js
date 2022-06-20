import Document, { Html, Head, Main, NextScript } from "next/document";

class Mydocument extends Document {
  render() {
    return (
      <Html lang="ja">
        <Head></Head>
        <body>
          <script
            dangerouslySetInnerHTML={{
              __html: themeInitializerScript,
            }}
          ></script>
          <main></main>
          <NextScript></NextScript>
        </body>
      </Html>
    );
  }
}

const themeInitializerScript = `(function(){
    ${setInitialColorMode.toString()}
    setInitialColorMode();
})()`;

function setInitialColorMode() {
  function getInitialColorMode() {
    const persistedPreferenceMode = window.localStorage.getItem("theme");
    const hasPersistedPreference = typeof persistedPreferenceMode === "string";

    if (hasPersistedPreference) {
      return persistedPreferenceMode;
    }

    const preference = window.matchMedia("(prefers-color-scheme): dark");
    const hasMediaQueryPreference = typeof preference.matches === "boolean";

    if (hasMediaQueryPreference) {
      return preference.matches ? "dark" : "light";
    }

    return "light";
  }

  const currentColorMode = getInitialColorMode();
  if (currentColorMode === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  }
}

export default Mydocument;
