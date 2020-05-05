import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route, Redirect } from 'react-router-dom';
import Application from './Application';
import ThemeWrapper from './ThemeWrapper';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { HomePage, DataPage } from '../AsyncPages';
import { AlgorithmDesignPage } from '../AsyncPages';

export default function App(props: any) {
  return (
    <div>
      <Helmet
        titleTemplate="%s - ExceedData vStudio"
        defaultTitle="ExceedData vStudio"
      >
        <meta name="description" content="A ExceedData vStudio application" />
      </Helmet>
      <ThemeWrapper>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/app" />
          </Route>
          <Route path="/app" render={() => <Application />} />
          <Route path="/home" exact component={HomePage} />
          <Route path="/algorithm/:id" component={AlgorithmDesignPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </ThemeWrapper>
    </div>
  );
}
