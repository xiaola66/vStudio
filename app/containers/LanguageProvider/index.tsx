/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import React from 'react';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';

export function LanguageProvider(props: any) {
  return (
    <IntlProvider
      locale={props.locale}
      key={props.locale}
      messages={props.messages[props.locale]}
    >
      {React.Children.only(props.children)}
    </IntlProvider>
  );
}

const mapStateToProps = state => ({
  locale: state.language.locale,
});

export default connect(mapStateToProps)(LanguageProvider);
