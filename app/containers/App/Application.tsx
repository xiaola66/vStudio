import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LeftSidebarLayout from '../Layout/LeftSidebarLayout';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import {
  DataPage,
  ConnectPage,
  ProjectsPage,
  AlgorithmsPage,
  AlgorithmDesignPage,
  MessageChannelPage,
  DeployTaskPage,
  MonitorBoardPage,
} from '../AsyncPages';

export default function Application() {
  return (
    <LeftSidebarLayout>
      <Switch>
        <Route exact path="/app" component={DataPage} />
        <Route exact path="/app/data" component={DataPage} />
        <Route exact path="/app/algorithms/:id" component={AlgorithmsPage} />
        <Route
          exact
          path="/app/algorithmDesign"
          component={AlgorithmDesignPage}
        />
        <Route exact path="/app/projects" component={ProjectsPage} />
        <Route exact path="/app/connect" component={ConnectPage} />
        <Route
          exact
          path="/app/deploy/messageChannel"
          component={MessageChannelPage}
        />
        <Route exact path="/app/deploy/deployTask" component={DeployTaskPage} />
        <Route
          exact
          path="/app/deploy/monitorBoard"
          component={MonitorBoardPage}
        />
        {/* Default */}
        <Route component={NotFoundPage} />
      </Switch>
    </LeftSidebarLayout>
  );
}
