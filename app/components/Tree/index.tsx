import React, { useState, useEffect } from 'react';
import '../../public/iconfont/iconfont.css';
import { withStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Grid } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DragBox from '../../containers/AlgorithmDesign/components/dragBox';
import { Scrollbars } from 'react-custom-scrollbars';
import Tooltip from '@material-ui/core/Tooltip';
import iconJson from './iconJson';
import styles from './tree-jss';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ClearIcon from '@material-ui/icons/Clear';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Zoom from '@material-ui/core/Zoom';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

const LightTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    paddingTop: 0,
    left: -10,
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 12,
  },
  arrow: {
    color: theme.palette.common.white,
  },
}))(Tooltip);

function Tree(props: TProps) {
  const {
    classes,
    treeData,
    unitData,
    title,
    isCancelDrag,
    setIsCancelLeftDrag,
    // scrollHeight=200,
    handleSearchChange,
  } = props;
  const [open, setOpen] = useState<string[]>([]);
  const [openTitle, setOpenTitle] = useState(true);
  const [scrollTop, setScrollTop] = useState(0);
  const [isDragItem, setIsDragItem] = useState<string | null>(null);
  const [data, setData] = useState<any>([]);
  const [dataCategory, setDataCategory] = useState<any>([]);
  const onOpen = value => {
    // const currentIndex = open.indexOf(value.id);
    const currentIndex = open.indexOf(value);
    const newOpen = [...open];
    if (currentIndex === -1) {
      newOpen.push(value);
    } else {
      newOpen.splice(currentIndex, 1);
    }
    setOpen(newOpen);
  };
  useEffect(() => {
    setData(treeData);
  }, [treeData]);
  useEffect(() => {
    setDataCategory(unitData);
  }, [unitData]);

  useEffect(() => {
    document.addEventListener('click', cacelDragItem);
    isCancelDrag && cacelDragItem();
  }, [isCancelDrag]);
  const cacelDragItem = () => {
    setIsDragItem(null);
  };
  /** search */

  const [searchValue, setSearchValue] = useState<any>('');
  const handleSearchClear = () => {
    handleSearch('');
  };
  const handleSearch = e => {
    handleSearchChange(e);
    setSearchValue(e);
  };

  const getIcons = (key: string) => {
    for (const i in iconJson) {
      if (i == key) {
        return iconJson[i];
      }
    }
    return 'null';
  };

  const onScroll = (e: any) => {
    setScrollTop(e.target.scrollTop);
  };
  const [value, setValue] = React.useState<any | null>(null);

  const handleClose = () => {
    setChecked(prev => !prev);
    handleSearch('');
  };
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked(prev => !prev);
  };

  const unitRender: any = [
    <div>
      <List>
        <ListItem className={classes.title}>
          <ListItemText
            primary={title}
            classes={{ primary: classes.titleFont }}
          />
          {/* <ListItemIcon className={classes.icon} onClick={handleChange}>
            <SearchIcon color="action"/>
          </ListItemIcon>
          <ListItemIcon className={classes.icon} >
              <ArrowDropDownIcon />
          </ListItemIcon> */}
        </ListItem>
        <Zoom
          in={checked}
          style={{
            position: 'fixed',
            marginTop: -30,
            zIndex: checked ? 1 : -1,
            backgroundColor: '#FED795',
          }}
        >
          <Paper className={classes.search} hidden={true}>
            <IconButton size="small" onClick={handleClose}>
              <ArrowBackIcon color="action" className={classes.CancelIcon} />
            </IconButton>
            <Paper className={classes.searchRoot}>
              <InputBase
                value={searchValue}
                placeholder="Search…"
                startAdornment={<SearchIcon color="action" />}
                endAdornment={
                  searchValue !== '' ? (
                    <IconButton size="small" onClick={handleSearchClear}>
                      <ClearIcon
                        fontSize="inherit"
                        className={classes.CancelIcon}
                      />
                    </IconButton>
                  ) : null
                }
                onChange={event => {
                  handleSearch(event.target.value);
                }}
              />
            </Paper>
          </Paper>
        </Zoom>
        <Scrollbars
          autoHide
          autoHideTimeout={500}
          autoHideDuration={200}
          style={{
            height: !openTitle
              ? 0
              : dataCategory.length > 6
              ? 500
              : dataCategory.length * 46,
          }}
          onScroll={onScroll}
        >
          <Collapse in={openTitle}>
            {dataCategory.map((unit, index) => (
              <List>
                <LightTooltip
                  title={
                    unit.type == '1'
                      ? 'input'
                      : unit.type == '3'
                      ? 'output'
                      : unit.name
                  }
                  placement="right"
                >
                  <ListItem
                    onClick={() => {
                      onOpen(index);
                    }}
                    className={classes.root}
                    button
                  >
                    <ListItemIcon className={classes.icon}>
                      <Icon
                        className={'iconfont ' + getIcons(unit.name)}
                      ></Icon>
                    </ListItemIcon>
                    <ListItemText
                      primary={unit.name}
                      classes={{ primary: classes.typeNameFont }}
                    />
                    <Grid style={{ width: 40 }}>
                      <ListItemText
                        primary={`(${unit.total})`}
                        classes={{ primary: classes.totalFont }}
                      />
                    </Grid>
                    {open.indexOf(index) > -1 ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                </LightTooltip>
                <Collapse in={open.indexOf(index) > -1}>
                  {data.map((tree, sindex) => {
                    return (
                      <div>
                        {tree.category == unit.name &&
                        tree.type == unit.type ? (
                          <div>
                            <LightTooltip
                              title={tree.name}
                              placement="right"
                              arrow
                              enterDelay={700}
                            >
                              <ListItem
                                key={`item-${sindex}`}
                                className={classes.name}
                                // button
                              >
                                <div className={classes.designSidebarItem}>
                                  <DragBox
                                    name={tree.displayName}
                                    data={tree}
                                    dragItem={isDragItem}
                                    setDragItem={setIsDragItem}
                                    setIsCancelLeftDrag={setIsCancelLeftDrag}
                                    scrollTop={scrollTop}
                                  />
                                </div>
                              </ListItem>
                            </LightTooltip>
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </Collapse>
                {index == 2 || index == 12 ? (
                  <Divider style={{ paddingTop: 10, marginTop: 10 }} />
                ) : null}
              </List>
            ))}
          </Collapse>
        </Scrollbars>
      </List>
    </div>,
  ];
  const dataRender: any = [
    <div>
      <List>
        <ListItem className={classes.title}>
          <ListItemText
            primary={title}
            classes={{ primary: classes.titleFont }}
          />
          {/* <ListItemIcon className={classes.icon} onClick={handleChange}>
            <SearchIcon color="action"/>
          </ListItemIcon>
          <ListItemIcon className={classes.icon} >
              <ArrowDropDownIcon />
          </ListItemIcon> */}
        </ListItem>
        <Zoom
          in={checked}
          style={{
            position: 'fixed',
            marginTop: -30,
            zIndex: checked ? 1 : -1,
            backgroundColor: '#FED795',
          }}
        >
          <Paper className={classes.search} hidden={true}>
            <IconButton size="small" onClick={handleClose}>
              <ArrowBackIcon color="action" className={classes.CancelIcon} />
            </IconButton>
            <Paper className={classes.searchRoot}>
              <InputBase
                value={searchValue}
                placeholder="Search…"
                startAdornment={<SearchIcon color="action" />}
                endAdornment={
                  searchValue !== '' ? (
                    <IconButton size="small" onClick={handleSearchClear}>
                      <ClearIcon
                        fontSize="inherit"
                        className={classes.CancelIcon}
                      />
                    </IconButton>
                  ) : null
                }
                onChange={event => {
                  handleSearch(event.target.value);
                }}
              />
            </Paper>
          </Paper>
        </Zoom>
      </List>
    </div>,
  ];
  return unitRender;
}

export default withStyles(styles as any)(Tree);
