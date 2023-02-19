import { ITranslations } from "@/models/translation.model";

import * as translations from "@/assets/translations";
import { lang_fallback } from "@/assets/constants";

const getNestedTranslations = (language: string, keys: string[]) =>
  keys.reduce(
    (obj, key) => (obj as ITranslations)?.[key],
    (translations as ITranslations)[language]
  );

const useTranslation = (language: string) => {
  

  const translate = (key: string) => {
    const keys = key.split(".");

    return (
      (getNestedTranslations(language, keys) as string) ??
      (getNestedTranslations(lang_fallback, keys) as string) ??
      key
    );
  };

  return {
    t: translate,
  };
};

export default useTranslation;
