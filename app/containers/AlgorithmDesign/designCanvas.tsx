import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import { Grid } from '@material-ui/core';
import { useDrop, useDrag } from 'react-dnd';
import { Scrollbars } from 'react-custom-scrollbars';
import { withStyles } from '@material-ui/core/styles';
import CanvasDragBox from './components/canvasDragBox';
import Detail from './Details';
import styles from './designStyles';

const DesignCanvas = (props: any) => {
  const { classes, onDrop, data, onDeleteItem, handleChange } = props;
  const scrollbarRef = useRef<any | null>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [detailShow, setDetailShow] = useState(false);
  const [selectElementType, setSelectElementType] = useState(1);
  const [selectElementData, setSelectElementData] = useState({
    id: '',
    dropTime: '',
  });

  useEffect(() => {
    const el: any = document.getElementById('mainCanvas');
    el.oncontextmenu = (oEvent: any) => {
      if (window.event) {
        oEvent = window.event;
        oEvent.returnValue = false;
      } else {
        oEvent.preventDefault();
      }
    };
  }, []);

  const onScroll = e => {
    const { scrollTop } = e.target;
    setScrollTop(scrollTop);
  };

  const handleDrop = (item: any, monitor: any) => {
    const position = monitor.getSourceClientOffset();
    position.y += scrollTop;
    let dropItem = { ...item.data };
    dropItem.dropTime = new Date().getTime();
    setSelectElementType(dropItem.type);
    // 获取接口数据
    setSelectElementData(dropItem);
    onDrop(dropItem, position);
    setDetailShow(true);
  };

  const [{}, drop] = useDrop({
    accept: 'dragBox',
    drop: handleDrop,
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const handleDetailShow = (isShow: boolean) => {
    setDetailShow(isShow);
  };

  const handleDetailData = (
    event: React.MouseEvent<HTMLDivElement>,
    isShow: boolean,
    type: number,
    selectElementData: any
  ) => {
    event.stopPropagation();
    setSelectElementType(type);
    setSelectElementData(selectElementData);
    setDetailShow(isShow);
  };

  const handleDetailItem = data => {
    setDetailShow(false);
    onDeleteItem(data);
  };

  const pauseEvent = e => {
    if (e.stopPropagation) e.stopPropagation();
    if (e.preventDefault) e.preventDefault();
    e.cancelBubble = true;
    e.returnValue = false;
    return false;
  };

  const mousedown = event => {
    pauseEvent(event);
    const target = event.target;
    const currClientX = event.clientX;
    const currClientY = event.clientY;
    const scrollTop = scrollbarRef && scrollbarRef.current.getScrollTop();
    const scrollLeft = scrollbarRef && scrollbarRef.current.getScrollLeft();
    if (event.button !== 0) {
      return;
    }
    document.onmousemove = function(event) {
      pauseEvent(event);
      const l = currClientX - event.clientX;
      const t = currClientY - event.clientY;
      const moveDiffX = Math.abs(l);
      const moveDiffY = Math.abs(t);
      if (l > 0) {
        // right move
        scrollbarRef && scrollbarRef.current.scrollLeft(scrollLeft + moveDiffX);
      }

      if (l < 0 && scrollLeft > 0) {
        // left move
        scrollbarRef && scrollbarRef.current.scrollLeft(scrollLeft - moveDiffX);
      }

      if (t > 0) {
        scrollbarRef && scrollbarRef.current.scrollTop(scrollTop + moveDiffY);
      }
      if (t < 0 && scrollTop > 0) {
        scrollbarRef && scrollbarRef.current.scrollTop(scrollTop - moveDiffY);
      }
    };
    target.onmouseup = function(e) {
      pauseEvent(e);
      document.onmousemove = null;
      target.onmouseup = null;
    };
  };

  const handleSaveAttributes = attributes => {
    let attr = attributes.map(item => {
      delete item.errorText;
      delete item.errorTestShow;
      return item;
    });
    let newItems = data.map(item =>
      item.id === selectElementData.id &&
      item.dropTime === selectElementData.dropTime
        ? { ...item, attributes: attr }
        : item,
    );
    handleChange(newItems, 'nodes');
  };

  return (
    <main className={classes.designContent} id="mainCanvas" ref={drop}>
      <Grid container wrap="wrap" className={classes.main}>
        <Grid
          container
          className={classes.dragBoxGroup}
          onClick={() => handleDetailShow(false)}
        >
          <div id="canvas" className={classes.main}>
            <Scrollbars
              //autoHide
              autoHideTimeout={500}
              autoHideDuration={200}
              onScroll={onScroll}
              ref={scrollbarRef}
            >
              <div
                id="designCanvas"
                className={classes.main}
                onMouseDown={e => mousedown(e)}
              >
                {data.map((item: any) => (
                  <CanvasDragBox
                    data={item}
                    key={`main-drag-${item.id}-${item.dropTime}`}
                    handleDetailData={handleDetailData}
                    handleDeleteItem={handleDetailItem}
                  />
                ))}
              </div>
            </Scrollbars>
          </div>
        </Grid>
        <Grid>
          {detailShow && (
            <Detail
              type={selectElementType}
              data={selectElementData}
              handleDetailShow={handleDetailShow}
              handleSaveAttributes={handleSaveAttributes}
            />
          )}
        </Grid>
      </Grid>
    </main>
  );
};

export default withStyles(styles as any)(DesignCanvas);
