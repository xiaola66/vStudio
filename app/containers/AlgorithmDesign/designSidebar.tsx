import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './designStyles';
import Tree from '../../components/Tree/index';
import { get, post } from 'utils/request';
import getInstance from 'utils/http';
import axios from 'axios';

const DesignSidebar = (props: any) => {
  const { classes, isCancelDrag, setIsCancelLeftDrag } = props;

  const [isDragItem, setIsDragItem] = useState<string | null>(null);
  const [unitData, setUnitData] = useState<any>([]);
  const [inputData, setInputData] = useState<any>([]);
  const [outputData, setOutputData] = useState<any>([]);
  const [searchValue, setSearchValue] = useState('');
  useEffect(() => {
    document.addEventListener('click', cacelDragItem);
    isCancelDrag && cacelDragItem();
  }, [isCancelDrag]);

  const cacelDragItem = () => {
    setIsDragItem(null);
  };

  useEffect(() => {
    axios.get('http://139.198.191.144/public/api/v4/unit').then(res => {
      setUnitData(res.data);
    });
    axios.get('http://139.198.191.144/public/api/v4/in').then(res => {
      setInputData(res.data);
    });
    axios.get('http://139.198.191.144/public/api/v4/out').then(res => {
      setOutputData(res.data);
    });
  }, []);

  // data list
  // type: 1: data item, 2: algorithm item 3 : output item
  function getList(item, type) {
    const unitList2 = item.map(d => {
      return d.category;
    });
    function getRepeatNum(nameList) {
      return nameList.reduce(function(prev, next) {
        prev[next] = prev[next] + 1 || 1;
        return prev;
      }, {});
    }
    let myObj = getRepeatNum(unitList2),
      winningList: any = [],
      id = 0;
    for (let i in myObj) {
      let obj = {
        id: id++,
        name: i,
        type: type,
        total: myObj[i],
      };
      winningList.push(obj);
    }
    return winningList;
  }

  const unit = inputData.concat(outputData, unitData);
  const [filterUnit, setFilterUnit] = useState([]);
  const [filterInput, setFilterInput] = useState([]);
  const [filterOutput, setFilterOutput] = useState([]);
  const unitList = getList(unitData, '2');
  const inputList = getList(inputData, '1');
  const outputList = getList(outputData, '3');
  const unitTitle = inputList.concat(unitList, outputList);

  const [filterData, setFilterData] = useState([]);
  const handleSearchChange = e => {
    setSearchValue(e);
    // if (e !== "") {
    //   let newList:any = inputData.filter(d =>
    //     d.name.includes(e)
    //   );
    //   setFilterData(newList);
  };

  // type: 1: data item, 2: algorithm item 3 : output item
  const formatData = data => {
    return data.map(item => {
      let type = 2;
      switch (item.type) {
        case 'input':
          type = 1;
          break;
        case 'output':
          type = 3;
          break;
        default:
          type = 2;
          break;
      }
      return { ...item, itemType: item.type, type };
    });
  };

  return (
    <div className={classes.designSidebar} id="leftItems">
      <div style={{ position: 'absolute', width: 200, top: 68 }}></div>
      <div style={{ position: 'absolute', width: 200, top: 300 }}>
        <Tree
          type="2"
          treeData={formatData(unit)}
          unitData={unitTitle}
          title="算子"
          isCancelDrag={isCancelDrag}
          setIsCancelLeftDrag={setIsCancelLeftDrag}
          handleSearchChange={handleSearchChange}
        />
      </div>
    </div>
  );
};

export default withStyles(styles as any)(DesignSidebar);
