import React, { Component } from 'react';
import { Breadcrumb, Loading, Button } from 'carbon-components-react';
import { Api20, Catalog20, CurrencyDollar20 } from '@carbon/icons-react';
import { Edit20, Search16, TrashCan20, Add24 } from '@carbon/icons-react';
import { inject, observer } from 'mobx-react';
import { Link, Redirect } from 'react-router-dom';

class LandingPage extends Component {
  state = {
    error: false,
    isSubmitted: false,
    isOpenURL: false,
    detail_data: null,
    doc: 'https://docs.osmedeus.org/',
    version: null,
    isOpenEdit: false,
    rawRows: null,
  };

  componentDidMount() {
    const pid = this.props.pid;
    this.getData(pid);
  }

  getData(pid) {
    let url = `/api/osmp/help`;
    let isError = true;
    this.props.axiosStore.instance
      .get(`${url}`)
      .then(response => {
        if (response.data.hasOwnProperty('data')) {
          this.setState({ doc: response.data.data.doc });
          this.setState({ version: response.data.data.version });
          isError = false;
        } else {
          this.setState({ error: true });
        }
      })
      .catch(error => this.setState({ error: true }));
  }

  render() {
    const doc = this.state.doc;
    const version = this.state.version;
    const error = this.state.error;
    let logoutComponent = null;

    let content = (
      <div className="bx--row landing-page__r2">
        <div className="bx--grid bx--grid--no-gutter bx--grid--full-width">
          <div className="bx--row landing-page__tab-content">
            <div className="bx--col-md-4 bx--col-lg-5">
              <div className="bx--col-md-4 bx--col-lg-12">
                <h2 className="landing-page__subheading">What is Osmedeus?</h2>
                <p className="landing-page__p">
                  Osmedeus - Fully automated offensive security framework for
                  reconnaissance and vulnerability scanning.
                </p>

                <Button
                  href={doc}
                  onClick={() => window.open(`${doc}`)}
                  renderIcon={Catalog20}
                  kind="secondary">
                  Documentions
                </Button>

                <Button
                  href="https://docs.osmedeus.org/"
                  onClick={() => window.open(`https://docs.osmedeus.org/`)}
                  renderIcon={Api20}
                  target="_blank"
                  kind="primary">
                  Version {version}
                </Button>
              </div>
              <div className="bx--col-md-4 bx--col-lg-12">
                <br />
                <br />

                <h2 className="landing-page__subheading">Suporting me ♥</h2>
                <p className="landing-page__p">
                  If you love my tools and would like to support my work, please
                  check out some donation methods below.
                </p>
                <Button
                  href="https://docs.osmedeus.org/donation/"
                  onClick={() => window.open(`https://docs.osmedeus.org/donation/`)}
                  renderIcon={CurrencyDollar20}
                  kind="danger">
                  Donation
                </Button>
              </div>
            </div>
            <div className="bx--col-md-4 bx--col-lg-11">
              <img
                className="landing-page__illo"
                src={`${
                  process.env.PUBLIC_URL
                }/static/osmedeus-architecture.png`}
                alt="Carbon illustration"
              />
            </div>
          </div>
        </div>
      </div>
    );

    if (error) {
      logoutComponent = (
        <p align="center">
          <Loading withOverlay={false} className="some-class" />
          <h1>Authentication fail. Logout after 5 seconds</h1>
        </p>
      );
      content = null;
      setTimeout(() => {
        console.log('logging out');
      }, 5000);
    }

    return (
      <div className="bx--grid bx--grid--full-width landing-page">
        {logoutComponent}
        {content}
      </div>
    );
  }
}

export default inject('sessStore', 'axiosStore')(observer(LandingPage));
