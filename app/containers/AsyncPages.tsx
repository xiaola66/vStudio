import React from 'react';
import loadable from 'utils/loadable';
import LoadingIndicator from 'components/LoadingIndicator';

export const HomePage = loadable(() => import('./Home'), {
  fallback: <LoadingIndicator />,
});

export const DataPage = loadable(() => import('./Data'), {
  fallback: <LoadingIndicator />,
});

export const AlgorithmsPage = loadable(() => import('./Algorithms'), {
  fallback: <LoadingIndicator />,
});

export const AlgorithmDesignPage = loadable(() => import('./AlgorithmDesign'), {
  fallback: <LoadingIndicator />,
});

export const ProjectsPage = loadable(() => import('./Projects'), {
  fallback: <LoadingIndicator />,
});

export const ConnectPage = loadable(() => import('./Connect'), {
  fallback: <LoadingIndicator />,
});

export const MessageChannelPage = loadable(() => import('./MessageChannel'), {
  fallback: <LoadingIndicator />,
});

export const DeployTaskPage = loadable(() => import('./DeployTask'), {
  fallback: <LoadingIndicator />,
});

export const MonitorBoardPage = loadable(() => import('./MonitorBoard'), {
  fallback: <LoadingIndicator />,
});
