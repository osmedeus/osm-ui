import React, { Component } from 'react';
import axios from 'axios';
import {
  Button,
  Form,
  FormGroup,
  TextInput,
  InlineNotification,
  ComposedModal,
  ModalFooter,
  Grid,
  Column
} from '@carbon/react';

import { Login, Settings } from '@carbon/icons-react';
import { inject, observer } from 'mobx-react';
import RedirectPage from './RedirectPage'

class LoginPage extends Component {
  state = {
    // isLogged: this.props.sessStore.isLogged,
    isLogged: false,
    error: false,
    isSubmitted: false,
    isOpenURL: false,
  };

  componentDidMount() {
    const jwt = window.localStorage.getItem('jwt');
    if (jwt) {
      this.props.axiosStore.setJWT(jwt);
      this.props.sessStore.setisLogged();
      console.log(this.props.sessStore.isLogged);
      this.setState({ isLogged: this.props.sessStore.isLogged });
    }
  }

  handleLogin(username, password) {
    let json_body = JSON.stringify({
      username: username,
      password: password,
    });

    let token = '';
    const url = this.props.axiosStore.url + '/api/login';
    console.log("url --> ", url)
    console.log("json_body", json_body)


    axios
      .post(url, json_body, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        if (response.data.hasOwnProperty('token')) {
          token = response.data.token;
          this.props.axiosStore.setJWT(token);
          this.props.sessStore.setisLogged();

          this.setState({ isLogged: this.props.sessStore.isLogged });
          window.location = '/ui/index.html';
          this.setState({ error: false });

        } else {
          this.setState({ error: true });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
      if (token == '') {
          this.setState({ error: true });
      }
  }

  openURL = () => this.setState({ isOpenURL: true });
  closeURL = () => this.setState({ isOpenURL: false });

  render() {
    const additionalProps = {
      className: 'some-class',
      onSubmit: e => {
        e.preventDefault();
        const username = this.refs.username.value;
        const password = this.refs.password.value;
        this.handleLogin(username, password);
      },
    };

    const error = this.state.error;
    const isLogged = this.state.isLogged;
    const isOpenURL = this.state.isOpenURL;
    let invalidNoti = null;
    let noti = (
      <InlineNotification
        kind="info"
        lowContrast={true}
        subtitle="Your Credentials default is store in ~/.osmedeus/config.yaml"
      />
    );

    if (error && isLogged === false) {
      invalidNoti = (
        <InlineNotification
          kind="warning"
          lowContrast={false}
          title="Invalid Credentials"
          iconDescription="describes the close button"
        />
      );
    }
    
    if (isLogged) {
      invalidNoti = (
        <InlineNotification
          kind="success"
          lowContrast={false}
          title="Login success"
          iconDescription="describes the close button"
        />
      );
    }

    console.log('isLogged --> ', isLogged);
    console.log(this.state);
    if (!this.state.isLogged) {
      return (

        <Grid className="repo-page" fullWidth >
        <Column lg={6}  md={3} sm={4} className="repo-page__r1">

                <br />
                <div className="bx--row landing-page__tab-content">
                  <div className="bx--col-md-8 bx--col-lg-7">
                    <ComposedModal
                      open={isOpenURL}
                      handleSubmit={data => console.log(data)}
                      onClose={() => this.closeURL()}
                      danger={true}>

                      {/* <URLForm /> */}

                      <ModalFooter
                        primaryButtonText="Cancel"
                        primaryButtonDisabled={false}
                        onRequestClose={() => this.closeURL()}
                        onRequestSubmit={() => this.closeURL()}
                      />
                    </ComposedModal>

                    <h1 className="landing-page__heading">Login Page </h1>
                    <p className="landing-page__p">
                      Find out how to login &nbsp;
                      <a href="https://docs.osmedeus.org/installation/web-ui/">
                        here.
                      </a>
                    </p>
                    
                    {noti}

                    {invalidNoti}
                    <Form {...additionalProps}>
                      <FormGroup
                        className="some-class"
                        legendText="Username">
                        <TextInput
                          type="text"
                          name="username"
                          ref="username"
                          defaultValue="osmedeus"
                        />
                      </FormGroup>

                      <FormGroup
                        className="some-class"
                        legendText="Password">
                        <TextInput
                          type="password"
                          name="password"
                          ref="password"
                        />
                      </FormGroup>

                      <br />

                      <Button
                        renderIcon={Login}
                        value=""
                        // onClick={() => this.submitHandler()}
                        type="submit"
                        kind="secondary">
                        Login
                      </Button>

                      {/* <Button
                        renderIcon={Settings}
                        value=""
                        onClick={() => this.openURL()}
                        kind="tertiary">
                        Remote URL
                      </Button> */}
                    </Form>
                  </div>
                  </div>

</Column>
                  <Column lg={10} md={5} sm={4} center className="repo-page__r1">

                    <img
                      className="landing-page__illo"
                      src={`${process.env.PUBLIC_URL}/static/osm-cli.png`}
                      alt="Carbon illustration"
                    />
      </Column>
      </Grid>
      );
    } else {
      if (this.props.children) {
        return this.props.children;
      } else {
        return <RedirectPage />;
      }
    }
  }
}

export default inject('sessStore', 'axiosStore')(observer(LoginPage));
