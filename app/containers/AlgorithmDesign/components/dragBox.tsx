import React, { useState, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import ItemBox from './itemBox';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    marginLeft: 30,
    cursor: 'Pointer',
    '&:hover': {
      fontWeight: 800,
    },
  },
});

const DragBox = ({
  name,
  data,
  dragItem,
  setDragItem,
  setIsCancelLeftDrag,
  scrollTop,
}) => {
  const [{ isDragging }, drager] = useDrag({
    item: { name, type: 'dragBox', data },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const classes = useStyles();
  useEffect(() => {
    if (show) {
      setShow(false);
      setIsCancelLeftDrag(true);
    }
  }, [scrollTop]);
  const [show, setShow] = useState(false);
  const onClickItem = (e: React.MouseEvent<HTMLElement>) => {
    e.nativeEvent.stopImmediatePropagation();
    setDragItem(name);
    setIsCancelLeftDrag(false);
    setShow(true);
  };
  const handleDescripe = str => {
    if (str.length > 18) {
      const subStr1 = str.substr(0, 18);
      str = `${subStr1}...`;
    }
    return str;
  };

  return (
    <div>
      <div onClick={onClickItem} className={classes.root}>
        {handleDescripe(name)}
      </div>
      <div
        style={{
          zIndex: dragItem === name ? 1 : -1,
          position: 'fixed',
          marginTop: `-${scrollTop}px`,
          opacity: isDragging ? 0 : show ? 1 : 0,
        }}
        ref={drager}
      >
        <ItemBox data={data} />
      </div>
    </div>
  );
};

export default DragBox;
