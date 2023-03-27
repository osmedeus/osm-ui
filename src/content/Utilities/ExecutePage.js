import React, { Component} from 'react';
import {
  TextInput,
  TextArea,
  Button,
  InlineNotification,
  Dropdown,
  Grid,
  Column,
  CodeSnippet,
} from '@carbon/react';
import { inject, observer } from 'mobx-react';
import { CloudUpload, Code } from '@carbon/react/icons';
import _ from 'lodash';

class ExecutePage extends Component {
 
  state = {
    error: false,
    isSubmitted: false,
    rawRows: null,
    detail_id: null,
    req_data: null,
    res_data: null,
    isOpenAdd: false,
    isOpenModal: false,
    isSubmited: false,
    filepath: null,
    dataUpload: null,
    cmd: 'osmedeus scan -f general -t example.com',
    target: 'example.com',
    selectedFlow: 'general',
    help:
      '[*] Visit this page for complete usage: https://j3ssie.github.io/Osmedeus/',
    mpassword: null,
    flows: [],
    now: true,
    seconds: 0,
    minutes: 0,
    hours: 0,
  };

  componentDidMount() {
    this.getHelps();
    this.getFlows();
    this.updateCmd();
  }
  componentWillUnmount() {
    this.updateCmd();
  }

  getHelps() {
    let url = `/api/osmp/help`;
    this.props.axiosStore.instance
      .get(`${url}`)
      .then(response => {
        if (response.data.hasOwnProperty('data')) {
          this.setState({ help: response.data.data.message });
        } else {
          this.setState({ error: true });
        }
      })
      .catch(error => this.setState({ error: true }));
  }

  getFlows() {
    let url = `/api/osmp/flows`;
    this.props.axiosStore.instance
      .get(`${url}`)
      .then(response => {
        if (response.data.hasOwnProperty('data')) {
          const raw_flows = response.data.data;
          let flows = [];
          _.map(raw_flows, function(value, key) {
            flows.push({
              id: value.name,
              text: `${value.name} -  ${value.desc}`,
            });
          });
          this.setState({ flows: flows });
        } else {
          this.setState({ error: true });
        }
      })
      .catch(error => this.setState({ error: true }));
  }


  handleSubmit = () => {
    const cmd = this.state.cmd;
    const now = this.state.now;
    const hours = this.state.hours;
    const minutes = this.state.minutes;
    const seconds = this.state.seconds;
    // add master password later
    const mpassword = '';
    // const mpassword = this.props.axiosStore.mpassword;

    let json_body = {};
    if (now === true) {
      json_body = {
        command: cmd,
        password: mpassword,
      };
    } else {
      json_body = {
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        command: cmd,
        password: mpassword,
      };
    }
    console.log(json_body);

    this.props.axiosStore.instance
      .post(`/api/osmp/execute`, json_body)
      .then(response => {
        if (response.data.hasOwnProperty('data')) {
          this.setState({ isSubmited: true });
        } else {
          this.setState({ error: true });
        }
      })
      .catch(error => this.setState({ error: true }));
  };

  updateCmd(selectedFlow, target) {
    if (selectedFlow === null || !selectedFlow) {
      selectedFlow = this.state.selectedFlow;
    } else {
      this.setState({ selectedFlow: selectedFlow });
    }
    if (target === null || !target) {
      target = this.state.target;
    } else {
      this.setState({ target: target });
    }
    const cmd = `osmedeus scan -f ${selectedFlow} -t ${target}`;
    this.setState({ cmd: cmd });
    console.log("cmd --> ", cmd);
  }

  cmdChange = (event) => {
    this.setState({
      cmd: event.target.value,
    });
  };

  hoursChange = (event) => {
    this.setState({
      hours: parseInt(event.target.value),
    });
  };

  minutesChange = (event) => {
    this.setState({
      minutes: parseInt(event.target.value),
    });
  };

  secondsChange = (event) => {
    this.setState({
      seconds: parseInt(event.target.value),
    });
  };

  targetChange = (event) => {
    this.updateCmd(null, event.target.value);
  };

  flowChange = (event) => {
    const flow = event.selectedItem.text.split(" - ")[0];
    this.updateCmd(flow, null);
  };

  toggleNow = () => {
    this.setState({ now: !this.state.now });
  };

