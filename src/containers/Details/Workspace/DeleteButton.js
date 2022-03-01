import React, { Component } from 'react';
import _ from 'lodash';
import { Tag, Button } from 'carbon-components-react';
import { Add24, TrashCan32 } from '@carbon/icons-react';
import { inject, observer } from 'mobx-react';

class DeleteButton extends Component {
  state = {
    error: false,
    isSubmitted: false,
    isOpenURL: false,
    detail_data: null,
    req_data: null,
    res_data: null,
    isOpenEdit: false,
    rawRows: null,
    rawWorkspaces: null,
    rawStorages: null,
    wsname: null,
    rawLogs: null,
  };

  componentDidMount() {
    const wsname = this.props.wsname;
    this.setState({ wsname: wsname });
  }

  handleDelete(wsname) {
    console.log('Delete workspace --> ' + wsname);

    let url = `/api/osmp/delete/${wsname}/`;
    this.props.axiosStore.instance
      .delete(`${url}`)
      .then(response => {
        if (response.data.hasOwnProperty('data')) {
        } else {
          this.setState({ error: true });
        }
      })
      .catch(error => this.setState({ error: true }));
  }

  render() {
    const wsname = this.state.wsname;

    return (
      <Button
        className="some-class"
        hasIconOnly
        iconDescription="Delete Wokspace"
        kind="danger"
        onClick={() => this.handleDelete(wsname)}
        renderIcon={TrashCan32}
        size="default"
        tabIndex={0}
        tooltipAlignment="center"
        tooltipPosition="right"
        type="button"
      />
    );
  }
}

export default inject('sessStore', 'axiosStore')(observer(DeleteButton));
