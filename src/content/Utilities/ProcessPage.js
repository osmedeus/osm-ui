import React, { useEffect, useState } from 'react';
import {
  DataTableSkeleton,
  Grid,
  Column,
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  CodeSnippet,
  Tag,
} from '@carbon/react';
import { inject, observer } from 'mobx-react';
import _ from 'lodash';


const headers = [
  {
    key: 'name',
    header: 'Name',
  },

];

const ProcessTable = ({ data, tableTitle }) => {
  let rowData = [];
  const headerData = [
      {
        key: 'pid',
        header: 'PID',
      },
      {
        key: 'command',
        header: 'Command',
      },
    ];


    _.forEach(data, (value) => {

      let item = {
        pid: <Tag type="green">{value.pid}</Tag>,
        command: <CodeSnippet type="inline">{value.command}</CodeSnippet>,
      }
      rowData.push(item)
    });

  if (rowData.length == 0) {
    rowData.push({
      module: 'No running processes',
      detail: '',
    });
  }

  return (
    <DataTable rows={rowData} headers={headerData} isSortable={true}>
      {({ rows, headers, getHeaderProps, getTableProps }) => (
        <TableContainer title={tableTitle}>
          <Table {...getTableProps()} useZebraStyles={false} size='lg'>
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableHeader {...getHeaderProps({ header })}>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  {row.cells.map((cell) => (
                    <TableCell key={cell.id}><strong>{cell.value}</strong></TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </DataTable>

  );
};


const ProcessPage = (props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      // setWS(props.match.params.wsname)
      let url = `${props.axiosStore.url}/api/osmp/ps`;
      console.log(`sending GET request to ${url}`);

      props.axiosStore.instance.get(`${url}`)
        .then(response => {
          if (response.hasOwnProperty('data')) {
            setData(response.data.data);
          }
        })
      setLoading(false);
    }
    getData();

  }, []);


  if (loading) {
    return (
      <Grid className="repo-page">
        <Column lg={16} md={8} sm={4} className="repo-page__r1">
          <DataTableSkeleton
            columnCount={headers.length + 1}
            rowCount={10}
            headers={headers}
          />
        </Column>
      </Grid>
    );
  }

  if (error) {
    console.log("error", error);
    return `Error! ${error}`;
  }

  // If we're here, we've got our data!
  return (
    <Grid className="landing-page" fullWidth>
      <Column lg={16} md={8} sm={4} className="repo-page__r1">
        <ProcessTable
          data={data}
          tableTitle={"List of Osmedeus running processes"}
        />
      </Column>
    </Grid>
  );
};

export default inject('sessStore', 'axiosStore')(observer(ProcessPage));

