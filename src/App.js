import React, { Component } from 'react';
import './app.scss';
import { Content, Theme } from '@carbon/react';
import TopBar from './components/TopBar/TopBar';
import { Switch } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

// pages
import HomePage from './content/LandingPage/HomePage';
import WorkspacesPage from './content/Workspaces/WorkspacesPage';
import SingleWorkspace from './content/SingleWorkspace/SingleWorkspace';
import ProcessPage from './content/Utilities/ProcessPage';
import ExecutePage from './content/Utilities/ExecutePage';
import DeletePage from './content/Utilities/DeletePage';
import LoginPage from './content/Utilities/LoginPage';
import PrivateRoute from './content/Utilities/PrivateRoute';

class App extends Component {
  render() {
    return (
      <>
        <Theme theme="g100">
          <TopBar />
        </Theme>
        <Content>
          <Switch>
            <PrivateRoute exact path="/" component={HomePage} />
            <PrivateRoute exact path="/workspaces" component={WorkspacesPage} />
            <PrivateRoute exact path="/workspace/:wsname" component={SingleWorkspace} />
            <PrivateRoute exact path="/ps" component={ProcessPage} />
            <PrivateRoute exact path="/execute" component={ExecutePage} />
            <PrivateRoute exact path="/delete" component={DeletePage} />
            <PrivateRoute exact path="/login" component={LoginPage} />
          </Switch>
        </Content>
      </>
    );
  }
}

export default inject('sessStore', 'axiosStore')(observer(App));
