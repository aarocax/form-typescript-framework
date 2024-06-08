export { translator, language, translations, setTranslations };

var translations: object;

function translator(phrase: string, language = "es") {
  var tFile: any;
  tFile = translations;
  type ObjectKey = keyof typeof tFile;
  const index = phrase as ObjectKey;
  return (phrase in tFile) ? tFile[index][language] : phrase;
}

function language(): string {
  return (window.location.pathname.indexOf("/en/") === -1) ? "es" : "en";
}

function setTranslations(trans: object): void {
  translations = trans;
}
