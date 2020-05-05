import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import { Iconfont } from 'components';
import getInstance from 'utils/http';
import { put } from 'utils/request';
import { useKeycloak } from '@react-keycloak/web';
import { warnMessage } from 'components/Message';

const styles = theme => ({
  renameRoot: {
    // padding: '10px',

    // '& .MuiGrid-root': {
    //   height: 35,
    // },
    '& .MuiGrid-container': {
      height: 34,
    },
  },
  editIcon: {
    marginTop: 7,
    marginLeft: 10,
  },
  editIcon2: {
    marginLeft: 10,
  },
  renameName: {
    paddingTop: 7,
  },
  renameName2: {
    paddingTop: 0,
  },
  editNameIpt: {
    height: 20,
    lineHeight: '20px',
    border: 'none',
    borderRadius: 0,
    borderBottom: '1px #e0e0e0 solid',
    marginTop: 8,
    maxWidth: 160,
    width: '100%',
    fontSize: '13px',
    color: theme.color.main,
    '&:after': {
      border: 'none',
      borderRadius: 0,
      boxShadow: 'none',
    },
  },
  link: {
    textDecoration: 'none',
    color: '#FFA213',
  },
  Iconfont: {
    height: 30,
    paddingTop: -10,
    '& .text': {
      fontSize: '14px',
      // marginLeft: '4px',
    },
    '& .iconfont': {
      fontSize: '18px',
    },
  },
});

const Rename = ({
  name,
  classes,
  isRename = false,
  onChange,
  onEdit,
  linkPath,
  type,
  apiURL,
}: RenameProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(isRename);
  const [editName, setEditName] = useState<string>(name);
  const [newName, setNewName] = useState<string>(name);
  const keycloak: any | undefined = useKeycloak().keycloak;

  useEffect(() => {}, []);

  const onClickEdit = () => {
    setIsEdit(true);
    onEdit && onEdit(true);
  };

  const onChangeName = (evt: any) => {
    setEditName(evt.target.value);
  };

  const onSubmitEdit = async () => {
    const code: any = await put(keycloak.token, apiURL, {
      name: editName,
    });
    if (code) {
      setIsEdit(false);
      setNewName(editName);
      onChange(editName);
      onEdit && onEdit(false);
    } else {
      warnMessage('名称已存在');
    }
  };

  const onCancelEdit = () => {
    setIsEdit(false);
    setEditName(name);
    onEdit && onEdit(false);
  };
  // const query = {
  //   pathname: linkPath,
  //   data: linkData,
  // }
  return (
    <div className={classes.renameRoot}>
      {isEdit ? (
        <Grid container>
          <Grid item xs={8}>
            <Input
              className={classes.editNameIpt}
              value={editName}
              onChange={evt => {
                onChangeName(evt);
              }}
            />
          </Grid>
          <Grid
            className={type == 1 ? classes.editIcon : classes.editIcon2}
            item
          >
            <Iconfont
              iconClass={classes.Iconfont}
              icon="icon-carryout"
              onClick={() => {
                onSubmitEdit();
              }}
            />
          </Grid>
          <Grid
            className={type == 1 ? classes.editIcon : classes.editIcon2}
            item
          >
            <Iconfont
              iconClass={classes.Iconfont}
              icon="icon-Pending"
              onClick={() => {
                onCancelEdit();
              }}
            />
          </Grid>
        </Grid>
      ) : (
        <Grid container>
          <Grid
            item
            className={type == 1 ? classes.renameName : classes.renameName2}
          >
            {linkPath ? (
              <Link to={linkPath} className={classes.link}>
                {newName}
              </Link>
            ) : (
              newName
            )}
          </Grid>
          <Grid
            className={type == 1 ? classes.editIcon : classes.editIcon2}
            item
          >
            <Iconfont
              iconClass={classes.Iconfont}
              icon="icon-Inprogress"
              onClick={() => {
                onClickEdit();
              }}
            />
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default withStyles(styles)(Rename);
