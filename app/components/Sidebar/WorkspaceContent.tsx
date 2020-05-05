import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useKeycloak } from '@react-keycloak/web';
import { injectIntl, FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Iconfont, Description, VsDialog, Confirm } from 'components';
import { setCurrentWorkspaceAction } from 'logic/workspace/action';
import { isOverflowLength } from 'utils/utils';
import getInstance from 'utils/http';
import messages from './messages';
import styles from './sidebar-jss';

interface workspaceDataProps {
  id: string;
  name: string;
}

let count = 0;

function WorkspaceContent(props: any) {
  const {
    classes,
    currentWorkspace,
    setCurrentWorkspace,
    intl: { formatMessage },
  } = props;

  const [open, setOpen] = useState<boolean>(false);
  const [createOpen, setCreateOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [workspaceData, setWorkspaceData] = useState<Array<workspaceDataProps>>(
    []
  );
  const [workspaceNameExists, setWorkspaceNameExiists] = useState<boolean>(
    false
  );
  const [createData, setCreateData] = useState<{ name: string }>({ name: '' });
  const [isRenameItem, setIsRenameItem] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [rename, setRename] = useState<string>('');

  const keycloak: any | undefined = useKeycloak().keycloak;

  useEffect(() => {
    if (!currentWorkspace) {
      getWorkspaces();
    }
  }, [keycloak.token]);

  const handleClose = () => {
    setOpen(false);
    setRename('');
    setIsRenameItem(null);
  };

  const getWorkspaces = async (id?: string) => {
    const wdata: any = await getInstance(keycloak.token).get(
      '/api/workbench/workspaces'
    );
    const data = (wdata && wdata.elements) || [];
    setWorkspaceData(data);
    if (!id) {
      setCurrentWorkspace(data[0]);
    }
  };

  const handleChange = item => {
    count += 1;
    setTimeout(() => {
      if (count === 1) {
        // on click
        setCurrentWorkspace(item);
        setOpen(false);
        setAnchorEl(null);
      } else if (count === 2) {
        // on double click
        setIsRenameItem(item);
        setRename(item.name);
      }
      count = 0;
    }, 300);
  };

  const handelToggleWorkspaceMenus = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setAnchorEl(open ? null : event.currentTarget);
    setOpen(!open);
  };

  const handleCreate = () => {
    setCreateOpen(true);
    setOpen(false);
    setCreateData({ name: '' });
  };

  const onCancelCreate = () => {
    setCreateOpen(false);
  };

  const handleChangeName = (value, param) => {
    setCreateData({
      ...createData,
      [param]: value,
    });
  };

  const handleSubmitCreate = async () => {
    const wdata: any = await getInstance(keycloak.token).post(
      '/api/workbench/workspaces',
      createData
    );
    setCurrentWorkspace(wdata);
    getWorkspaces(wdata && wdata.id);
  };

  const handleChangeRename = event => {
    event.preventDefault();
    setRename(event.target.value);
  };

  const handlekKeypress = async e => {
    if (e.which !== 13) return;
    const wdata: any = await getInstance(keycloak.token).put(
      `/api/workbench/workspaces/${currentWorkspace.id}`,
      {
        name: rename,
      }
    );
    setIsRenameItem(null);
    setRename('');
    getWorkspaces();
  };

  const handleDelete = () => {
    Confirm(
      `${formatMessage(messages.workspace.delete.confirm.title)} ${
        currentWorkspace.name
      } ?`,
      `<span>
        ${formatMessage(messages.workspace.delete.confirm.text01)}
        <br />
        ${formatMessage(messages.workspace.delete.confirm.text02)}
      </span>`,
      () => {
        onDelete();
      }
      // formatMessage,
    );
  };

  const onDelete = async () => {
    const wdata: any = await getInstance(keycloak.token).delete(
      `api/workbench/workspaces/${currentWorkspace.id}`
    );
    getWorkspaces();
  };

  const workspaceNameOver = isOverflowLength(createData.name, 15);
  const createWorspaceContent = [
    {
      id: 'name',
      type: 'input',
      label: formatMessage(messages.workspace.save.name),
      value: createData.name,
      placeholder: formatMessage(messages.workspace.placeholder.title),
      error: workspaceNameExists
        ? formatMessage(messages.workspace.error.save.isExist)
        : formatMessage({ id: 'error.beyond' }, { number: 15 }),
      isError: workspaceNameExists || workspaceNameOver,
      isRequired: true,
      onChange: handleChangeName,
    },
  ];

  return (
    <div className={classes.workspaceMenus}>
      <span className={classes.wspIcon}>
        <Iconfont icon="icon-Taskqueue" />
      </span>
      <span className={classes.wspCurName}>
        <Description
          value={currentWorkspace ? currentWorkspace.name : ''}
          length={12}
        />
      </span>
      <span
        className={classes.wspMenuIcon}
        onClick={handelToggleWorkspaceMenus}
        aria-controls="workspace-menu"
      >
        {open ? (
          <Iconfont icon="icon-sortup" />
        ) : (
          <Iconfont icon="icon-sortdown" />
        )}
      </span>
      <Menu
        id="workspace-menu"
        keepMounted
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        classes={{ paper: classes.wspMenuPaper, list: classes.wspMenuList }}
      >
        <Button
          key="workspace-create-btn"
          variant="contained"
          color="primary"
          startIcon={<Iconfont icon="icon-Addto" />}
          className={classes.wspCreateBtn}
          onClick={handleCreate}
          classes={{
            label: classes.wspCreateBtnLabel,
            startIcon: classes.wspCreateBtnStartIcon,
          }}
        >
          <FormattedMessage {...messages.workspace.create} />
        </Button>
        {workspaceData.map((item, index) => (
          <div
            key={`workspace-${index}-${item.id}`}
            className={classes.wspListItem}
          >
            {isRenameItem && isRenameItem.id === item.id ? (
              <TextField
                placeholder={formatMessage(
                  messages.workspace.placeholder.rename
                )}
                className={classes.wspRenameInpt}
                onChange={handleChangeRename}
                onKeyPress={handlekKeypress}
                value={rename}
              />
            ) : (
              <div
                className={classes.wspName}
                onClick={() => {
                  handleChange(item);
                }}
              >
                <Description value={item.name} length={16} />
              </div>
            )}
          </div>
        ))}
      </Menu>
      <VsDialog
        open={createOpen}
        className={classes.wspCreateDialog}
        onCancel={onCancelCreate}
        title={formatMessage(messages.workspace.create)}
        content={createWorspaceContent}
        onSubmit={handleSubmitCreate}
        formatMessage={formatMessage}
      />
      <Button
        key="workspace-delete-btn"
        variant="contained"
        color="primary"
        startIcon={<Iconfont icon="icon-delete" />}
        className={classes.wspDeleteBtn}
        onClick={handleDelete}
        classes={{
          label: classes.wspCreateBtnLabel,
          startIcon: classes.wspCreateBtnStartIcon,
        }}
      >
        <FormattedMessage {...messages.workspace.delete.btnText} />
      </Button>
    </div>
  );
}

const mapStateToProps = state => ({
  currentWorkspace: state.workspace.currentWorkspace,
});

const mapDispatchToProps = dispatch => ({
  setCurrentWorkspace: workspace =>
    dispatch(setCurrentWorkspaceAction(workspace)),
});

const WorkspaceContentMaped = connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkspaceContent);

export default withStyles(styles as any)(injectIntl(WorkspaceContentMaped));
