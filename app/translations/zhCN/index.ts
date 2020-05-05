/*
 * @Author: Ren jieyun
 * @Date:   2020-02-18 16:22:02
 * @Last Modified by: jieyun ren
 * @Last Modified time: 2020-04-28 18:44:13
 */

import User from './user';
import Menu from './menu';
import Language from './language';
import NotFoundPage from './notFoundPage';
import Algorithm from './algorithm';
import Project from './project';
import DataUpload from './dataUpload';
import Details from './algorithm/details';
import Data from './data';
import Connect from './connect';
import MessageChannel from './MessageChannel';
import Workspace from './workspace';
import userMenu from './userMenu';
import MonitorBoard from './monitorBoard';
import DeployTask from './deployTask';

export default Object.assign(
  {},
  User,
  Menu,
  Language,
  NotFoundPage,
  Algorithm,
  DataUpload,
  Details,
  Project,
  Data,
  Connect,
  MessageChannel,
  Workspace,
  userMenu,
  MonitorBoard,
  DeployTask
);
