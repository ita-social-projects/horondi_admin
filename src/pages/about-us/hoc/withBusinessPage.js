import React from 'react';
import { useQuery } from '@apollo/client';
import { useStyles } from './withBusinessPage.styles';
import LoadingBar from '../../../components/loading-bar';
import { getBusinessTextByCode } from '../operations/about-us.queries';
import { config } from '../../../configs';

const { labels } = config;

const withBusinessPage = (Component) => (props) => {
  const styles = useStyles();
  const { data, loading } = useQuery(getBusinessTextByCode, {
    variables: {
      code: labels.aboutUs.code
    }
  });

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={styles.container}>
      {data?.getBusinessTextByCode ? (
        <Component businessPage={data.getBusinessTextByCode} {...props} />
      ) : null}
    </div>
  );
};

export default withBusinessPage;
