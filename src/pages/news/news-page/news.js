import React from 'react';
import { connect } from 'react-redux';
import { getNews } from '../../../redux/news/news.actions';

const NewsPage = () => (
  <>
    <p>Hello</p>
  </>
);

const mapStateToProps = ({ News: { list } }) => ({
  list
});
const mapDispatchToProps = {
  getNews
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsPage);
