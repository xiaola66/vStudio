import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import HTML5Backend from 'react-dnd-html5-backend';
import { Prompt, Link } from 'react-router-dom';
import _ from 'lodash';
import { DndProvider } from 'react-dnd';
import { useKeycloak } from '@react-keycloak/web';
import { FormattedMessage, injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Collapse from '@material-ui/core/Collapse';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Iconfont, warnMessage, Confirm } from 'components';
import { setflowGraph } from './flowGraph/flowGraph';
import getInstance from 'utils/http';
import SaveAsDialog from './components/saveAsDialog';
import DesignSidebar from './designSidebar';
import DesignCanvas from './designCanvas';
import TaskList from './taskList';
import messages from './messages';
import styles from './designStyles';
import './styles.scss';

const HEADER_HEIGHT: number = 68;
const SIDERBAR_WIDTH: number = 200;
// const dataList = [
//   {
//     id: '2',
//     type: 2,
//     icon: '2',
//     name: 'algorithm-item-02',
//     length: 25,
//     size: 55,
//     x: 80,
//     y: 90,
//     category: 'Auto',
//     dropTime: '200',
//     dragType: 'dragBox',
//     inputs: [
//       {
//         id: 'input01',
//         name: 'input01',
//         type: 'hive',
//       },
//     ],
//     outputs: [
//       {
//         id: 'output02',
//         name: 'output02',
//         type: 'hdfs',
//       },
//     ],
//   },
//   {
//     id: '4',
//     type: 3,
//     icon: '4',
//     name: 'output-item-04',
//     length: 35,
//     size: 85,
//     dropTime: '300',
//     category: 'Hadoop',
//     x: 300,
//     y: 500,
//     dragType: 'dragBox',
//     inputs: [
//       {
//         id: 'input04',
//         name: 'input04',
//         type: 'any',
//       },
//     ],
//   },
//   // {
//   //   type: 1,
//   //   category:"Hadoop",
//   //   icon:"1",
//   //   attributes:[],
//   //   displayName:"HCatalog",
//   //   name:"HcatalogInputConnector",
//   //   sort: '1',
//   // },
// ];

