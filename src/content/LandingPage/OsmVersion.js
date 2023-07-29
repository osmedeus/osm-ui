import React, { useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
import { Button } from '@carbon/react';
import { Api } from '@carbon/react/icons';

const OsmVersion = (props) => {
  const [isError, setError] = useState();
  const [version, setVersion] = useState([]);

  useEffect(() => {
    async function getData() {
      let url = `${props.axiosStore.url}/api/osmp/health`;
      console.log(`sending GET request to ${url}`);

      props.axiosStore.instance.get(`${url}`)
        .then(response => {
          console.log("response.data.data -->", response.data)
          if (response.hasOwnProperty('data')) {
            setVersion(response.data.data.version);
          }
        })
    }
    setError(false);
  }, []);


  if (isError) {
    console.log("isError", isError);
    return (    <Button
        href="https://docs.osmedeus.org/"
        onClick={() => window.open(`https://docs.osmedeus.org/`)}
        renderIcon={Api}
        target="_blank"
        kind="secondary">
        Version v4
        </Button>)
  }

  // If we're here, we've got our data!
  return (
    <Button
    href="https://docs.osmedeus.org/"
    onClick={() => window.open(`https://docs.osmedeus.org/`)}
    renderIcon={Api}
    target="_blank"
    kind="secondary">
    Version {version}
    </Button>
  );
};

export default inject('sessStore', 'axiosStore')(observer(OsmVersion));

