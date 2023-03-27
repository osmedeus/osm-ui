import React, { useEffect, useState } from 'react';
import SingleWorkspaceTable from './SingleWorkspaceTable';
import {
  DataTableSkeleton,
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


const SingleWorkspacePage = (props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState([]);
  const [ws, setWS] = useState([]);



  useEffect(() => {
    async function getData() {
      setWS(props.match.params.wsname)
      let url = `${props.axiosStore.url}/api/osmp/workspace/${props.match.params.wsname}`;
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
        <SingleWorkspaceTable
          data={data}
          tableTitle={"List of reports for " + ws}
        />
      </Column>
    </Grid>
  );
};

export default inject('sessStore', 'axiosStore')(observer(SingleWorkspacePage));

