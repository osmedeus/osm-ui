import React from 'react';
import {

  Button,
} from '@carbon/react';
import _ from 'lodash';
import { Launch } from '@carbon/react/icons';



const ReportButton = props => {
  const reports = props.reports;
  const base_url = props.base_url;

  const content = _.map(reports, function(report) {
    let name = report.split('/').pop();
    let kind = 'secondary';
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
          renderIcon={Launch}
          size="sm"
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
          renderIcon={Launch}
          size="sm"

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
