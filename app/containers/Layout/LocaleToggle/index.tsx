/*
 *
 * LanguageToggle
 *
 */
import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';

import { changeLocale } from 'logic/language/action';

import CN_FLAG from './flag_zh.png';
import EN_FLAG from './flag_en.png';
import messages from './messages';

export function LocaleToggle(props: any) {
  const { locale, onLocaleToggle } = props;
  const flag = locale === 'zh' ? CN_FLAG : EN_FLAG;
  return (
    <li className="dropdown">
      <a
        href="javascript:void(0)"
        className="dropdown-toggle"
        data-toggle="dropdown"
        role="button"
        aria-expanded="false"
      >
        <img src={flag} />
      </a>
      <ul
        id="language-dropdown"
        className="dropdown-menu bullet pull-center"
        role="menu"
      >
        <li onClick={evt => onLocaleToggle(evt, 'zh')}>
          <a href="javascript:void(0)" className="capitalize action-lang-zh">
            <img src={CN_FLAG} /> <FormattedMessage {...messages.zh} />
          </a>
        </li>
        <li onClick={evt => onLocaleToggle(evt, 'en')}>
          <a href="javascript:void(0)" className="capitalize action-lang-en">
            <img src={EN_FLAG} /> <FormattedMessage {...messages.en} />
          </a>
        </li>
      </ul>
    </li>
  );
}

const mapStateToProps = state => ({
  locale: state.language.locale,
});

export const mapDispatchToProps = dispatch => {
  return {
    onLocaleToggle: (evt, locale) => dispatch(changeLocale(locale)),
    dispatch,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocaleToggle);
