import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { VsDialog } from 'components';
import { isOverflowLength } from 'utils/utils';
import messages from './messages';
import axios from 'axios';
import { get, post } from 'utils/request';
import getInstance from 'utils/http';
import { useKeycloak } from '@react-keycloak/web';

const styles = withStyles({
  root: {
    margin: '0',
    width: '455px',
    height: '358px',
    background: 'rgba(255, 255, 255, 1)',
    boxShadow: '0px 2px 17px 1px rgba(29, 2, 1, 0.06)',
    borderRadius: '2px',
    maxWidth: '455px',
  },
  header: {
    width: '410px',
    fontSize: '16px',
    color: 'rgba(244, 173, 69, 1)',
    lineHeight: '30px',
    marginLeft: '28px',
    paddingTop: '14px',
    paddingBottom: '8px',
    borderBottom: '1px solid rgba(201,205,209,1)',
  },
  button: {
    width: '61px',
    height: '18px',
    background: 'rgba(255,162,19,1)',
    borderRadius: '3px',
    color: 'rgba(255,255,255,1)',
    pointerEvents: 'none',
  },
});
interface TCreate {
  handleSubmit: (value: any) => void;
  intl: { formatMessage };
}
function Create(props: any) {
  const {
    handleSubmit,
    intl: { formatMessage },
  } = props;

  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState({
    name: '',
    description: '',
  });
  const [nameExists, setNameExists] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (value, param) => {
    setData({
      ...data,
      [param]: value,
    });
  };

  const keycloak: any | undefined = useKeycloak().keycloak;
  const handleSubmitCreate = async () => {
    const createProject: any = await post(
      keycloak.token,
      '/api/workbench/projects',
      {
        description: data.description,
        name: data.name,
      }
    );
    handleSubmit(createProject);
  };

  const nameOver = isOverflowLength(data.name, 15);
  const desOver = isOverflowLength(data.description, 50);

  const content = [
    {
      id: 'name',
      type: 'input',
      label: formatMessage(messages.create.name),
      value: data.name,
      placeholder: formatMessage(messages.placeholder.name),
      error: nameExists
        ? formatMessage(messages.error.create.isExist)
        : formatMessage({ id: 'error.beyond' }, { number: 15 }),
      isError: nameExists || nameOver,
      isRequired: true,
      onChange: handleChange,
    },
    {
      id: 'description',
      type: 'textarea',
      label: formatMessage(messages.create.description),
      value: data.description,
      placeholder: formatMessage(messages.placeholder.description),
      error: formatMessage({ id: 'error.beyond' }, { number: 50 }),
      isError: desOver,
      isRequired: false,
      onChange: handleChange,
    },
  ];

  return (
    <div>
      <Button
        key="data-add-btn"
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
      >
        {formatMessage(messages.create.add)}
      </Button>
      <VsDialog
        open={open}
        onCancel={handleClose}
        title={formatMessage(messages.create.title)}
        content={content}
        onSubmit={handleSubmitCreate}
        formatMessage={formatMessage}
      />
    </div>
  );
}

export default styles(injectIntl(Create));
