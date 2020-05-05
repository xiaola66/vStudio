import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import Title from '../components/Title';
import GridTable from 'components/GridTable';

import { Scrollbars } from 'react-custom-scrollbars';
import { FormattedMessage, injectIntl } from 'react-intl';
import { withStyles, Grid, Button } from '@material-ui/core';

import messages from '../messages';
import HelpArea from '../components/HelpArea';
import GetRender from '../components/getRender';

const style = theme => ({
  drawer: {
    paddingBottom: 60,
    background: '#FFFFFF',
  },
  body: {
    height: 450,
    // paddingRight: 50,
    paddingBottom: 60,
  },
  tab: {
    height: 50,
    minHeight: 50,
    paddingLeft: 28,
    // paddingRight: 50,
    background: '#FFFFFF',
  },
  tabTitleBox: {
    height: 50,
  },
  settingLabel: {
    marginLeft: 20,
  },
  content: {
    width: 1140,
    paddingRight: 60,
  },
  labelItemContent: {
    width: '100%',
    height: 400,
    paddingBottom: 30,
  },
  dataPreviewBottom: {
    width: 50,
    height: 0,
    borderBottom: '1px solid #FFAA21',
  },
  settingBottom: {
    width: 50,
    height: 0,
    marginLeft: 75,
    borderBottom: '1px solid #FFAA21',
  },
  showAllDataButton: {
    marginLeft: 10,
  },
  help: {
    overflow: 'hidden',
    width: 580,
    height: 740,
  },
  commonButton: {},
  paperAnchorBottom: {},
});

function Data(props: any) {
  const {
    classes,
    data,
    handleDetailShow,
    handleSaveAttributes,
    intl: { formatMessage, locale },
  } = props;

  const [saveButtonDisabled, setSaveButtonDisabled] = useState(false);
  const [newConfig, setNewConfig] = useState<any>();
  const [newConfigCopy, setNewConfigCopy] = useState<any>(data.attributes);
  const [isDataPreview, setIsDataPreview] = useState(true);

  useEffect(() => {
    const locale = 'zh';
    const config = data.attributes.map(item => {
      const required = item.label[locale].includes('*');
      const fillIn = formatMessage(messages.otherPages.label);
      const errorMessage = item.label[locale].replace('*', '').trim();
      return {
        ...item,
        required,
        value: '',
        errorTestShow: false,
        errorText: `${fillIn}${errorMessage}`,
      };
    });
    setNewConfig(config);
  }, [data]);

  const handleDataPreview = () => {
    setIsDataPreview(true);
  };

  const handleSetting = () => {
    setIsDataPreview(false);
  };

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
    <Grid className={classNames(classes.drawer)}>
      <Title title={data.name} handleDetailShow={handleDetailShow} />
      <Grid container wrap="nowrap" className={classes.body}>
        <Grid item xs className={classes.content}>
          <Grid
            container
            justify="space-between"
            alignItems="center"
            className={classes.tab}
          >
            <Grid>
              <Grid
                container
                direction="column"
                justify="space-between"
                className={classes.tabTitleBox}
              >
                <Grid></Grid>
                <Grid container>
                  <Grid onClick={handleDataPreview}>
                    <FormattedMessage {...messages.inputPage.title} />
                  </Grid>
                  <Grid
                    className={classes.settingLabel}
                    onClick={handleSetting}
                  >
                    {formatMessage(messages.otherPages.settingButton)}
                  </Grid>
                </Grid>
                <Grid
                  className={
                    isDataPreview
                      ? classes.dataPreviewBottom
                      : classes.settingBottom
                  }
                ></Grid>
              </Grid>
            </Grid>
            <Grid>
              {isDataPreview ? (
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.commonButton}
                  >
                    <FormattedMessage {...messages.inputPage.changeData} />
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    className={classNames(
                      classes.commonButton,
                      classes.showAllDataButton
                    )}
                  >
                    <FormattedMessage {...messages.inputPage.showAllData} />
                  </Button>
                </div>
              ) : (
                <Button
                  color="primary"
                  variant="contained"
                  disabled={saveButtonDisabled}
                  onClick={handleSave}
                  className={classes.commonButton}
                >
                  <FormattedMessage {...messages.otherPages.saveButton} />
                </Button>
              )}
            </Grid>
          </Grid>
          {isDataPreview && (
            <GridTable
              dataTitle={data.title}
              dataContent={data.content}
              description={data.description}
            />
          )}
          {!isDataPreview && (
            <Grid container wrap="nowrap">
              <Grid container className={classes.labelItemContent}>
                <Scrollbars
                  autoHide
                  autoHideTimeout={500}
                  autoHideDuration={200}
                >
                  <GetRender
                    data={newConfig}
                    handleSelectOpen={handleSelectOpen}
                    handleValue={handleValue}
                  />
                </Scrollbars>
              </Grid>
            </Grid>
          )}
        </Grid>
        {!isDataPreview && (
          <Grid className={classes.help}>
            <HelpArea mdFile={data.mdFile || 'Credits'} />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

export default withStyles(style as any)(injectIntl(Data));