  // modal part

  passChange = (event) => {
    this.setState({
      mpassword: event.target.value,
    });
  };

  handleUpload = () => {
    const data = this.state.dataUpload;
    const json_body = {
      data: data,
      filename: Date.now().toString(),
    };

    let url = `${this.props.axiosStore.url}/api/osmp/upload`;

    this.props.axiosStore.instance
      .post(url, json_body)
      .then(response => {
        if (response.data.hasOwnProperty('data')) {
          this.setState({ filepath: response.data.data.filepath });
        } else {
          this.setState({ error: true });
        }
      })
      .catch(error => this.setState({ error: true }));

    this.setState({ isUpload: true });
    this.setState({ isOpen: false });
  };

  dataChange = (event) => {
    this.setState({
      dataUpload: event.target.value,
    });
  };

  openAdd = () => this.setState({ isOpenAdd: true });
  closeModal = () => this.setState({ isOpenModal: false });

  openEdit = () => this.setState({ isOpenEdit: true });
  closeEdit = () => this.setState({ isOpenEdit: false });

  render() {
    const error = this.state.error;
    const flows = this.state.flows;
    const target = this.state.target;
    const now = this.state.now;
    const mpassword = this.state.mpassword;

    const filepath = this.state.filepath;
    const isSubmited = this.state.isSubmited;
    const cmd = this.state.cmd;

    const help_content = this.state.help;
    let uploadNoti = null;

    let noti = null;
    if (filepath) {
      uploadNoti = (
        <InlineNotification
          kind="info"
          lowContrast={false}
          title={`Your data is saved on: ${filepath}`}
        />
      );
    }
    if (isSubmited) {
      noti = (
        <InlineNotification
          kind="success"
          lowContrast={false}
          title={`Command is submitted.`}
        />
      );
    }

    let commandBox =  <CodeSnippet type="single">{cmd}</CodeSnippet>;


    return (

      <Grid fullWidth>
      <Column lg={8} md={4}  className="repo-page__r1">
                <div className="bx--col-md-4 bx--col-lg-4">
                  <h1 className="landing-page__heading">New Scan</h1>
                  <hr />

                    <div className="bx--row">
                      <div className="bx--col-md-4">
                        <Dropdown
                          id="select-flow"
                          items={flows}
                          itemToString={item => (item ? item.text : '')}
                          titleText="Select Flow"
                          label="general"
                          onChange={item => this.flowChange(item)}
                        />
                      </div>
                      <br />

                      <div className="bx--col-md-3">
                        <TextInput
                          className="some-class"
                          defaultValue={target}
                          disabled={false}
                          id="target-name"
                          labelText="Target"
                          onChange={data => this.targetChange(data)}
                          type="text"
                        />
                      </div>
                    </div>
                    <br />

                    <div className="bx--row">
                      <div className="bx--col-lg-16">
                        <TextInput
                          className="some-class"
                          defaultValue={cmd}
                          disabled={false}
                          id="input-cmd"
                          labelText="Or Using raw command"
                          onChange={data => this.cmdChange(data)}
                          type="text"
                        />
                      </div>

                    </div>
                    <br />
                </div>

              </Column>
                <Column  md={4}  className="repo-page__r1">
                <div className="bx--col-md-4 bx--col-lg-8">
                  <h1 className="landing-page__heading">Upload</h1>
                  <hr />

                  <TextArea
                    cols={500}
                    className="some-class"
                    hideLabel={false}
                    onChange={data => this.dataChange(data)}
                    placeholder="Fill your input separated by new line."
                    id="data-textarea"
                  />
                  <br />
                  <Button
                    small
                    renderIcon={CloudUpload}
                    onClick={() => this.handleUpload()}
                    kind="tertiary">
                    Updload
                  </Button>

                  <br />
                  {uploadNoti}
                </div>

      </Column>

      <Column lg={16} md={8}>
        <hr></hr>
      <h1 className="landing-page__heading">Final Command</h1>
          {commandBox}
          <br />
            <Button
              size="sm"
              renderIcon={Code}
              onClick={() => this.handleSubmit()}
              kind="secondary">
              Execute
            </Button>
      {noti}

      </Column>
      </Grid>
    );
  }
}

export default inject('sessStore', 'axiosStore')(observer(ExecutePage));
