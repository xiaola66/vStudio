/*
 * @Author: jieyun Ren
 * @Date:   2020-03-07 10:45:37
 * @Last Modified by: jieyun ren
 * @Last Modified time: 2020-04-30 18:47:00
 */
import jsplumbIn from 'jsplumb';

const jsPlumb: any = jsplumbIn.jsPlumb;

/**
 * set flow graph
 * @param items canvas items data
 * @param connctions canvas connection data
 * @param change change data connection
 */
export const setflowGraph = (
  items: Array<any>,
  connctions: Array<any>,
  change: (items: object[], type: string) => void,
  errorMessages: any
) => {
  jsPlumb.ready(function() {
    setTimeout(() => {
      var flowchart = new FlowGraph(items, connctions, change, errorMessages);
      flowchart.show();
    }, 0);
  });
};

/**
 * flow graph
 * @param this this
 * @param nodes canvas items data
 * @param connections canvas connections data
 */
export function FlowGraph(
  this: any,
  nodes: Array<any>,
  connections: Array<any>,
  change: (items: Array<any>, type: string) => void,
  errorMessages: any
) {
  // node in canvas
  this.nodes = nodes;
  // connction in canvas
  this.connections = connections;
  // change data
  this.change = change;
  // error message
  this.errorMessages = errorMessages;
}

