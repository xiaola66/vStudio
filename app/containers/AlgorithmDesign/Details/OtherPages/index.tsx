import React, { useState, useEffect } from 'react';
import { Grid, Button, withStyles } from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';
import { FormattedMessage, injectIntl } from 'react-intl';

import messages from '../messages';
import Title from '../components/Title';
import HelpArea from '../components/HelpArea';
import GetRender from '../components/getRender';

const style = {
  root: {
    background: '#FFFFFF',
  },
  dialogRoot: {
    width: 480,
    height: 350,
    paddingLeft: 20,
  },
  body: {
    paddingLeft: 20,
    height: 460,
  },
  content: {
    width: 1140,
    paddingRight: 60,
  },
  tab: {
    height: 50,
    minHeight: 50,
  },
  tabTitle: {
    width: 50,
    height: 50,
    borderBottom: '1px solid #FFAA21',
  },
  labelItemContent: {
    width: '100%',
    height: 400,
    paddingBottom: 30,
  },
  filterText: {
    fontSize: 14,
  },
  aceFilterText: {
    marginTop: 30,
  },
  filterIcon: {
    color: '#FFAA21',
  },
  codeArea: {
    // height: 300,
    paddingTop: 30,
    paddingLeft: 10,
  },
  reactAce: {
    width: 1050,
    height: 160,
    paddingTop: 10,
    paddingRight: 30,
  },
  help: {
    overflow: 'hidden',
    width: 580,
    height: 740,
  },
  settingGroup: {
    paddingLeft: 10,
  },
  settingItem: {
    height: 45,
    paddingTop: 20,
    paddingLeft: 10,
  },
  textarea: {
    height: 90,
    maxHeight: 120,
    '& div': {
      '& textarea': {
        height: 60,
        marginLeft: 15,
      },
    },
  },
  errorText: {
    marginLeft: 20,
    fontSize: 14,
    color: '#DC143C',
  },
  outputIcon: {
    '& .iconfont': {
      fontSize: 18,
      marginLeft: 10,
    },
  },
  input: {
    width: 560,
    height: 25,
    marginLeft: 15,
  },
  select: {
    width: 207,
    height: 25,
    marginLeft: 13,
  },
  radioGroup: {
    height: 25,
  },
  radio: {
    height: 25,
    marginLeft: 6,
  },
  CompressedSelect: {
    width: 207,
    height: 25,
    marginLeft: 19,
  },
  nested: {
    paddingLeft: 40,
  },
  drawer: {},
  commonButton: {},
  paperAnchorBottom: {},
};

function Data(props: any) {
  const {
    classes,
    data,
    handleDetailShow,
    handleSaveAttributes,
    intl: { formatMessage },
  } = props;

  const [saveButtonDisabled, setSaveButtonDisabled] = useState(false);
  const [newConfig, setNewConfig] = useState<any>();
  const [newConfigCopy, setNewConfigCopy] = useState<any>(data.attributes);

  useEffect(() => {
    const config = data.attributes.map(item => {
      const fillIn = formatMessage(messages.otherPages.label);
      return item.type === 'select'
        ? {
            ...item,
            value: '',
            isOpen: false,
            errorTestShow: false,
            errorText: `${fillIn}${item.label}`,
          }
        : {
            ...item,
            value: '',
            errorTestShow: false,
            errorText: `${fillIn}${item.label}`,
          };
    });
    setNewConfig(config);
  }, [data]);

  const checkConfigChange = config => {
    const isChange = config.every((item, index) => {
      return item['value'] === newConfigCopy[index]['value'];
    });
    return isChange;
  };

  const handleSave = () => {
    const config = newConfig.map(item => {
      return item.required && item.value === ''
        ? { ...item, errorTestShow: true }
        : { ...item, errorTestShow: false };
    });
    setNewConfig(config);
    setNewConfigCopy(config);
    handleSaveAttributes(config);
    const unSafeValueLength = config
      .filter(item => item.required)
      .filter(item => item.errorTestShow).length;
    unSafeValueLength > 0
      ? setSaveButtonDisabled(false)
      : setSaveButtonDisabled(true);
  };

  const handleValue = (event, index) => {
    const value = typeof event === 'string' ? event : event.target.value;
    const config = newConfig.map((item, itemIndex) => {
      return index === itemIndex
        ? {
            ...item,
            value,
          }
        : item;
    });
    setNewConfig(config);
    checkConfigChange(config)
      ? setSaveButtonDisabled(true)
      : setSaveButtonDisabled(false);
  };

  const handleSelectOpen = (index, isOpen) => {
    const config = newConfig.map((item, itemIndex) => {
      return index === itemIndex ? { ...item, isOpen } : item;
    });
    setNewConfig(config);
  };

  return (
    <Grid className={classes.root}>
      <Title title={data.name} handleDetailShow={handleDetailShow} />
      <Grid container wrap="nowrap" className={classes.body}>
        <Grid item xs className={classes.content}>
          <Grid
            container
            justify="space-between"
            alignItems="center"
            className={classes.tab}
          >
            <Grid
              container
              justify="center"
              alignItems="center"
              className={classes.tabTitle}
            >
              <FormattedMessage {...messages.otherPages.settingButton} />
            </Grid>
            <Button
              color="primary"
              variant="contained"
              disabled={saveButtonDisabled}
              onClick={handleSave}
              className={classes.commonButton}
            >
              <FormattedMessage {...messages.otherPages.saveButton} />
            </Button>
          </Grid>
          <Grid container className={classes.labelItemContent}>
            <Scrollbars autoHide autoHideTimeout={500} autoHideDuration={200}>
              {newConfig && (
                <GetRender
                  data={newConfig}
                  handleSelectOpen={handleSelectOpen}
                  handleValue={handleValue}
                />
              )}
            </Scrollbars>
          </Grid>
        </Grid>
        <Grid className={classes.help}>
          <HelpArea mdFile={data.mdFile || 'Credits'} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default withStyles(style)(injectIntl(Data));
