import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { VsDialog } from 'components';
import { isOverflowLength } from 'utils/utils';
import messages from '../messages';
// import '../../Projects/create.css';

const saveAsDialog = ({
  open = false,
  onCancel,
  onSaveAs,
  intl: { formatMessage },
}) => {
  const [data, setData] = useState({
    name: '',
    description: '',
  });

  const [nameExists, setNameExists] = useState<boolean>(false);

  const checkName = () => {
    // check name is exist
    setNameExists(true);
  };
  const handleSubmit = () => {
    //post api
    onSaveAs();
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
      label: formatMessage(messages.save.name),
      value: data.name,
      placeholder: formatMessage(messages.placeholder.title),
      error: nameExists
        ? formatMessage(messages.error.save.isExist)
        : formatMessage({ id: 'error.beyond' }, { number: 15 }),
      isError: nameExists || nameOver,
      isRequired: true,
      onChange: handleChange,
    },
    {
      id: 'description',
      type: 'textarea',
      label: formatMessage(messages.save.des),
      value: data.description,
      placeholder: formatMessage(messages.placeholder.des),
      error: formatMessage({ id: 'error.beyond' }, { number: 50 }),
      isError: desOver,
      isRequired: false,
      onChange: handleChange,
    },
  ];

  return (
    <VsDialog
      open={open}
      onCancel={onCancel}
      title={formatMessage(messages.save.title)}
      content={content}
      onSubmit={handleSubmit}
      formatMessage={formatMessage}
    />
  );
};

export default injectIntl(saveAsDialog);
