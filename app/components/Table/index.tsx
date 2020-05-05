/*
 * @Author: Ren jieyun
 * @Date:   2020-02-19 13:55:41
 * @Last Modified by: jieyun ren
 * @Last Modified time: 2020-04-29 14:10:36
 */
import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from 'react';
import classNames from 'classnames';
import isNull from 'lodash-es/isNull';
import { Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { withStyles, Theme } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import MenuItem from '@material-ui/core/MenuItem';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Pagination } from 'config';
import { Description, Rename, Iconfont } from 'components';
import styles from './tableStyle-jss';
import PaginationComponent from 'components/Pagination';
import { injectIntl } from 'react-intl';
import Tooltip from '@material-ui/core/Tooltip';
import { get, post, del, put } from '../../utils/request';
import { formatDate } from '../../utils/utils';

import Collapse from '@material-ui/core/Collapse';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const LightTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    marginTop: -8,
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
    maxWidth: 'none',
  },
  arrow: {
    color: theme.palette.common.white,
  },
}))(Tooltip);

import getInstance from 'utils/http';
import { useKeycloak } from '@react-keycloak/web';
import Search from 'components/Search/index';

function BasicTable(props: BasicTabelProps) {
  const {
    classes,
    title,
    data,
    columnData,
    foldData,
    foldColumnData,
    foldColumnData2,
    emptyText,
    page = Pagination,
    caption,
    type = 1,
    setting,
    onChange,
    getScrollData,
    key = 'table list',
    scrollHeight = 200,
    foldScrollHeight = 200,
    tooltip,
    apiURL = '',
    intl: { formatMessage },
    handleSearchChange,
  } = props;

  const [listData, setListData] = useState<any>([{}]);
  const [listColumn, setListColumn] = useState<any>([{}]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState<null | number>(null);
  const [hover, setHover] = useState<null | number>(null);
  const [editItem, setEditItem] = useState<null | number>(null);
  const [isLoad, setIsLoad] = useState(false);
  const keycloak: any | undefined = useKeycloak().keycloak;

  const [fold, setFold] = useState<string[]>([]);
  const handleClickFold = value => {
    const currentIndex = fold.indexOf(value.id);
    const newOpen = [...fold];
    if (currentIndex === -1) {
      newOpen.push(value.id);
    } else {
      newOpen.splice(currentIndex, 1);
    }
    setFold(newOpen);
  };
  /** search */

  // const [searchValue, setSearchValue] = useState<any>('');
  // const handleSearchClear =() =>{
  //   handleSearchChange && handleSearch('');
  // }
  // const handleSearch = (e) =>{
  //   handleSearchChange && handleSearchChange(e);
  //   setSearchValue(e)
  // }

  useEffect(() => {
    setListData(data);
  }, [data]);
  useEffect(() => {
    setListColumn(columnData);
  }, [columnData]);

  const handleChangePage = (pageIndex: number, pageSize: number) => {
    onChange && onChange({ pageIndex, pageSize });
  };

  const handleClickMenu = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setOpen(index);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(null);
  };

  const onChangeName = (name: string, index: number) => {
    let newData: any = [...listData];
    newData[index].name = name;
    setListData(listData);
    setHover(null);
  };

  const onRename = (isEdit: boolean, index: number) => {
    setEditItem(isEdit ? index : null);
  };

  const onScroll = (e: any) => {
    if (e.target.scrollHeight - e.target.scrollTop === scrollHeight) {
      const newData: any = getScrollData && getScrollData();
      if (newData && newData.length !== 0) {
        newData.then(res => setListData(listData.concat(res)));
      } else {
        setIsLoad(true);
      }
    }
  };
  //status: 0 出错, 1 完成, 2 执行中, 3 待执行
  const statusData = [
    {
      icon: 'icon-error',
      text: formatMessage({ id: 'common.status.error' }),
    },
    {
      icon: 'icon-carryout',
      text: formatMessage({ id: 'common.status.carryout' }),
    },
    {
      icon: 'icon-Inprogress',
      text: formatMessage({ id: 'common.status.inprogress' }),
    },
    {
      icon: 'icon-Pending',
      text: formatMessage({ id: 'common.status.pending' }),
    },
  ];

  const renderCell = (
    dataArray: Array<object>,
    columnArray: Array<object>,
    dataIndex: number
  ) =>
    columnArray.map((itemCell: any, index: number) => (
      <TableCell
        align={itemCell.align ? itemCell.align : 'left'}
        key={`tablecell-${index}-${dataIndex}`}
        style={{ width: itemCell.width || 100 }}
      >
        {itemCell.render
          ? itemCell.render(dataArray[itemCell.id], dataArray)
          : itemCell.type
          ? columnRender(itemCell, dataArray[itemCell.id], dataArray, dataIndex)
          : dataArray[itemCell.id]}
      </TableCell>
    ));

  const columnRender = (
    column: any,
    value: any,
    rowItem: any,
    index: any,
    length?: any
  ) => {
    let columnH = value;
    if (column.type) {
      switch (column.type) {
        case 'description':
          columnH = <Description value={value} />;
          break;
        case 'time':
          // columnH = <span>{formatDate(value.substring(0,value.length-5))}</span>;
          columnH = <span>{value}</span>;
          break;
        case 'name':
          columnH =
            hover === index && (type === 1 || type === 3) ? (
              <Rename
                apiURL={apiURL.concat(rowItem.id)}
                name={value}
                type={type}
                onChange={name => {
                  onChangeName(name, index);
                }}
                isRename={editItem === index}
                onEdit={isEdit => onRename(isEdit, index)}
                linkPath={
                  column.link
                    ? `${column.link}/${rowItem[column.linkParam]}`
                    : undefined
                }
              />
            ) : column.link ? (
              <span className={classes.link}>{value}</span>
            ) : (
              value
            );
          break;
        case 'status':
          columnH = (
            <div className={classNames(classes[`statusType${value}`])}>
              <Iconfont
                iconClass={classes.iconFont}
                icon={value && statusData[value].icon}
                text={value && statusData[value].text}
              />
            </div>
          );
          break;
        case 'total':
          columnH = `${value} ${formatMessage({ id: 'common.number' })}`;
          break;
        case 'fold':
          columnH = (
            <IconButton
              aria-label="more"
              aria-controls={`tabele-fold-${index}`}
              aria-haspopup="true"
              onClick={() => handleClickFold(rowItem)}
            >
              {fold.indexOf(rowItem.id) > -1 ? (
                <KeyboardArrowDownIcon />
              ) : (
                <KeyboardArrowRightIcon />
              )}
            </IconButton>
          );
          break;
        case 'fold2':
          columnH =
            length > 1 ? (
              <IconButton
                aria-label="more"
                aria-controls={`tabele-fold-${index}`}
                aria-haspopup="true"
                onClick={() => handleClickFold(rowItem)}
              >
                {fold.indexOf(rowItem.id) > -1 ? (
                  <KeyboardArrowDownIcon />
                ) : (
                  <KeyboardArrowRightIcon />
                )}
              </IconButton>
            ) : null;
          break;
        case 'null':
          columnH = '';
          break;
        case 'operations':
          columnH =
            // hover === index && type === 1 ? (
            hover === index ? (
              <div className={classes.operateColumn}>
                <IconButton
                  aria-label="more"
                  aria-controls={`tabele-operations-menu-${index}`}
                  aria-haspopup="true"
                  onClick={(event: React.MouseEvent<HTMLElement>) =>
                    handleClickMenu(event, index)
                  }
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id={`tabele-operations-menu-${index}`}
                  anchorEl={anchorEl}
                  keepMounted
                  open={open === index}
                  onClose={handleClose}
                  PaperProps={{
                    style: {
                      width: 200,
                    },
                  }}
                >
                  {column.operations(rowItem).map((operate, oIndex) => (
                    <MenuItem
                      key={`operate-${index}-${oIndex}`}
                      onClick={() => {
                        operate.onClick && operate.onClick();
                        handleClose();
                      }}
                    >
                      {operate.name}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            ) : (
              <div className={classes.operateColumn}></div>
            );
          break;
        default:
          columnH = column.link ? (
            <Link
              to={`${column.link}/${rowItem[column.linkParam]}`}
              className={classes.link}
            >
              {value}
            </Link>
          ) : (
            value
          );
          break;
      }
    }
    return columnH;
  };

  const tableRender = [
    <Table className={classNames(classes.table)} key={key}>
      <TableHead>
        <TableRow className={classes.tableHead} key={`${key}-row`}>
          {listColumn.map((column: any, idx) => (
            <TableCell
              key={column.id}
              align={column.align ? column.align : 'left'}
              style={{ width: column.width || 100 }}
            >
              {column.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {listData.map((n: any, index) => (
          <TableRow
            tabIndex={-1}
            key={`${key}-${index}-body-row`}
            onMouseOver={() => {
              isNull(editItem) && setHover(index);
            }}
            onMouseLeave={() => {
              isNull(editItem) && setHover(null);
            }}
          >
            {renderCell(n, listColumn, index)}
          </TableRow>
        ))}
        {listData.length === 0 && (
          // <TableRow style={{ height: 49, textAlign: 'center' }}>
          //   <TableCell key="cell-empty" colSpan={listColumn.length}>
          <TableRow>
            <TableCell key="cell-empty" colSpan={listColumn.length}>
              {emptyText}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>,
  ];

  const hasPageTitleTable: any = type => (
    <div>
      <Paper className={classes.rootTableTitle} elevation={1}>
        <div className={classes.title}>
          <span className={classes.titleText}>{title}</span>
        </div>
        <Grid container className={classes.tableTopPaper}>
          <Grid item xs={8}>
            {caption}
          </Grid>
          <Grid item className={classes.settings} xs={4}>
            {setting}
          </Grid>
        </Grid>
        {/* <div style={{paddingTop:10}}>
          <Search 
            placeholder="common.status.error"
            value={searchValue}
            handleChange={e => handleSearch(e.target.value)}
            handleClear={handleSearchClear}
          />
        </div> */}
        {tableRender}
      </Paper>
      <div>
        {listData && listData.length > 0 && (
          <PaginationComponent
            pageIndex={page.pageIndex}
            pageSize={page.pageSize}
            count={page.total}
            onChange={handleChangePage}
          />
        )}
      </div>
    </div>
  );

  const waterfallRender: any = (
    <div
      className={type === 0 ? classes.taskListTable : classes.waterfallTable}
      key={key}
    >
      <Grid
        container
        className={type === 0 ? classes.taskListHead : classes.waterfallHead}
        key={`${key}-row`}
      >
        {listColumn.map((column: any, idx) => (
          <Grid
            item
            className={classNames(
              type === 0 ? classes.taskListItem : classes.waterfallGridItem,
              column.align ? classes[`${column.align}`] : ''
            )}
            key={column.id}
            xs={column.xs}
          >
            {column.label}
          </Grid>
        ))}
      </Grid>
      {listData && listData.length === 0 ? (
        <div className={type === 0 ? classes.empty : null}>{emptyText}</div>
      ) : (
        <Scrollbars
          autoHide
          autoHideTimeout={500}
          autoHideDuration={200}
          style={{ height: scrollHeight }}
          onScroll={onScroll}
        >
          <div>
            {listData &&
              listData.length > 0 &&
              listData.map((nData: any, index) => (
                <Grid>
                  {tooltip ? (
                    <LightTooltip
                      title={tooltip}
                      placement="bottom"
                      arrow
                      enterDelay={500}
                    >
                      <Grid
                        container
                        key={`${key}-${index}-body-row`}
                        className={classes.waterfallGrid}
                        onMouseOver={() => {
                          isNull(editItem) && setHover(index);
                        }}
                        onMouseLeave={() => {
                          isNull(editItem) && setHover(null);
                        }}
                      >
                        {listColumn.map((itemCell: any, cIndex: number) => (
                          <Grid
                            item
                            className={classNames(
                              type === 0
                                ? classes.taskListGridItem
                                : classes.waterfallGridItem,
                              itemCell.align ? classes[`${itemCell.align}`] : ''
                            )}
                            key={`tablecell-${cIndex}-${index}`}
                            xs={itemCell.xs}
                          >
                            {itemCell.render
                              ? itemCell.render(nData[itemCell.id], nData)
                              : itemCell.type
                              ? columnRender(
                                  itemCell,
                                  nData[itemCell.id],
                                  nData,
                                  index
                                )
                              : nData[itemCell.id]}
                          </Grid>
                        ))}
                      </Grid>
                    </LightTooltip>
                  ) : (
                    <Grid
                      container
                      key={`${key}-${index}-body-row`}
                      className={classes.waterfallGrid}
                      onMouseOver={() => {
                        isNull(editItem) && setHover(index);
                      }}
                      onMouseLeave={() => {
                        isNull(editItem) && setHover(null);
                      }}
                    >
                      {listColumn.map((itemCell: any, cIndex: number) => (
                        <Grid
                          item
                          className={classNames(
                            type === 0
                              ? classes.taskListGridItem
                              : classes.waterfallGridItem,
                            itemCell.align ? classes[`${itemCell.align}`] : ''
                          )}
                          key={`tablecell-${cIndex}-${index}`}
                          xs={itemCell.xs}
                        >
                          {itemCell.render
                            ? itemCell.render(nData[itemCell.id], nData)
                            : itemCell.type
                            ? columnRender(
                                itemCell,
                                nData[itemCell.id],
                                nData,
                                index
                              )
                            : nData[itemCell.id]}
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </Grid>
              ))}
            {isLoad ? (
              <p className={classes.load}>
                {formatMessage({ id: 'common.loaded' })}
              </p>
            ) : null}
          </div>
        </Scrollbars>
      )}
    </div>
  );
  const foldColumnRender = (item: any) => (
    <Grid
      container
      className={type === 0 ? classes.taskListHead : classes.foldHead}
      key={`${key}-row`}
    >
      {item.map((column: any, idx) => (
        <Grid
          item
          className={classNames(
            type === 0 ? classes.taskListItem : classes.waterfallGridItem,
            column.align ? classes[`${column.align}`] : ''
          )}
          key={column.id}
          xs={column.xs}
        >
          {column.label}
        </Grid>
      ))}
    </Grid>
  );

  const foldRender: any = (
    <div
      className={type === 0 ? classes.taskListTable : classes.waterfallTable}
      key={key}
    >
      {/* {columnData && foldColumnRender(columnData)} */}
      <Grid
        container
        className={type === 0 ? classes.taskListHead : classes.waterfallHead}
        key={`${key}-row`}
      >
        {columnData &&
          columnData.map((column: any, idx) => (
            <Grid
              item
              className={classNames(
                type === 0 ? classes.taskListItem : classes.waterfallGridItem,
                column.align ? classes[`${column.align}`] : ''
              )}
              key={column.id}
              xs={column.xs}
            >
              {column.label}
            </Grid>
          ))}
      </Grid>
      {listData && listData.length === 0 ? (
        <div className={type === 0 ? classes.empty : null}>{emptyText}</div>
      ) : (
        <Scrollbars
          autoHide
          autoHideTimeout={500}
          autoHideDuration={200}
          style={{ height: scrollHeight }}
          onScroll={onScroll}
        >
          <div>
            {listData &&
              listData.length > 0 &&
              listData.map((nData: any, index) => (
                <Grid>
                  <Grid
                    container
                    key={`${key}-${index}-body-row`}
                    className={classes.waterfallGrid}
                    onMouseOver={() => {
                      isNull(editItem) && setHover(index);
                    }}
                    onMouseLeave={() => {
                      isNull(editItem) && setHover(null);
                    }}
                  >
                    {columnData.map((itemCell: any, cIndex: number) => (
                      <Grid
                        item
                        className={classNames(
                          type === 0
                            ? classes.taskListGridItem
                            : classes.waterfallGridItem,
                          itemCell.align ? classes[`${itemCell.align}`] : ''
                        )}
                        key={`tablecell-${cIndex}-${index}`}
                        xs={itemCell.xs}
                      >
                        {itemCell.render
                          ? itemCell.render(nData[itemCell.id], nData)
                          : itemCell.type
                          ? columnRender(
                              itemCell,
                              nData[itemCell.id],
                              nData,
                              index
                            )
                          : nData[itemCell.id]}
                      </Grid>
                    ))}
                  </Grid>
                  <Collapse in={fold.indexOf(nData.id) > -1}>
                    {foldColumnData && foldColumnRender(foldColumnData)}
                    {listData.length === 0 ? (
                      <div className={type === 0 ? classes.empty : null}>
                        {emptyText}
                      </div>
                    ) : (
                      <Scrollbars
                        autoHide
                        autoHideTimeout={500}
                        autoHideDuration={200}
                        style={{ height: foldScrollHeight }}
                        onScroll={onScroll}
                        className={classes.fold}
                      >
                        <div>
                          {foldData &&
                            foldData.map((tData: any, index2: any) => (
                              <Grid>
                                {tData.parentId == nData.id ? (
                                  <Grid>
                                    <Grid
                                      container
                                      key={`${key}-${index}-body-row`}
                                      className={classes.waterfallGrid}
                                      onMouseOver={() => {
                                        isNull(editItem) && setHover(index);
                                      }}
                                      onMouseLeave={() => {
                                        isNull(editItem) && setHover(null);
                                      }}
                                    >
                                      {foldColumnData &&
                                        foldColumnData.map(
                                          (itemCell: any, cIndex: number) => {
                                            const fData =
                                              tData.listData &&
                                              tData.listData.length !== 0
                                                ? {
                                                    ...tData.listData[0],
                                                    ...tData,
                                                  }
                                                : tData;
                                            return (
                                              <Grid
                                                item
                                                className={classNames(
                                                  type === 0
                                                    ? classes.taskListGridItem
                                                    : classes.waterfallGridItem,
                                                  itemCell.align
                                                    ? classes[
                                                        `${itemCell.align}`
                                                      ]
                                                    : ''
                                                )}
                                                key={`tablecell-${cIndex}-${index}`}
                                                xs={itemCell.xs}
                                              >
                                                {itemCell.render
                                                  ? itemCell.render(
                                                      fData[itemCell.id],
                                                      fData
                                                    )
                                                  : itemCell.type
                                                  ? columnRender(
                                                      itemCell,
                                                      fData[itemCell.id],
                                                      fData,
                                                      index,
                                                      tData.listData.length
                                                    )
                                                  : fData[itemCell.id]}
                                              </Grid>
                                            );
                                          }
                                        )}
                                    </Grid>
                                    <Collapse in={fold.indexOf(tData.id) > -1}>
                                      {tData.listData
                                        .filter((item, idx) => idx !== 0)
                                        .map((sData: any, ssindex: any) => (
                                          <Grid
                                            container
                                            key={`${key}-${ssindex}-body-row`}
                                            className={classes.waterfallGrid}
                                            onMouseOver={() => {
                                              isNull(editItem) &&
                                                setHover(ssindex);
                                            }}
                                            onMouseLeave={() => {
                                              isNull(editItem) &&
                                                setHover(null);
                                            }}
                                          >
                                            {foldColumnData2 &&
                                              foldColumnData2.map(
                                                (
                                                  itemCell: any,
                                                  cIndex: number
                                                ) => (
                                                  <Grid
                                                    item
                                                    className={classNames(
                                                      type === 0
                                                        ? classes.taskListGridItem
                                                        : classes.waterfallGridItem,
                                                      itemCell.align
                                                        ? classes[
                                                            `${itemCell.align}`
                                                          ]
                                                        : ''
                                                    )}
                                                    key={`tablecell-${cIndex}-${index}`}
                                                    xs={itemCell.xs}
                                                  >
                                                    {itemCell.render
                                                      ? itemCell.render(
                                                          sData[itemCell.id],
                                                          sData
                                                        )
                                                      : itemCell.type
                                                      ? columnRender(
                                                          itemCell,
                                                          sData[itemCell.id],
                                                          sData,
                                                          index
                                                        )
                                                      : sData[itemCell.id]}
                                                  </Grid>
                                                )
                                              )}
                                          </Grid>
                                        ))}
                                    </Collapse>
                                  </Grid>
                                ) : null}
                              </Grid>
                            ))}
                          {/* {isLoad ? (
                            <p className={classes.load}>
                              {formatMessage({ id: 'common.loaded' })}
                            </p>
                          ) : null} */}
                        </div>
                      </Scrollbars>
                    )}
                  </Collapse>
                </Grid>
              ))}
            {isLoad ? (
              <p className={classes.load}>
                {formatMessage({ id: 'common.loaded' })}
              </p>
            ) : null}
          </div>
        </Scrollbars>
      )}
    </div>
  );

  const basicTableRender = () => {
    switch (type) {
      case 1:
        return hasPageTitleTable(1);
      case 2:
        return tableRender;
      case 3:
        return waterfallRender;
      case 4:
        return hasPageTitleTable(4);
      default:
        return foldRender;
    }
  };

  return basicTableRender();
}
let BasicTableRef = forwardRef(BasicTable);
export default withStyles(styles as any)(injectIntl(BasicTableRef));
