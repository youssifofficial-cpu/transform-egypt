import React, { createContext, useContext, useState } from "react";

type Lang = "en" | "ar";

interface I18nContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations: Record<Lang, Record<string, string>> = {
  en: {
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.transformations": "Transformations",
    "nav.boutique": "Boutique",
    "nav.reviews": "Reviews",
    "nav.book": "Book Now",
    "hero.tagline": "Where Beauty Meets Precision",
    "hero.slogan": "A new you, Today!",
    "hero.cta": "Book Your Transformation",
    "hero.explore": "Explore Services",
    "nav.lang": "عربي",
    "footer.tagline": "Transforming beauty with precision and style.",
    "footer.locations": "Our Locations",
    "footer.follow": "Follow Us",
    "footer.contact": "Contact",
    "footer.rights": "All rights reserved.",
    "whatsapp.label": "Chat with us",
  },
  ar: {
    "nav.home": "الرئيسية",
    "nav.services": "الخدمات",
    "nav.transformations": "التحولات",
    "nav.boutique": "المتجر",
    "nav.reviews": "التقييمات",
    "nav.book": "احجز الآن",
    "hero.tagline": "حيث يلتقي الجمال بالدقة",
    "hero.slogan": "أنت جديد، اليوم!",
    "hero.cta": "احجز تحولك",
    "hero.explore": "استكشف الخدمات",
    "nav.lang": "English",
    "footer.tagline": "نحول الجمال بدقة وأناقة.",
    "footer.locations": "فروعنا",
    "footer.follow": "تابعنا",
    "footer.contact": "تواصل معنا",
    "footer.rights": "جميع الحقوق محفوظة.",
    "whatsapp.label": "تحدث معنا",
  },
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  const t = (key: string) =>
    translations[lang][key] ?? translations.en[key] ?? key;

  return (
    <I18nContext.Provider value={{ lang, setLang, t, isRTL: lang === "ar" }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
