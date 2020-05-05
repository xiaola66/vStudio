/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import * as React from 'react';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import { NoData } from 'components';

export default function NotFound() {
  return (
    <article>
      <NoData text="common.noPage" />
    </article>
  );
}
