import React, { Component } from 'react';
import {
  Button,
  Grid,
  Column,
} from '@carbon/react';
import OsmVersion from './OsmVersion';
import { CurrencyDollar } from '@carbon/react/icons';


class LandingPage extends Component {
  state = {
    error: false,
    isSubmitted: false,
    isOpenURL: false,
    detail_data: null,
    doc: 'https://docs.osmedeus.org/',
    version: 'v4',
    isOpenEdit: false,
    rawRows: null,
  };

  render() {
  return (
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
      {OsmVersion}
      </Column>


      <Column lg={10} md={8} sm={4}>
        <img
          className="landing-page__illo"
          src={`${process.env.PUBLIC_URL}/static/osmedeus-architecture.png`}
          alt="Main Image"
        />
      </Column>
    </Grid>
  );
  }}

export default LandingPage;
