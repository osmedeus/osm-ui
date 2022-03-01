import React from 'react';

import { Tag, Button } from 'carbon-components-react';
import { Add24, ArrowRight24, Launch20 } from '@carbon/icons-react';
import _ from 'lodash';

const ReportButton = props => {
  const reports = props.reports;
  const base_url = props.base_url;

  const content = _.map(reports, function(report) {
    let name = report.split('/').pop();
    let kind = 'secondary';
    // check if report is directory
    if ((name == '') || (name == '/')) {
      name = report.split('/')[report.split('/').length - 2];
      kind = 'primary';
    }
    
    if (report.endsWith('.html')) {
      kind = 'tertiary';
      return (
        <Button
          target="_blank"
          href={`${base_url}${report}`}
          renderIcon={Launch20}
          small
          target="_blank"
          kind={kind}>
          {name}
        </Button>
      );
    } else {
      return (
        <Button
          target="_blank"
          href={`${base_url}${report}`}
          renderIcon={Launch20}
          small
          target="_blank"
          kind={kind}>
          {name}
        </Button>
      );
    }
  });

  return content;
};

export default ReportButton;
