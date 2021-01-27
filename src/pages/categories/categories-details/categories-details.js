import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { useStyles } from './categories-details.styles';
import LoadingBar from '../../../components/loading-bar';
import CategoryForm from '../../../components/forms/category-form';
import { getCategory } from '../../../redux/categories/categories.actions';

const CategoryDetails = ({ match }) => {
  const { id } = match.params;
  const dispatch = useDispatch();
  const { loading, category } = useSelector(({ Categories }) => ({
    loading: Categories.categoryLoading,
    category: Categories.category
  }));
  const styles = useStyles();

  useEffect(() => {
    dispatch(getCategory(id));
  }, [dispatch, id]);

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={styles.detailsContainer}>
      {category !== null ? (
        <CategoryForm id={id} edit category={category} />
      ) : null}
    </div>
  );
};

const valueShape = PropTypes.shape({
  value: PropTypes.string
});
CategoryDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }).isRequired,
  category: PropTypes.shape({
    _id: PropTypes.string,
    available: PropTypes.bool,
    description: PropTypes.arrayOf(valueShape),
    handmade: PropTypes.bool,
    images: PropTypes.shape({
      thumbnail: PropTypes.string
    }),
    material: PropTypes.string,
    name: PropTypes.arrayOf(valueShape)
  })
};

CategoryDetails.defaultProps = {
  category: {}
};

export default withRouter(CategoryDetails);
