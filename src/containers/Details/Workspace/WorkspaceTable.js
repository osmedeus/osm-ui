import React, { Component } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Tabs,
  Tab,
} from 'carbon-components-react';
import {
  Form,
  FormGroup,
  Checkbox,
  NumberInput,
  SelectItem,
  Toggle,
  RadioButtonGroup,
  RadioButton,
  Select,
  Search,
  TableToolbarSearch,
  TableToolbarContent,
  TableBatchActions,
  TableBatchAction,
  TableSelectAll,
  TableToolbarAction,
  TableSelectRow,
  TableToolbar,
  TextInput,
  TextArea,
  ForwardRef,
  ToastNotification,
  InlineNotification,
  ComposedModal,
  ModalFooter,
  NotificationActionButton,
  Loading,
  CodeSnippet,
  Tag,
} from 'carbon-components-react';
import { DataTable } from 'carbon-components-react';

import {
  Edit20,
  Search16,
  TrashCan20,
  Add24,
  Launch20,
  FolderDetails20,
  Aperture20,
  ViewMode_120,
  CloudUpload32,
  Archive20,
} from '@carbon/icons-react';
import { inject, observer } from 'mobx-react';
import { Link, Redirect } from 'react-router-dom';
import copy from 'clipboard-copy';
import _ from 'lodash';
import RiskTag from '../../../components/Vuln/RiskTag';

const {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
} = DataTable;

