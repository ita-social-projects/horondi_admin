import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getNews } from '../../../redux/news/news.actions';

const NewsPage = ({ getNews, list }) => {
  useEffect(() => {
    getNews();
  }, [getNews]);

  console.log(list);

  return <p>Hello</p>;
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
