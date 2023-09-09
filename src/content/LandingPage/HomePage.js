import React, { Component } from 'react';
import {
  Button,
  Grid,
  Column,
} from '@carbon/react';
import { Api, CurrencyDollar } from '@carbon/react/icons';
import { inject, observer } from 'mobx-react';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      isSubmitted: false,
      isOpenURL: false,
      detail_data: null,
      doc: 'https://docs.osmedeus.org/',
      version: 'v4',
      isOpenEdit: false,
      rawRows: null,
    };
  }

  componentDidMount() {
      let url = `${this.props.axiosStore.url}/api/osmp/health`;
      console.log(`sending GET request to ${url}`);
      this.props.axiosStore.instance.get(`${url}`)
        .then(response => {
          console.log("response.data.data -->", response.data)
          if (response.hasOwnProperty('data')) {
             this.setState({version: response.data.data.version});
          }
          console.log("this.state.version -->", this.state.version)
        })
  }



  render() {
  const osmVersion = this.state.version;
  return (
    <div>
    <Grid className="landing-page__r2" >
      <Column
        lg={6}
        md={6}
        sm={4}
        className="landing-page__tab-content">
      <h2 className="landing-page__subheading">What is Osmedeus?</h2>
        <p className="landing-page__p">
        Osmedeus is a Workflow Engine for Offensive Security that allows you to build and run a reconnaissance system on a wide range of targets, including domains, URLs, CIDRs, and GitHub repositories. <br />
        It was designed to establish a strong foundation and has the ability to adapt and function automatically in order to perform reconnaissance tasks.
        </p>
      <Button
        href="https://docs.osmedeus.org/donation/"
        onClick={() => window.open(`https://docs.osmedeus.org/donation/`)}
        renderIcon={CurrencyDollar}
        kind="primary">
        Donation
      </Button>
      
      <Button
    href="https://docs.osmedeus.org/"
    onClick={() => window.open(`https://docs.osmedeus.org/`)}
    renderIcon={Api}
    target="_blank"
    kind="secondary">
    Version {osmVersion}
    </Button>
      



      </Column>


      <Column lg={10} md={8} sm={4}>
        <img
          className="landing-page__illo"
          src={`${process.env.PUBLIC_URL}/static/osmedeus-architecture.png`}
          alt="Main Image"
        />
      </Column>
    </Grid>
    </div>
  );
  }}

// export default HomePage;
export default inject('sessStore', 'axiosStore')(observer(HomePage));
