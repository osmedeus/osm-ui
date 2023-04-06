import React, { useEffect, useState } from 'react';
import WorkspacesTable from './WorkspacesTable';
import {
  DataTableSkeleton,
  Pagination,
  Grid,
  Column,
} from '@carbon/react';
import { inject, observer } from 'mobx-react';
import _ from 'lodash';


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

const WorkspacePage = (props) => {

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
      // console.log(`sending GET request to ${url}`);

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
        <h1 className="landing-page__heading">Index of all workspaces</h1>
        <hr />

        <WorkspacesTable
          rows={rows}
          metadata={metadata}
        />
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

export default inject('sessStore', 'axiosStore')(observer(WorkspacePage));