FlowGraph.prototype = {
  constructor: FlowGraph,
  instance: jsPlumb.getInstance({
    DragOptions: { cursor: 'pointer', zIndex: 2000 },
    ConnectionOverlays: [
      // ["Arrow", {
      //     location: 1,
      //     visible: true,
      //     width: 8,
      //     length: 8,
      //     foldback: 0.618,
      // }],
      [
        'Label',
        {
          //label
          location: 0.4,
          id: 'label',
          cssClass: 'aLabel',
        },
      ],
      [
        'Custom',
        {
          create: function(component) {
            let el = document.createElement('div'); // TODO update icon
            el.innerHTML = `<span class="connectDeleteIcon">
                            <i
                                class="iconfont icon-delete"
                                style="font-size: 25px;"
                            /> 
                        </span>`;
            return el;
          },
          location: 0.2,
          id: 'customOverlay',
          visible: false,
        },
      ],
    ],
    ConnectionsDetachable: true,
    Container: 'mainCanvas', // canvas
  }),
  config: function(type: number) {
    return {
      nodeName: 'ALG',
      elementName: 'node',
      editable: false,
      sourceEndpoint: {
        endpoint: [
          'Rectangle',
          {
            cssClass: `vsSourceEndpoint endpointType${type}`,
            width: 7,
            height: 10,
          },
        ],
        paintStyle: {
          fill: 'transparent',
        },
        isSource: true,
        connector: [
          'Straight',
          {
            midpoint: 0.1,
          },
        ],
        connectorStyle: {
          strokeWidth: 2,
          stroke: '#61B7CF',
          joinstyle: 'round',
          // outlineWidth: 2,
          // outlineStroke: "white"
        },
        connectorHoverStyle: {
          strokeWidth: 3,
          stroke: '#216477',
          // outlineWidth: 2,
          // outlineStroke: "white"
        },
        maxConnections: -1,
      },
      targetEndpoint: {
        endpoint: [
          'Rectangle',
          {
            cssClass: `vsTargetEndpoint endpointType${type}`,
            width: 7,
            height: 10,
          },
        ],
        paintStyle: {
          fill: 'transparent',
        },
        maxConnections: 1,
        isTarget: true,
      },
    };
  },
  _addEndpoints: function() {
    const _self = this;
    this.nodes.map(item => {
      const nodeId = `${this.config(item.type).nodeName}_${item.id}_${
        item.dropTime
      }`;
      this.instance.draggable(nodeId, {
        containment: false,
        ignoreZoom: true,
        stop: function(e: any) {
          let left = e.pos[0],
            top = e.pos[1];
          const time = new Date().getTime();
          const newNodes = _self.nodes.map(it =>
            it.id === item.id
              ? {
                  ...it,
                  x: left,
                  y: top,
                  lDropTime: it.dropTime,
                  dropTime: time,
                }
              : { ...it, lDropTime: it.dropTime, dropTime: time }
          );
          _self.change && _self.change(newNodes, 'nodes');
          setCanvasSize(newNodes);
        },
      });
      this._setEndpointsById(nodeId, item.type, item.outputs, 0);
      this._setEndpointsById(nodeId, item.type, item.inputs, 1);
    });
  },
  _setEndpointsById: function(
    nodeId: string,
    itemType: number,
    points: Array<object>,
    type: number
  ) {
    let length = (points && points.length) || 0;
    if (length > 0) {
      let start = 0;
      let num = parseFloat((1 / (length + 1)).toFixed(2));

      points.forEach((item: any, index: number) => {
        start += num;
        const uuId = `${nodeId}_${item.id}_${type}_${index}`;
        let endPoint = this.instance.addEndpoint(
          nodeId,
          type === 0
            ? this.config(itemType).sourceEndpoint
            : this.config(itemType).targetEndpoint,
          {
            anchor:
              type === 0
                ? [1, start, 0, 1, 2.2, 0]
                : [0, start, 0, -1, -2.2, 0],
            dropOptions: {
              drop: function(e, ui) {},
            },
            uuid: uuId,
            overlays: [
              [
                'Label',
                {
                  location: type === 0 ? [7.0, 2.6] : [-5.0, 2.6],
                  label: `<div class='l'></div><em>${item.name}<br/>(${item.type})</em>`,
                  cssClass:
                    type === 0 ? 'endpointSourceLabel' : 'endpointTargetLabel',
                  id: 'pLabel',
                },
              ],
            ],
            parameters:
              type === 0
                ? {
                    sourceuuid: uuId,
                    sourcename: item.name,
                    sourcetype: item.type,
                  }
                : {
                    targetuuid: uuId,
                    targetname: item.name,
                    targettype: item.type,
                  },
            events: {
              mouseover: function() {
                endPoint.showOverlay('pLabel');
              },
              mouseout: function() {
                endPoint.hideOverlay('pLabel');
              },
            },
          }
        );
      });
    }
  },
  _connect: function() {
    const _self = this;
    let newNumber = 0;
    const newConnections: Array<any> = [];
    const findItem = ite =>
      `${this.config(ite.type).nodeName}_${ite.id}_${ite.lDropTime}`;
    this.connections.map(item => {
      let source = item.source;
      let target = item.target;
      let sourceUUId = item.connectPoints.sourceuuid;
      let targetUUId = item.connectPoints.targetuuid;
      let ite = { ...item };

      const sourceNode = this.nodes.find(ite => findItem(ite) === item.source);
      const targetNode = this.nodes.find(ite => findItem(ite) === item.target);

      if (sourceNode) {
        const arr = sourceUUId.split('_');
        source = `${arr[0]}_${arr[1]}_${sourceNode.dropTime}`;
        sourceUUId = `${source}_${arr[3]}_${arr[4]}_${arr[5]}`;
        ite.source = source;
        ite.connectPoints.sourceuuid = sourceUUId;
      }

      if (targetNode) {
        const arr = targetUUId.split('_');
        target = `${arr[0]}_${arr[1]}_${targetNode.dropTime}`;
        targetUUId = `${target}_${arr[3]}_${arr[4]}_${arr[5]}`;
        ite.target = target;
        ite.connectPoints.targetuuid = targetUUId;
      }

      if (sourceNode || targetNode) {
        newNumber++;
      }

      newConnections.push(ite);

      const connect = this.instance.connect({
        uuids: [sourceUUId, targetUUId],
        source: source,
        target: target,
      });

      connect.bind('mouseover', function(connection, originalEvent) {
        connect.showOverlay('customOverlay');
      });
      connect.bind('mouseout', function(connection, originalEvent) {
        connect.hideOverlay('customOverlay');
      });
      connect.getOverlay('customOverlay').bind('click', function(e) {
        const con = e.component;
        const params = con.getParameters();
        const cons = _self.connections.filter(
          item =>
            item.source !== con.sourceId &&
            item.target !== con.targetId &&
            item.connectPoints.sourceuuid !== params.sourceuuid &&
            item.connectPoints.targetuuid !== params.targetuuid
        );
        _self.change(cons, 'connections');
      });
    });
    if (newNumber > 0) {
      _self.change && _self.change(newConnections, 'connections');
    }
  },
  _handleAddConnection: function(
    connection: any,
    _self: any,
    originalEvent: any
  ) {
    const check = _self._getConnectAuth(connection);

    if (!originalEvent) {
      return;
    }
    if (check) {
      const con = {
        source: connection.sourceId,
        target: connection.targetId,
        connectPoints: connection.getParameters(),
      };
      _self.change && _self.change([..._self.connections, con], 'connections');
    }
  },
  _getConnectAuth: function(connection: any) {
    const checkType = (sType: string, tType: string) => {
      return sType !== tType && sType !== 'any' && tType !== 'any';
    };
    const params: any = connection.getParameters();
    let check = true;
    if (connection.sourceId === connection.targetId) {
      this.instance.deleteConnection(connection);
      this.errorMessages.connection.error(2);
      check = false;
    }

    if (checkType(params.sourcetype, params.targettype)) {
      this.instance.deleteConnection(connection);
      this.errorMessages.connection.error(1);
      check = false;
    }

    return check;
  },
  show: function() {
    const _self = this;
    _self.instance.reset();
    _self.instance.repaintEverything();
    _self._addEndpoints();
    _self._connect();

    _self.instance.bind(
      'connection',
      ({ connection }: any, originalEvent: any) =>
        _self._handleAddConnection(connection, _self, originalEvent)
    );
  },
};

const setCanvasSize = nodes => {
  const el: HTMLElement | null = document.getElementById('designCanvas');
  const mainEl: HTMLElement | null = document.getElementById('canvas');
  const nowW = (el && el.offsetWidth) || 0;
  const nowH = (el && el.offsetHeight) || 0;
  const mainW = (mainEl && mainEl.offsetWidth) || 0;
  const mainH = (mainEl && mainEl.offsetHeight) || 0;
  let maxX = 0;
  let maxY = 0;
  nodes.map(item => {
    if (item.x > maxX) {
      maxX = item.x;
    }
    if (item.y > maxY) {
      maxY = item.y;
    }
  });
  if (el) {
    el.style.width =
      maxX + 200 > nowW
        ? maxX + 300 + 'px'
        : maxX + 200 < mainW
        ? ''
        : nowW + 'px';
    el.style.height =
      maxY + 60 > nowH
        ? maxY + 120 + 'px'
        : maxY + 60 < mainH
        ? ''
        : nowH + 'px';
  }
};
