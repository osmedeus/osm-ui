import React from 'react';
import {
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  InlineLoading,
  TableHeader,
  TableBody,
  Button,
  TableCell,
  Tag,
} from '@carbon/react';
import _ from 'lodash';
import { Launch, Cloud } from '@carbon/react/icons';



const WorkspacesTable = ({ rows }) => {
  let rowData = [];
  const headerData = [
    {
      key: 'name',
      header: 'Target',
    },
    {
      key: 'detail',
      header: 'Detail',
    },

    {
      key: 'routine',
      header: 'Routine',
    },
    {
      key: 'progress',
      header: 'Progress',
    },
    {
      key: 'running_time',
      header: 'Running Time',
    },

    {
      key: 'statistics',
      header: 'Statistics',
    },
    {
      key: 'updatedAt',
      header: 'Updated',
    },

  ];

  console.log("rows -->", rows)

  _.forEach(rows, (value) => {

    let numberOfReports = "N/A"
    if (value.target.reports != null) {
      numberOfReports = value.target.reports.length
    }

    let progress = <Tag type="blue"><InlineLoading />
      {value.done_step}/{value.total_steps}
    </Tag>;

    if (value.done_step === 0 && value.is_started === false) {
      progress = <Tag type="gray"><InlineLoading status='error' />
        {value.done_step}/{value.total_steps}
      </Tag>;
    }
    if (value.is_done) {
      progress = <Tag type="green"><InlineLoading status='finished' />
        {value.done_step}/{value.total_steps}
      </Tag>;
    }
    if (value.is_cloud) {
      progress = <Button size='lg' renderIcon={Cloud} kind='ghost'>{value.done_step}/{value.total_steps}</Button>
    }

    let item = {
      id: value.name,
      name: value.name,
      detail: (
        <div>
          <Button
            href={`/#/workspace/${value.name}/`}
            renderIcon={Launch}
            size="sm"
            target="_blank"
            kind="primary">
            {`Reports (${numberOfReports})`}
          </Button>
        </div>
      ),
      status: value.status,
      routine: value.task_name,
      routine:           <Tag type="cyan">
    {value.task_type}/{value.task_name}
    </Tag>,
      progress: progress,

      running_time: <Tag type="magenta">
        {`${parseFloat(value.running_time / 3600).toFixed(3)} h`}
      </Tag>,

      statistics: (
        <div>
          <Tag type="green">
            subdomains/{value.target.total_assets}
          </Tag>

          <Tag type="purple">
            dns/{value.target.total_dns}
          </Tag>

          <Tag type="magenta">
            directory/{value.target.total_dirb}
          </Tag>

          <Tag type="teal">
            vuln/{value.target.total_vulnerability}
          </Tag>

          <Tag type="blue">
            screenshots/{value.target.total_screenshot}
          </Tag>

          <Tag type="gray">
            archive/{value.target.total_archive}
          </Tag>

          <Tag type="warm-gray">
            links/{value.target.total_link}
          </Tag>
        </div>
      ),

      updatedAt: new Date(value.updatedAt).toLocaleDateString(),
    }
    rowData.push(item)
  });


  return (
    <DataTable rows={rowData} headers={headerData} isSortable={true}>
      {({ rows, headers, getHeaderProps, getTableProps }) => (
        <TableContainer title="Index of all workspaces">
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

export default WorkspacesTable;
