/*
 * @Author: chunyu shi
 * @Date:   2020-04-18 11:05:49
 * @Last Modified by: jieyun ren
 * @Last Modified time: 2020-04-30 17:12:02
 */
/*
 * Header Messages
 *
 * This contains all the text for the Header component.
 */
import { defineMessages } from 'react-intl';
import defaultMessages from 'translations/en';

export const scope = 'vstudio.usermenu';

export default defineMessages({
  accountInformation: {
    id: `${scope}.accountInformation`,
    defaultMessage: defaultMessages[`${scope}.accountInformation`],
  },
  businessAdministration: {
    id: `${scope}.businessAdministration`,
    defaultMessage: defaultMessages[`${scope}.businessAdministration`],
  },
  helpCenter: {
    id: `${scope}.helpCenter`,
    defaultMessage: defaultMessages[`${scope}.helpCenter`],
  },
  featureUpdates: {
    id: `${scope}.featureUpdates`,
    defaultMessage: defaultMessages[`${scope}.featureUpdates`],
  },
  interfaceLanguage: {
    id: `${scope}.interfaceLanguage`,
    defaultMessage: defaultMessages[`${scope}.interfaceLanguage`],
  },
  logout: {
    id: `${scope}.logout`,
    defaultMessage: defaultMessages[`${scope}.logout`],
  },
  zh: {
    id: 'vstudio.language.LocaleToggle.zh',
    defaultMessage: defaultMessages['vstudio.language.LocaleToggle.zh'],
  },
  en: {
    id: 'vstudio.language.LocaleToggle.en',
    defaultMessage: defaultMessages['vstudio.language.LocaleToggle.en'],
  },
});
