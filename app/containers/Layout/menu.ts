/*
 * @Author: Ren jieyun
 * @Date:   2020-02-20 11:25:31
 * @Last Modified by: jieyun ren
 * @Last Modified time: 2020-04-28 18:37:48
 */
export default [
  {
    key: 'data_list',
    name: 'DataList',
    icon: 'ios-speedometer-outline',
    link: '/app/data',
    child: [
      {
        key: 'data_list_child',
        name: 'DataList_child',
        icon: 'ios-speedometer-outline',
        link: '/app/data',
      },
    ],
  },
  {
    key: 'project_list',
    name: 'Project',
    icon: 'ios-speedometer-outline',
    link: '/app/projects',
    child: [
      {
        key: 'project_list_child_1',
        name: 'ProjectList_child_1',
        icon: 'ios-speedometer-outline',
        link: '/app/projects',
      },
    ],
  },
  {
    key: 'connect_list',
    name: 'connect',
    icon: 'ios-speedometer-outline',
    link: '/app/connect',
    child: [
      {
        key: 'connect_list_child_1',
        name: 'connectList_child_1',
        icon: 'ios-speedometer-outline',
        link: '/app/connect',
      },
    ],
  },
  {
    key: 'deploy',
    name: '部署',
    icon: 'ios-speedometer-outline',
    link: '/app/deploy/messageChannel',
    child: [
      {
        key: 'messageChannel',
        name: '消息通道',
        icon: 'ios-speedometer-outline',
        link: '/app/deploy/messageChannel',
      },
      {
        key: 'deployTask',
        name: '部署任务',
        icon: 'ios-speedometer-outline',
        link: '/app/deploy/deployTask',
      },
      {
        key: 'monitorBoard',
        name: '监控板',
        icon: 'ios-speedometer-outline',
        link: '/app/deploy/monitorBoard',
      },
    ],
  },
];
