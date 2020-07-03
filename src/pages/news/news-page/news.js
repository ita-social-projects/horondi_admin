import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useStyles } from './news.style';
import { config } from '../../../configs';
import { getNews } from '../../../redux/news/news.actions';

import TableContainerRow from '../../../components/table-container-row';
import TableContainerGenerator from '../../../components/table-container-generator';
import LoadingBar from '../../../components/loading-bar';

const tableTitles = config.tableHeadRowTitles.news;

const NewsPage = ({ getNews, list }) => {
  const classes = useStyles();

  useEffect(() => {
    getNews();
  }, [getNews]);

  const loading = useSelector(({ App }) => App.loading);

  const newsItems =
    list !== undefined
      ? list.map((newsItem, index) => (
          <TableContainerRow
            key={index}
            id={newsItem._id}
            author={newsItem.author.name[0].value}
            title={newsItem.title[0].value}
            deleteHandler={() => {}}
            editHandler={() => {}}
          />
        ))
      : null;

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={classes.container}>
      <div className={classes.tableNav} />
      <TableContainerGenerator
        id='newsTable'
        tableTitles={tableTitles}
        tableItems={newsItems}
      />
    </div>
  );
};

const mapStateToProps = ({ News: { list } }) => ({
  list
});
const mapDispatchToProps = {
  getNews
};

NewsPage.propTypes = {
  getNews: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string.isRequired
        })
      ),
      author: PropTypes.shape({
        name: PropTypes.arrayOf(
          PropTypes.shape({
            value: PropTypes.string.isRequired
          })
        )
      })
    })
  )
};

NewsPage.defaultProps = {
  list: [
    {
      title: [
        {
          value: ''
        }
      ],
      author: {
        name: [
          {
            value: ''
          }
        ]
      }
    }
  ]
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsPage);
