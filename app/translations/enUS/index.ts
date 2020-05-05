/*
 * @Author: Ren jieyun
 * @Date:   2020-02-18 16:23:12
 * @Last Modified by: jieyun ren
 * @Last Modified time: 2020-03-16 15:46:33
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
import MessageChannel from './MessageChannel';

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
  MessageChannel
);
