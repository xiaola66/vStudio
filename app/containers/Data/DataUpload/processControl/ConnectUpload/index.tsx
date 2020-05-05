import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import GridTable from 'components/GridTable';
import { Input, Button } from '@material-ui/core';

const style = withStyles({
  content: {
    position: 'absolute',
    width: 710,
    height: 360,
    marginTop: '-25px',
    paddingLeft: 16,
  },
  searchBox: {
    width: 320,
    height: 34,
    marginBottom: 10,
    border: '1px solid rgba(226,227,230,1)',
    borderRadius: 4,
    '& button': {
      width: 60,
    },
  },
  crossLine: {
    width: 1,
    height: 33,
    background: 'rgba(226,227,230,1)',
  },
  search: {
    width: '100%',
    '& div': {
      border: 'none',
    },
  },
  tableBox: {
    overflow: 'hidden',
    width: 710,
    height: 300,
  },
});

function ConnectUpload(props: any) {
  const { classes, connectData, selectTable, handleSelectTable } = props;

  const [keyword, setKeyword] = useState('');
  const [connectDataTitle, setConnectDataTitle] = useState(
    connectData.title || []
  );
  const [connectDataContent, setConnectDataContent] = useState<any>(
    connectData.content || []
  );
  const [copyConnectDataContent, setCopyConnectDataContent] = useState<any>(
    connectData.content || []
  );
  // connectData.content || [],

  // useEffect(() => {
  //   setConnectDataContent(connectData.content);
  // }, []);
  // const connectDataTitle = connectData.title || [];
  // const connectDataContent = connectData.content || [];

  const hadleKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const filterConnectData = keyword => {
    if (keyword) {
      const filterData = connectDataContent.filter(item =>
        item.name.includes(keyword)
      );
      setConnectDataContent(filterData);
    } else {
      setConnectDataContent(copyConnectDataContent);
    }
  };

  return (
    <Grid className={classes.content}>
      <Grid container wrap="nowrap" className={classes.searchBox}>
        <Grid item className={classes.search}>
          <Input value={keyword} onChange={hadleKeyword} />
        </Grid>
        <Grid item>
          <Grid container wrap="nowrap">
            <Grid className={classes.crossLine}></Grid>
            <Button onClick={() => filterConnectData(keyword)}>search</Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid container className={classes.tableBox}>
        <GridTable
          selectTable={selectTable}
          dataTitle={connectDataTitle}
          dataContent={connectDataContent}
          handleSelectTable={handleSelectTable}
        />
      </Grid>
    </Grid>
  );
}

export default style(ConnectUpload);
