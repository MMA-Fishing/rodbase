import { useLocale } from "../context/LocaleContext.jsx";

export default function LanguageSwitcher() {
  const { locale, setLocale, supportedLocales } = useLocale();

  return (
    <div className="languageSwitcher" aria-label="Language switcher">
      {supportedLocales.map((item) => (
        <button
          key={item.code}
          type="button"
          className={locale === item.code ? "languageButton activeLanguageButton" : "languageButton"}
          onClick={() => setLocale(item.code)}
          title={item.nativeName}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
