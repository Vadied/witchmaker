import { useRouter } from "next/router";
import { useCallback } from "react";
import translations from "@/assets/translations";
import { ITranslations } from "@/models/translation.model";

export default function useTranslation() {
  const router = useRouter();
  const { locale, asPath } = router;

  const setLocale = useCallback(
    (locale: string) => {
      router.push(asPath, asPath, { locale });
    },
    [router, asPath]
  );

  const getNestedTranslations = (language: string, keys: string[]) =>
    keys.reduce(
      (obj, key) => (obj as ITranslations)?.[key],
      (translations as ITranslations)[language]
    );

  const translate = (key: string) => {
    const keys = key.split(".");
    return (
      (getNestedTranslations(locale || "en", keys) as string) ??
      (getNestedTranslations("en", keys) as string) ??
      key
    );
  };

  return { t: translate, locale, setLocale };
}
