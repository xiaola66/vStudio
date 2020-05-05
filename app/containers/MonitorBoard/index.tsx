import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { injectIntl, FormattedMessage } from 'react-intl';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import messages from './messages';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const styles = withStyles({
  title: {
    flex: '0 0 auto',
    fontSize: 16,
    color: '#333333',
    paddingTop: '10px',
    paddingBottom: '10px',
    paddingLeft: '10px',
    display: 'flex',
    alignItems: 'center',
  },
  select: {
    marginTop: '20px',
    marginLeft: '-54px',
  },
  selectTitle: {
    fontSize: 16,
    color: 'rgba(51,51,51,1)',
    textAlign: 'right',
    marginRight: '14px',
  },
});

const MonitorBoard = (props: any) => {
  const {
    classes,
    intl: { formatMessage },
  } = props;

  const [arithmetic, setArithmetic] = React.useState('');
  const handleChangeAriSelect = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setArithmetic(event.target.value as string);
  };

  const [versions, setVersions] = React.useState('');
  const handleChangeVerSelect = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setVersions(event.target.value as string);
  };

  const [topic, setTopic] = React.useState('');
  const handleChangeTopicSelect = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setTopic(event.target.value as string);
  };

  const [edgeDevice, setEdgeDevice] = React.useState('');
  const handleChangeEdSelect = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setEdgeDevice(event.target.value as string);
  };

  const selectList = [
    {
      title: formatMessage(messages.select.arithmetic),
      value: arithmetic,
      onChange: handleChangeAriSelect,
      selectDefault: formatMessage(messages.select.dataImport),
      selectItem: [
        {
          label: '数据导入1',
        },
        {
          label: '数据导入2',
        },
      ],
    },
    {
      title: formatMessage(messages.select.versions),
      value: versions,
      onChange: handleChangeVerSelect,
      selectDefault: '1.2.4',
      selectItem: [
        {
          label: '1.2.5',
        },
        {
          label: '2.1.1',
        },
      ],
    },
    {
      title: formatMessage(messages.select.topic),
      value: topic,
      onChange: handleChangeTopicSelect,
      selectDefault: formatMessage(messages.select.dataImport),
      selectItem: [{ label: '' }],
    },
    {
      title: formatMessage(messages.select.edgeDevice),
      value: edgeDevice,
      onChange: handleChangeEdSelect,
      selectDefault: formatMessage(messages.select.dataImport),
      selectItem: [{ label: '' }],
    },
  ];

  return (
    <div>
      <div className={classes.title}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Typography color="textPrimary">
            <FormattedMessage {...messages.title.workspaces} />
          </Typography>
          <Typography color="textPrimary">
            <FormattedMessage {...messages.title.MonitorBoard} />
          </Typography>
        </Breadcrumbs>
      </div>
      <div className={classes.select}>
        <Grid container>
          <Grid item xs={8}>
            <Grid container>
              {selectList.map((item, index) => (
                <React.Fragment>
                  <Grid item xs={3} key={index}>
                    <Grid container>
                      <Grid item xs={4} className={classes.selectTitle}>
                        {item.title}
                      </Grid>
                      <Grid item xs={7}>
                        <Select
                          value={item.value}
                          onChange={item.onChange}
                          displayEmpty
                        >
                          <MenuItem value="">
                            <em>{item.selectDefault}</em>
                          </MenuItem>
                          {item.selectItem.map((item, index) => (
                            <MenuItem value={index}>{item.label}</MenuItem>
                          ))}
                        </Select>
                      </Grid>
                    </Grid>
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default styles(injectIntl(MonitorBoard));
