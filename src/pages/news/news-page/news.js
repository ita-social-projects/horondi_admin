import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useStyles } from './news.style';
import { config } from '../../../configs';
import { getNews } from '../../../redux/news/news.actions';
import TableContainerRow from '../../../components/table-container-row';
import TableContainerGenerator from '../../../components/table-container-generator';
import LoadingBar from '../../../components/loading-bar';

const tableTitles = config.tableHeadRowTitles.news;

const NewsPage = () => {
  const classes = useStyles();
  const list = useSelector(({ News }) => News.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

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

export default NewsPage;
