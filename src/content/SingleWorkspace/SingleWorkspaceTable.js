import React from 'react';
import {
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Button,
  TableCell,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
} from '@carbon/react';
import _ from 'lodash';
import { Add, Archive } from '@carbon/react/icons';
import ReportButton from './ReportButton';




const SingleWorkspaceTable = ({ data, wsname }) => {
  const base_url = window.origin;
  // const wsname = wsname;
  let rawReports = data.reports;
  let rowData = [];
  const headerData = [
      {
        key: 'module',
        header: 'Module',
      },
      {
        key: 'detail',
        header: 'Detail',
      },
    ];


  console.log("rawReports -->", rawReports)
  _.map(rawReports, function(value, key) {
    // console.log("value -->", value)

    const item = {
      id: key,
      module: key,
      detail: <ReportButton reports={value} base_url={base_url} />,
    };

    // console.log(item)
    rowData.push(item)
  });

  if (rowData.length == 0) {
    rowData.push({
      module: 'No reports available',
      detail: '',
    });
  }

  // let wsname = 'wsname'

  return (
    <DataTable rows={rowData} headers={headerData} isSortable={false}>
      {({ rows, headers, getHeaderProps, getTableProps, getBatchActionProps, onInputChange }) => (
        <TableContainer>
        <TableToolbar>
        <TableToolbarContent>
          <TableToolbarSearch
            expanded={true}
            tabIndex={getBatchActionProps().shouldShowBatchActions ? -1 : 0}
            onChange={onInputChange}
          />

          
          <Button
            tabIndex={getBatchActionProps().shouldShowBatchActions ? -1 : 0}
            onClick={() => window.open(`${window.origin}/ui/#/execute`, '_blank')}
            kind="primary"
            renderIcon={Add}
          >
            New Scan
          </Button>
          
          <Button
            tabIndex={getBatchActionProps().shouldShowBatchActions ? -1 : 0}
            onClick={() => window.open(`${window.origin}${wsname}`, '_blank')}

            renderIcon={Archive}
            kind="secondary"
          >
            Raw View
          </Button>
        </TableToolbarContent>
      </TableToolbar>


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

export default SingleWorkspaceTable;
