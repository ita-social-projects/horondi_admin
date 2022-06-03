import React from 'react';
import { useQuery } from '@apollo/client';
import { useStyles } from './withBusinessPage.styles';
import LoadingBar from '../../../components/loading-bar';
import { getBusinessTextByCodeWithPopulatedTranslationsKey } from '../operations/about-us.queries';
import { config } from '../../../configs';

const { labels } = config;

const withBusinessPage = (Component) => (props) => {
  const styles = useStyles();
  const { data, loading } = useQuery(
    getBusinessTextByCodeWithPopulatedTranslationsKey,
    {
      variables: {
        code: labels.aboutUs.code
      }
    }
  );

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={styles.container}>
      {data?.getBusinessTextByCodeWithPopulatedTranslationsKey ? (
        <Component
          businessPage={data.getBusinessTextByCodeWithPopulatedTranslationsKey}
          {...props}
        />
      ) : null}
    </div>
  );
};

export default withBusinessPage;
