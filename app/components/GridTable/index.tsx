import React, { createRef, useState } from 'react';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import { Scrollbars } from 'react-custom-scrollbars';
import { withStyles } from '@material-ui/core/styles';
import { FormattedMessage, injectIntl } from 'react-intl';

import { Description } from 'components';
import messages from './messages';

const style = theme => ({
  root: {
    overflow: 'hidden',
    width: '100%',
    minWidth: '100%',
    height: '100%',
    color: 'rgba(51, 51, 51, 1)',
    fontWeight: 400,
    fontFamily: 'PingFang SC',
  },
  tableItem: {
    overflow: 'hidden',
    width: 180,
    minWidth: 180,
    maxWidth: 180,
    marginRight: 10,
    fontSize: '7px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    // borderBottom: '1px solid rgba(232,235,238,1)',
  },
  description: {
    overflow: 'hidden',
    width: 100,
    height: '100%',
  },
  describeTitleRow: {
    zIndex: 1,
    position: 'relative',
    fontSize: '14px',
    width: '100%',
    background: '#FFF9F2',
  },
  describeBodyRow: {
    width: '100%',
    background: 'rgba(255,255,255,1)',
    fontSize: '7px',
  },
  describeItem: {
    minWidth: 100,
    background: '#FFF9F2',
    borderBottom: '1px solid rgba(232,235,238,1)',
  },
  title: {
    width: '100%',
    background: '#FFF9F2',
  },
  titleRow: {
    width: '100%',
    height: 40,
    borderBottom: '1px solid rgba(232,235,238,1)',
  },
  titleItem: {
    background: '#FFF9F2',
    // borderBottom: '1px solid rgba(232,235,238,1)',
  },
  bodyRow: {
    width: '100%',
    height: 40,
    background: 'rgba(255,255,255,1)',
    borderBottom: '1px solid rgba(232,235,238,1)',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#F9F9F9',
    },
  },
  clickRow: {
    backgroundColor: '#F9F9F9',
  },
  bodyItem: {
    // background: 'rgba(255,255,255,1)',
    // borderBottom: '1px solid rgba(232,235,238,1)',
  },
});

function GridTable(props: DataPreview) {
  const {
    classes,
    description,
    dataTitle,
    dataContent,
    selectTable,
    handleSelectTable,
  } = props;

  const titleDom = createRef<HTMLDivElement>();
  const descibeBodyDom = createRef<HTMLDivElement>();
  const descibeTitleDom = createRef<HTMLDivElement>();

  const onScroll = e => {
    const { scrollTop } = e.target;
    if (typeof titleDom !== null && titleDom.current) {
      titleDom.current.style.transform = `translateY(${scrollTop}px)`;
    }
    if (typeof descibeBodyDom !== null && descibeBodyDom.current) {
      descibeBodyDom.current.style.transform = `translateY( -${scrollTop}px)`;
    }
  };

  const createTitleRow = (data, type) => {
    if (!data || !data[0] || !data[0][type]) {
      return null;
    }
    return (
      <Grid container item wrap="nowrap" className={classes.titleRow}>
        {data.map((rowItem, index) => {
          return (
            <Grid
              key={`${rowItem.id}-${index}-${type}`}
              container
              justify="center"
              alignItems="center"
              className={classNames(classes.tableItem, classes.titleItem)}
            >
              <Description value={rowItem[type]} />
            </Grid>
          );
        })}
      </Grid>
    );
  };

  return (
    <Grid container className={classes.root}>
      {description && (
        <Grid item className={classes.description}>
          <Grid
            container
            className={classes.describeTitleRow}
            ref={descibeTitleDom}
          >
            {description.map((element, index) => (
              <Grid
                key={`${element}-${index}`}
                container
                justify="center"
                alignItems="center"
                className={classNames(classes.titleRow, classes.describeItem)}
              >
                {element}
              </Grid>
            ))}
          </Grid>
          <Grid className={classes.describeBodyRow} ref={descibeBodyDom}>
            {dataContent &&
              dataContent.map((rowItem, index) => {
                let text =
                  index === 0 ? <FormattedMessage {...messages.text} /> : null;
                return (
                  <Grid
                    key={`${rowItem}-${index}-descibeBody`}
                    container
                    justify="center"
                    alignItems="center"
                    className={classNames(
                      classes.bodyRow,
                      classes.describeItem
                    )}
                  >
                    {text}
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
      )}
      <Grid item xs>
        <Scrollbars
          autoHide
          onScroll={onScroll}
          autoHideTimeout={500}
          autoHideDuration={200}
        >
          <Grid item xs>
            <Grid className={classes.title} ref={titleDom}>
              {createTitleRow(dataTitle, 'columnName')}
              {createTitleRow(dataTitle, 'columnUnit')}
              {createTitleRow(dataTitle, 'columnType')}
              {createTitleRow(dataTitle, 'columnCommmit')}
            </Grid>
            <Grid>
              {dataContent &&
                dataContent.map((row, index) => {
                  return (
                    <Grid
                      key={`${row.name}-${index}`}
                      container
                      wrap="nowrap"
                      onClick={() => {
                        handleSelectTable && handleSelectTable(row.name);
                      }}
                      className={
                        selectTable === row.name
                          ? classNames(classes.bodyRow, classes.clickRow)
                          : classNames(classes.bodyRow)
                      }
                    >
                      {dataTitle.map(columnItem => {
                        return (
                          <Grid
                            key={`${row.name}-${columnItem.id}`}
                            container
                            justify="center"
                            alignItems="center"
                            className={classNames(
                              classes.tableItem,
                              classes.bodyItem
                            )}
                          >
                            {row[columnItem.id]}
                          </Grid>
                        );
                      })}
                    </Grid>
                  );
                })}
            </Grid>
          </Grid>
        </Scrollbars>
      </Grid>
    </Grid>
  );
}

export default withStyles(style as any)(GridTable);