const AlgorithmDesign = (props: any) => {
  const {
    classes,
    algItems = [],
    algConnections = [],
    intl: { formatMessage },
    match: {
      params: { id },
    },
  } = props;
  const [data, setData] = useState(algItems);
  const [dropData, setDropData] = useState({});
  const [isCancelLeftDrag, setIsCancelLeftDrag] = useState<boolean>(false);
  const [connctions, setConnctions] = useState<Array<any>>(algConnections);
  const [saveAsOpen, setSaveAsOpen] = useState<boolean>(false);
  const [showTaskList, setShowTaskList] = useState<any>(false);
  const [debugAction, setDebugAction] = useState(false);

  const keycloak: any | undefined = useKeycloak().keycloak;

  useEffect(() => {
    getAlogrithmDesignData();
  }, []);

  useEffect(() => {
    setflowGraph(data, connctions, handleChange, errorMessages);
  }, [data, connctions]);

  const getAlogrithmDesignData = async () => {
    const wData: any = await getInstance(keycloak.token).get(
      `/api/workbench/modules/design/${id}`,
    );
    if (wData && wData.config) {
      let itemData: any = wData.config.itemData || [];
      const itemConnections: any  = wData.config.itemConnections || [];
      setData(itemData);
      // setConnctions(itemConnections);
    }
  }
  /**
   * on drop item from items list in sidebar
   * @param item drop item
   * @param position item position
   */
  const handleDrop = (item, position) => {
    let dropItem = {
      ...item,
      dragType: item.type,
      x: position.x - SIDERBAR_WIDTH,
      y: position.y - HEADER_HEIGHT,
    };
    if (item.type === 'dragBox') {
      setIsCancelLeftDrag(true);
    }
    setData([...data, dropItem]);
  };

  /**
   * on change data or connection in canvas
   * @param items nodes data or connections in canvas
   * @param type is nodes or is connections type === 'nodes' ? is nodes
   */
  const handleChange = (items: Array<any>, type: string) => {
    if (type === 'nodes') {
      setData(items);
    } else {
      setConnctions(items);
    }
  };

  /**
   * delete item in canvas
   * @param item item in canvas
   */
  const handleDeleteItem = item => {
    const itemId = `ALG_${item.id}_${item.dropTime}`;
    const nodes = data.filter(
      it =>
        it.id !== item.id ||
        (it.id === item.id && it.dropTime !== item.dropTime)
    );
    const cons = connctions.filter(
      it => it.source !== itemId && it.target !== itemId
    );
    setData(nodes);
    setConnctions(cons);
  };

  /**
   * error messages for algorithm design
   */
  const errorMessages = {
    auth: {
      drag: formatMessage(messages.error.auth.drag),
      delete: formatMessage(messages.error.auth.delete),
      connect: formatMessage(messages.error.auth.connect),
      error: (auth, type) => {
        if (!auth) {
          warnMessage(errorMessages.auth[type]);
        }
      },
    },
    connection: {
      1: formatMessage(messages.error.connection.error1),
      2: formatMessage(messages.error.connection.error2),
      3: formatMessage(messages.error.connection.error3),
      error: type => {
        warnMessage(errorMessages.connection[type]);
      },
    },
  };

  
  const getIsInequal = () => {
    return !_.isEqual(algConnections, connctions) || !_.isEqual(algItems, data);
  };

  /**
   * save items and connections for flow graph
   */
  const handleSave = async () => {
    try {
      // TODO
      // const {
      //   data: { code, data },
      // } = await post('/algorithem/isRun', id); // is run
      const data = false;
      if (data) {
        Confirm(
          formatMessage(messages.save.confirmTitle),
          formatMessage(messages.save.confirmText),
          () => {
            setSaveAsOpen(true);
          }
          // formatMessage,
        );
      } else {
        // post api
        onSave();
      }
    } catch (error) {
      return warnMessage(error);
    }
  };

  const handleSaveAs = saveObj => {
    const obj = {
      ...saveObj,
      itemData: data,
      itemConnections: connctions,
    };
    // TODO
    // post api
  };

  const handleShowTaskList = () => {
    setShowTaskList(prev => !prev);
  };

  const handleRun = () => {
    const isInequal = getIsInequal();
    if (isInequal) {
      Confirm(
        '',
        formatMessage(messages.InequalSave),
        () => {
          onSave();
        }
        // formatMessage,
      );
    } else {
    }
    //TODO
    // post api
  };

  const onSave = () => {
    const obj = {
      id,
      config: {
        itemData: data,
        itemConnections: connctions,
      },
    };
    console.log(obj, '8888888')
    //TODO
    // post api
  };

  const handleReturn = () => {
    const isInequal = getIsInequal();
    if (isInequal) {
      Confirm(
        '',
        formatMessage(messages.InequalSave),
        () => {
          onSave();
        }
        // formatMessage,
      );
    } else {
      props.history.goBack();
    }
  };

  const handleRevoke = async () => {};

  const handleRedo = async () => {};

  const handleCut = async () => {};

  const handleCopy = async () => {};

  const handlePaste = async () => {};

  const handleDebug = async () => {
    debugAction ? setDebugAction(false) : setDebugAction(true);
  };

  const handleDelete = async () => {};

  const handleStop = async () => {};

  const handleShareit = async () => {};

  const handleExport = async () => {};

  const basicIcons = [
    {
      id: 'save',
      icon: 'icon-save',
      text: formatMessage(messages.operation.save),
      onClick: handleSave,
    },
    {
      id: 'revoke',
      icon: 'icon-Revoke',
      type: 'disabled',
      text: formatMessage(messages.operation.revoke),
      onClick: handleRevoke,
    },
    {
      id: 'redo',
      icon: 'icon-Redo',
      type: 'disabled',
      text: formatMessage(messages.operation.redo),
      onClick: handleRedo,
    },
    {
      id: 'cut',
      icon: 'icon-Cut',
      type: 'disabled',
      text: formatMessage(messages.operation.cut),
      onClick: handleCut,
    },
    {
      id: 'copy',
      icon: 'icon-copy',
      type: 'disabled',
      text: formatMessage(messages.operation.copy),
      onClick: handleCopy,
    },
    {
      id: 'paste',
      icon: 'icon-Paste',
      type: 'disabled',
      text: formatMessage(messages.operation.paste),
      onClick: handlePaste,
    },
    {
      id: 'delete',
      icon: 'icon-delete',
      type: 'disabled',
      text: formatMessage(messages.operation.delete),
      onClick: handleDelete,
    },
  ];

  const midIcons = [
    {
      id: 'debug',
      icon: 'icon-debug',
      text: 'debug',
      type: 'disabled',
      onClick: handleDebug,
    },
    {
      id: 'run',
      icon: 'icon-run1',
      //type: 'disabled',
      text: formatMessage(messages.operation.run),
      onClick: handleRun,
    },
    {
      id: 'stop',
      icon: 'icon-stop',
      type: 'disabled',
      text: formatMessage(messages.operation.Terminate),
      onClick: handleStop,
    },
    {
      id: 'task',
      icon: 'icon-Taskqueue',
      text: formatMessage(messages.operation.Taskqueue),
      onClick: handleShareit,
    },
  ];

  const endIcons = [
    {
      id: 'shareit',
      icon: 'icon-shareit',
      type: 'disabled',
      text: formatMessage(messages.operation.shareit),
      onClick: handleShareit,
    },
    {
      id: 'export',
      icon: 'icon-Export',
      type: 'disabled',
      text: formatMessage(messages.operation.export),
      onClick: handleExport,
    },
  ];

  const toolbarRender = toolbarData =>
    toolbarData.map(item => {
      let icon: any = null;
      switch (item.id) {
        case 'debug':
          icon = (
            <Iconfont
              icon={debugAction ? 'icon-debug' : 'icon-OFF'}
              text="debug"
              direction="column"
              iconClass={classNames(classes.headerIcon, classes.disabledIcon)}
              onClick={handleDebug}
            />
          );
          break;
        case 'task':
          icon = (
            <Iconfont
              icon="icon-Taskqueue"
              text={formatMessage(messages.operation.Taskqueue)}
              direction="column"
              onShow={true}
              iconClass={classes.headerIconShow}
              onClick={handleShowTaskList}
              close={showTaskList}
            />
          );
          break;
        default:
          icon = (
            <Iconfont
              key={item.id}
              icon={item.icon}
              text={item.text}
              direction="column"
              iconClass={
                item.type === 'disabled'
                  ? classNames(classes.headerIcon, classes.disabledIcon)
                  : classes.headerIcon
              }
              onClick={item.onClick}
            />
          );
          break;
      }
      return icon;
    });
  return (
    <div className={classes.designRoot}>
      <DndProvider backend={HTML5Backend}>
        <AppBar className={classes.designHeader} position="static">
          <Toolbar className={classes.designToolbar}>
            <ArrowBackIosIcon
              onClick={handleReturn}
              className={classes.return}
            />
            <FormattedMessage {...messages.header} />
            <div className={classes.grow} />
            <div className={classes.basicIcons}>
              {toolbarRender(basicIcons)}
            </div>
            <div className={classes.midIcons}>{toolbarRender(midIcons)}</div>
            <div className={classes.endIcons}>{toolbarRender(endIcons)}</div>
          </Toolbar>
        </AppBar>
        <DesignSidebar
          isCancelDrag={isCancelLeftDrag}
          setIsCancelLeftDrag={setIsCancelLeftDrag}
        />
        <DesignCanvas
          onDrop={handleDrop}
          dropItem={dropData}
          data={data}
          onDeleteItem={handleDeleteItem}
          handleChange={handleChange}
        />
        <SaveAsDialog
          open={saveAsOpen}
          onCancel={() => {
            setSaveAsOpen(false);
          }}
          onSaveAs={handleSaveAs}
        />
      </DndProvider>
      <Collapse
        className={classes.taskShowdown}
        in={showTaskList}
        timeout="auto"
      >
        <TaskList />
      </Collapse>
    </div>
  );
};

export default withStyles(styles as any)(injectIntl(AlgorithmDesign));
