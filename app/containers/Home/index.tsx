import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { useKeycloak } from '@react-keycloak/web';
import { KeycloakAdapter } from 'keycloak-js';
import axios from 'axios';
import getInstance from 'utils/http';
import { formatDate } from 'utils/utils';
import { get, del, put, post } from 'utils/request';

interface ServerResponse {
  data: Array<Project>;
}

interface Project {
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  userId: String;
  id: String;
}

const styles = (theme: any) => ({
  icon: {
    '& .iconfont': {
      fontSize: 28,
    },
    '& .text': {
      fontSize: 18,
    },
  },
});

const parseJwt = token => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

const Home = (props: any) => {
  useEffect(() => {
    //props.history.push('/app/data');
  });

  const keycloak: any | undefined = useKeycloak().keycloak;

  if (keycloak.authenticated) {
    console.log(parseJwt(keycloak.token));
    keycloak.loadUserInfo().then(info => console.log(info));
  }

  return (
    <div>
      {!keycloak.authenticated && (
        <button type="button" onClick={() => keycloak.login()}>
          Login
        </button>
      )}

      {keycloak.authenticated && (
        <button
          type="button"
          onClick={async () => {
            // const wdata: any = await axios.request({
            //   url: `${process.env.API_BASE}api/workbench/projects`,
            //   method: 'post',
            //   data:{
            //     name: "string7",
            //     description: "string",
            //   },
            //   headers: {
            //     'Content-Type': 'application/json',
            //     Authorization: `Bearer ${keycloak.token}`,
            //   },
            // }).then(res => console.log(res.status)).catch(err => {

            //   if (err.response) {
            //     console.log(err.response.status)
            //   }
            // })
            // const project: any = await get(keycloak.token,
            //   '/api/workbench/tunnels',
            //   // {dir:'desc', page: 2, size: '10', sort:'updatedAt',}
            //   // {
            //   //   name: "string",
            //   //   description: "string",
            //   //   projectId: "5ea8faefa7f1ba3d15d7c4d2",
            //   //   uiConfig: {name:'123'}
            //   // }
            //   )
            //   console.log(project, 'project');

            const wdata: any = await put(
              keycloak.token,
              // '/api/workbench/job',{projectId:'5e7bb6e454aa7255c260f46a',}
              // '/api/workbench/modules/release',{ name: "string", moduleId: "string"}
              // '/api/workbench/tunnels',{
              //   "name": "string",
              //   "QOS": 0,
              //   "autoReconnect": true,
              //   "password": "string",
              //   "serialFormat": "string",
              //   "serverCacheMessages": true,
              //   "testColumns": "string",
              //   "timeLimit": 0,
              //   "topic": "string",
              //   "uri": "string",
              //   "username": "string"
              // }
              '/api/workbench/projects/5ea2541e0c97f416d1ee7dca',
              { name: '121', description: 'string' }
              // {5e7bb6e454aa7255c260f46a
              // projectId/moduleId
              //   name: "string",
              //   connectionId: "string",
              //   connectorId: "string",
              //   description: "string"
              // }
            );
            console.log(wdata, 'projectList');

            // return;
            // axios
            //   .request<Array<Project>>({
            //     method: 'GET',
            //     url: `${process.env.API_BASE}api/workbench/projects`,
            //     transformResponse: (r: ServerResponse) => r,
            //     headers: {
            //       'Content-Type': 'application/json',
            //       Authorization: `Bearer ${keycloak.token}`,
            //     },
            //   })
            //   .then(response => {
            //     const { data, status } = response;

            //     switch (status) {
            //       case 200:
            //       // ok
            //       case 401:
            //       // invalid token
            //       case 400:
            //       // invalid parameter
            //       case 500:
            //       // server resource error: serer crash, db connection
            //       case 503:
            //       // server crash
            //     }
            //     const projects = JSON.parse(data);
            //     console.log(
            //       projects.map(d => `received project with id ${d.id}`),
            //     );
            //   });
          }}
        >
          axios
        </button>
      )}

      {keycloak.authenticated && (
        <button type="button" onClick={() => keycloak.logout()}>
          Logout
        </button>
      )}
    </div>
  );
};

export default withStyles(styles as any)(Home);
