import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Outer from 'containers/Layout/Outer';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

function Auth() {
  return (
    <Outer>
      <Switch>
        {/* <Route path="/login" component={Login} /> */}
        <Route component={NotFoundPage} />
      </Switch>
    </Outer>
  );
}

export default Auth;