class WorkspacesTable extends Component {
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
    rawLogs: null,
  };

  componentDidMount() {
    this.getData();
    this.getRawView();
  }

  getData() {
    let url = `/api/osmp/workspaces`;

    this.props.axiosStore.instance
      .get(`${url}`)
      .then(response => {
        if (response.data.hasOwnProperty('data')) {
          this.setState({ rawRows: response.data.data });
          this.setState({
            tamperRow: response.data.data,
          });
        } else {
          this.setState({ error: true });
        }
      })
      .catch(error => this.setState({ error: true }));
      
  }

  getRawView() {
    let url = `/api/osmp/raw`;
    this.props.axiosStore.instance
      .get(`${url}`)
      .then(response => {
        if (response.data.hasOwnProperty('data')) {
          this.setState({
            rawStorages: response.data.data.storages,
          });
          this.setState({
            rawWorkspaces: response.data.data.workspaces,
          });
          this.setState({
            rawLogs: response.data.data.logs,
          });
        } else {
          this.setState({ error: true });
        }
      })
      .catch(error => this.setState({ error: true }));
  }

  // yeah I implement  this so it may not so good
  searchChangedHandler = event => {
    if (event.target.value === '' || event.target.value === null) {
      this.setState({ rawRows: this.state.tamperRow });
    } else if (event.target.value) {
      const grep = _.lowerCase(event.target.value);
      let tamperRow = [];

      _.map(this.state.tamperRow, function(item) {
        _.map(item, function(element) {
          if (_.isArray(element)) {
            let temp_string = _.join(element, ' ');

            if (_.includes(_.lowerCase(temp_string), grep)) {
              tamperRow.push(item);
            }
          } else {
            if (_.includes(_.lowerCase(element), grep)) {
              tamperRow.push(item);
            }
          }
        });
      });

      this.setState({ rawRows: _.uniq(tamperRow) });
    } else {
      this.setState({ rawRows: this.state.rawRows });
    }
  };

  render() {

        const error = this.state.error;

    let payload_table = (
      <h1 className="landing-page__heading">Nothing to show</h1>
    );

    const rawRows = this.state.rawRows;
    const rawWorkspaces = this.props.axiosStore.url + this.state.rawWorkspaces;
    const rawLogs = this.props.axiosStore.url + this.state.rawLogs;

    let rows = [
      {
        id: 'a',
        foo: 'AA11 a',
        bar: 'AA11 a',
        baz: 'AA11 a',
      },
    ];

    let headers = [
      {
        key: 'Target',
        header: 'Target',
      },
      {
        key: 'Details',
        header: 'Details',
      },
      {
        key: 'Summary',
        header: 'Summary',
      },
      {
        key: 'RawView',
        header: 'RawView',
      },
      {
        key: 'LogFile',
        header: 'LogFile',
      },
      {
        key: 'Created',
        header: 'Created',
      },
    ];
    // parsing content to rows
    if (rawRows) {
      let realRows = [];
      _.map(rawRows, function(item) {
        let row = {
          id: item.id.toString(),
          Target: item.workspace,
          Created: item.created_at,
          Details: (
            <div>
              <Button
                href={`/ui/#/reports/${item.workspace}/`}
                renderIcon={Launch20}
                small
                // target="_blank"
                kind="secondary">
                {`Reports (${item.reports.length})`}
              </Button>
            </div>
          ),
          Summary: (
            <div>
              <Tag className="some-class" type="green">
                subdomains/{item.total_assets}
              </Tag>

              <Tag className="some-class" type="purple">
                dns/{item.total_dns}
              </Tag>

              <Tag className="some-class" type="magenta">
                directory/{item.total_dirb}
              </Tag>

              <Tag className="some-class" type="teal">
                vuln/{item.total_vulnerability}
              </Tag>

              <Tag className="some-class" type="blue">
                screenshots/{item.total_screenshot}
              </Tag>

              <Tag className="some-class" type="gray">
                archive/{item.total_archive}
              </Tag>

              <Tag className="some-class" type="warm-gray">
                links/{item.total_link}
              </Tag>
            </div>
          ),
          RawView: (
            <Button
              className="some-class"
              hasIconOnly
              iconDescription="Raw View"
              kind="default"
              onClick={() =>
                window.open(`${rawWorkspaces}${item.workspace}/`)
              }
              renderIcon={CloudUpload32}
              size="default"
              tabIndex={0}
              tooltipAlignment="center"
              tooltipPosition="right"
              type="button"
            />
          ),
          LogFile: (
            <Button
              className="some-class"
              hasIconOnly
              iconDescription="Log URL"
              kind="default"
              onClick={() => copy(`${rawLogs}${item.workspace}/`)}
              renderIcon={Archive20}
              size="default"
              tabIndex={0}
              tooltipAlignment="center"
              tooltipPosition="right"
              type="button"
            />
          ),
        };
        realRows.push(row);
      });
      rows = realRows;
    }
    payload_table = (
      <DataTable
        useZebraStyles={false}
        isSortable
        rows={rows}
        headers={headers}
        render={({
          rows,
          headers,
          getHeaderProps,
          getSelectionProps,
          onInputChange,
          onChange,
          onClick,
          expandRow,
        }) => (
          <TableContainer>
            <TableToolbar kind="secondary">
              {/* make sure to apply getBatchActionProps so that the bar renders */}

              <TableToolbarContent>
                <TableToolbarSearch
                  onChange={data => this.searchChangedHandler(data)}
                />

                <Button
                  // onClick={() => this.openAdd()}
                  href="/ui/#/execute"
                  small
                  renderIcon={Add24}
                  kind="primary">
                  New Scan
                </Button>

                <Button
                  href={`${rawWorkspaces}`}
                  small
                  renderIcon={FolderDetails20}
                  kind="secondary">
                  Raw View
                </Button>
              </TableToolbarContent>
            </TableToolbar>
            <Table>
              <TableHead>
                <TableRow>
                  {headers.map(header => (
                    <TableHeader {...getHeaderProps({ header })}>
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <TableRow key={row.id}>
                    {row.cells.map(cell => (
                      <TableCell key={cell.id}>
                        <strong>{cell.value}</strong>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      />
    );
    return payload_table;
  }
}

export default inject('sessStore', 'axiosStore')(observer(WorkspacesTable));
