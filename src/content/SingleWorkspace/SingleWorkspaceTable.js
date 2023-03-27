import React from 'react';
import {
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from '@carbon/react';
import _ from 'lodash';
import ReportButton from './ReportButton';


const SingleWorkspaceTable = ({ data, tableTitle }) => {
  const base_url = window.origin;
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

  _.map(rawReports, function(value, key) {
    let item = {
      module: key,
      detail: <ReportButton reports={value} base_url={base_url} />,
    };
    rowData.push(item)
  });

  if (rowData.length == 0) {
    rowData.push({
      module: 'No reports available',
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

export default SingleWorkspaceTable;
