import React from 'react';

import CategoryDetails from '../../components/category-details';

const CategoryDetailsPageContainer = ({ match }) => {
  const { id } = match.params;
  return (
    <div>
      <CategoryDetails categoryId={id} />
    </div>
  );
};

export default CategoryDetailsPageContainer;
