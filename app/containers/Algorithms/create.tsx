import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { injectIntl, FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { VsDialog } from 'components';
import { isOverflowLength } from 'utils/utils';
import messages from './messages';
import { useKeycloak } from '@react-keycloak/web';
import { get, post } from 'utils/request';

const styles = withStyles({});

function Create(porps) {
  const {
    classes,
    projectSum,
    intl: { formatMessage },
  } = porps;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [importOpen,setImportOpen] = useState(false);
  const [data, setData] = useState({
    name: '',
    description: '',
  });
  const [nameExists, setNameExists] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
    setImportOpen(false);
    setNameExists(false);
  };

  const handleOpenAlgorithm = () => {
    setAnchorEl(null);
    setOpen(true);
  };

  const handleImportAlgorithm = () => {
    setAnchorEl(null);
    setImportOpen(true);
  };

  const checkName = () => {
    //检查算法名称是否已存在
    setNameExists(true);
  };

  const keycloak: any | undefined = useKeycloak().keycloak;

  const handleSubmitCreate = async () => {
    const createData: any = await post(
      keycloak.token,
      '/api/workbench/modules/design',
      {
        description: data.description,
        name: data.name,
        projectId: "5eb0ccce57314e099e942e16",
        uiConfig: {},
      },
    );  
    // console.log(createData,56789)  
  };

  const handleSubmitImport = async () => {
    // import algorithm api
  };

  const handleChange = (value, param) => {
    setData({
      ...data,
      [param]: value,
    });
  };

  const nameOver = isOverflowLength(data.name, 15);
  const desOver = isOverflowLength(data.description, 50);

  const content = [
    {
      id: 'name',
      type: 'input',
      label: formatMessage(messages.create.name),
      value: data.name,
      placeholder: formatMessage(messages.create.placeholder.name),
      error: nameExists
        ? formatMessage(messages.create.existing)
        : formatMessage({ id: 'error.beyond' }, { number: 15 }),
      isError: nameExists || nameOver,
      isRequired: true,
      onChange: handleChange,
    },
    {
      id: 'description',
      type: 'textarea',
      label: formatMessage(messages.columns.description),
      value: data.description,
      placeholder: formatMessage(messages.create.placeholder.des),
      error: formatMessage({ id: 'error.beyond' }, { number: 50 }),
      isError: desOver,
      isRequired: false,
      onChange: handleChange,
    },
  ];

  return (
    <div>
      <Button
        onClick={handleClick}
        color="primary"
        variant="contained"
        startIcon={<AddIcon />}
      >
        {formatMessage(messages.create.menuButton.add)}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItem
          onClick={() => {
            handleOpenAlgorithm();
          }}
        >
          {formatMessage(messages.create.menuButton.newAlgorithm)}
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleImportAlgorithm();
          }}
        >
          {formatMessage(messages.create.menuButton.importAlgorithm)}
        </MenuItem>
        {projectSum > 0 ? (
          <MenuItem
            onClick={() => {
              handleClose();
            }}
          >
            {formatMessage(messages.create.menuButton.newTask)}
          </MenuItem>
        ) : null}
      </Menu>
      <VsDialog
        open={open}
        onCancel={handleClose}
        title={formatMessage(messages.create.title)}
        content={content}
        onSubmit={handleSubmitCreate}
        formatMessage={formatMessage}
      />
       <VsDialog
        open={importOpen}
        onCancel={handleClose}
        title={formatMessage(messages.import.title)}
        content={content}
        onSubmit={handleSubmitImport}
        formatMessage={formatMessage}
      />
    </div>
  );
}
export default styles(injectIntl(Create));
