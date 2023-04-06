import React, { Component } from 'react';

import {
  Loading,
} from '@carbon/react';

import { inject, observer } from 'mobx-react';

class RedirectPage extends Component {
  state = {
    isLogged: this.props.sessStore.isLogged,
    error: false,
    isSubmitted: false,
    isOpenURL: false,
  };

  componentDidMount() {
    console.log(this.props.axiosStore.url);
    setTimeout(function(){
      window.location.reload();
   }, 3000);
  }

  openURL = () => this.setState({ isOpenURL: true });
  closeURL = () => this.setState({ isOpenURL: false });

  render() {
    
    return (
      <p align="center">
        <Loading withOverlay={false} className="some-class" />
        <h1>Authenticate processing</h1>
      </p>
      
    );
    }

}

export default inject('sessStore', 'axiosStore')(observer(RedirectPage));
