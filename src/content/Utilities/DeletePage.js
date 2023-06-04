import React, { useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
import {
  DataTableSkeleton,
  Pagination,
  Grid,
  Column,
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
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
} from '@carbon/react';
import _ from 'lodash';
import { TrashCan, Cloud, Archive, Add } from '@carbon/react/icons';


const headers = [
  {
    key: 'name',
    header: 'Name',
  },

];

const getRowItems = rows =>
  rows.map(row => (
    {
    ...row,
    key: row.target.workspace,
    name: row.target.workspace,
    status: row.current_module,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }));


function handleClick(data) {
    // Function to be called on click
    console.log('Button clicked!', data);



};

const DeletePage = (props) => {

  // class WorkspacePage extends Component {
  const [firstRowIndex, setFirstRowIndex] = useState(0);
  const [currentPageSize, setCurrentPageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [rows, setRows] = useState([]);
  const [metadata, setMetaData] = useState([]);

  
  useEffect(() => {
    async function getData() {
      let url = `${props.axiosStore.url}/api/osmp/workspaces`;
      console.log(`sending GET request to ${url}`);

      props.axiosStore.instance.get(`${url}`)
        .then(response => {
          if (response.hasOwnProperty('data')) {
            setRows(getRowItems(response.data.data));
          }
        })
      setLoading(false);

      url = `${props.axiosStore.url}/api/osmp/raw`;
      props.axiosStore.instance.get(`${url}`)
        .then(response => {
          if (response.hasOwnProperty('data')) {
            setMetaData(response.data.data);
          }
        })
      setLoading(false);

    }
    getData();


  }, []);

  async function deleteWorkspace(workspace) {
    console.log('Deleting workspaces clicked!', workspace);
    let url = `${props.axiosStore.url}/api/osmp/delete/${workspace}`;
    props.axiosStore.instance.delete(`${url}`)
      .then(response => {
        if (response.hasOwnProperty('data')) {
          setRows(getRowItems(response.data.data));
        }
      })
      window.location.reload(true);
  }


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


  let rowData = [];
  const headerData = [
    {
      key: 'name',
      header: 'Target',
    },
    {
      key: 'action',
      header: 'Action',
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
      action: (
          <Button
            renderIcon={TrashCan}
            size="sm"
            onClick={() => {deleteWorkspace(value.name)}}
            kind="danger">
            {`Delete `}
          </Button>
      ),

      status: value.status,
      routine: value.task_name,
      routine: <Tag type="cyan">
    {value.task_type}/{value.task_name}
    </Tag>,
      progress: progress,

      running_time: <Tag type="magenta">
        {`${parseFloat(value.running_time / 3600).toFixed(3)} h`}
      </Tag>,

      updatedAt: new Date(value.updatedAt).toLocaleDateString(),
    }
    rowData.push(item)
  });


  // If we're here, we've got our data!
  return (
    <Grid className="landing-page" fullWidth>



      <Column lg={16} md={8} sm={4} className="repo-page__r1">
        <h1 className="landing-page__heading">Index of all workspaces</h1>
        <hr />

        <DataTable rows={rowData} headers={headerData} isSortable={true}>
      {({ rows, headers, getHeaderProps, getTableProps, getBatchActionProps, onInputChange }) => (
        <TableContainer>

        <TableToolbar>
        <TableToolbarContent>
          <TableToolbarSearch
            expanded={true}
            tabIndex={getBatchActionProps().shouldShowBatchActions ? -1 : 0}
            onChange={onInputChange}
          />

          
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



        <Pagination
          totalItems={rows.length}
          backwardText="Previous page"
          forwardText="Next page"
          pageSize={currentPageSize}
          pageSizes={[5, 10, 15, 25]}
          itemsPerPageText="Items per page"
          onChange={({ page, pageSize }) => {
            if (pageSize !== currentPageSize) {
              setCurrentPageSize(pageSize);
            }
            setFirstRowIndex(pageSize * (page - 1));
          }}
        />
      </Column>
    </Grid>
  );
};

export default inject('sessStore', 'axiosStore')(observer(DeletePage));

