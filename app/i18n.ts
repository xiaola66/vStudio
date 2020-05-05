/*
 * @Author: Ren jieyun
 * @Date:   2020-02-18 16:22:55
 * @Last Modified by:   jieyun Ren
 * @Last Modified time: 2020-04-18 18:33:25
 */
/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 *   IMPORTANT: This file is used by the internal build
 *   script `extract-intl`, and must use CommonJS module syntax
 *   You CANNOT use import/export in this file.
 */

// if (!Intl.PluralRules) {
//   require('@formatjs/intl-pluralrules/polyfill');
//   require('@formatjs/intl-pluralrules/dist/locale-data/en'); // Add locale data for en
//   require('@formatjs/intl-pluralrules/dist/locale-data/zh'); // Add locale data for zh
// }

// if (!Intl.RelativeTimeFormat) {
//   require('@formatjs/intl-relativetimeformat/polyfill');
//   require('@formatjs/intl-relativetimeformat/dist/locale-data/en'); // Add locale data for en
//   require('@formatjs/intl-relativetimeformat/dist/locale-data/zh'); // Add locale data for zh
// }
// TODO
import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
addLocaleData([...zh, ...en]);

import enTranslationMessages from './translations/en';
import zhTranslationMessages from './translations/zh';

export const DEFAULT_LOCALE = 'zh';

// prettier-ignore
export const appLocales = [
  'zh',
  'en',
];

export const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE
      ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
      : {};
  const flattenFormattedMessages = (formattedMessages, key) => {
    const formattedMessage =
      !messages[key] && locale !== DEFAULT_LOCALE
        ? defaultFormattedMessages[key]
        : messages[key];
    return { ...formattedMessages, [key]: formattedMessage };
  };
  return Object.keys(messages).reduce(flattenFormattedMessages, {});
};
export const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
  zh: formatTranslationMessages('zh', zhTranslationMessages),
};
