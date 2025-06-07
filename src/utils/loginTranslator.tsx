import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { ITranslations, Language } from "../types/Language";

interface ILanguageContext {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: ITranslations;
  isRTL: boolean;
}

const translations: Record<Language, ITranslations> = {
  en: {
    login: "Login",
    enterUsername: "Enter Your Username",
    usernameError: "Username should not be empty",
    loginButton: "LOGIN",
    language: "Language",
    english: "English",
    farsi: "Farsi",
  },
  fa: {
    login: "ورود",
    enterUsername: "نام کاربری خود را وارد کنید",
    usernameError: "نام کاربری نباید خالی باشد",
    loginButton: "ورود",
    language: "زبان",
    english: "انگلیسی",
    farsi: "فارسی",
  },
};

const LanguageContext = createContext<ILanguageContext | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("en");

  const contextValue: ILanguageContext = {
    language,
    setLanguage,
    translations: translations[language],
    isRTL: language === "fa",
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): ILanguageContext => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
