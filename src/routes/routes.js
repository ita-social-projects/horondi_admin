import React, { useEffect } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UsersPage from '../pages/users';
import NewsPage from '../pages/news';
import NavBar from '../components/nav-bar';
import NavMenu from '../components/nav-menu';
import SnackbarItem from '../components/snackbar';
import DialogWindow from '../components/dialog-window';
import LoginPage from '../pages/login';
import BusinessPageList from '../pages/business-pages';
import BusinessPageForm from '../components/forms/business-page-form';
import ErrorPage from '../pages/error-page';
import { config } from '../configs';
import MaterialPage from '../pages/material';
import MaterialAdd from '../pages/material/material-add';
import ProductsPage from '../pages/products';
import ProductsAdd from '../pages/products/product-add';
import Categories from '../pages/categories/categories';
import CategoriesAdd from '../pages/categories/categories-add';
import CategoryDetails from '../pages/categories/categories-details';
import UsersDetails from '../pages/users/users-details';
import ContactsPage from '../pages/contacts-page';
import ContactsEdit from '../pages/contacts-page/contacts-edit';
import ContactsAdd from '../pages/contacts-page/contacts-add';
import PatternPage from '../pages/pattern';
import Comments from '../pages/comments/comments';
import Sizes from '../pages/sizes/sizes';
import SizeAdd from '../pages/sizes/sizes-add/size-add';
import SizeEdit from '../pages/sizes/sizes-edit/size-edit';
import PatternAdd from '../pages/pattern/pattern-add';
import PatternDetails from '../pages/pattern/pattern-details';
import RegisterUser from '../pages/users/register-user';
import ConfirmUser from '../pages/users/confirm-user';
import OrderItem from '../pages/order-item';
import HomePage from '../pages/home-page';
import EmailQuestionsList from '../pages/email-questions';
import EmailQuestionsDetails from '../pages/email-questions/email-question-details';
import ModelPage from '../pages/model';
import ModelAdd from '../pages/model/model-add';
import ModelDetails from '../pages/model/model-details';
import HeaderPage from '../pages/header';
import HeaderAdd from '../pages/header/header-add';
import HeaderDetails from '../pages/header/header-details';
import ProductEdit from '../pages/products/product-edit';
import MaterialDetails from '../pages/material/material-details/material-details';
import Orders from '../pages/orders/orders-page';
import StatisticPage from '../pages/statistic';
import SlidesPage from '../pages/home-page-slides';
import SlideAdd from '../pages/home-page-slides/slide-add';
import SlideDetails from '../pages/home-page-slides/slide-details';
import MainPage from '../pages/main-page';
import ErrorBoundary from '../components/error-boundary/error-boundary';
import NewsDetails from '../pages/news/news-details/news-details';
import NewsAdd from '../pages/news/news-add/news-add';
import ConstructorPage from '../pages/model/constructor/constructor-page';
import ConstructorAdd from '../pages/model/constructor/constructor-add';
import ConstructorDetails from '../pages/model/constructor/constructor-details';
import CommentEdit from '../pages/comments/comment-edit/comment-edit';

const { routes } = config;

const Routes = () => {
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    if (location.pathname !== history.location.pathname) {
      history.push(location.pathname);
    }
  }, [location, history]);
  const { isAuth } = useSelector(({ Auth }) => ({
    isAuth: Auth.isAuth
  }));

  if (!isAuth) {
    return (
      <>
        <NavBar />
        <Switch>
          <Route
            path={routes.pathToConfirmAdmin}
            exact
            component={ConfirmUser}
          />
          <Route path={routes.pathToLogin} exact component={LoginPage} />
          <Route component={ErrorPage} />
        </Switch>
        <DialogWindow />
        <SnackbarItem />
      </>
    );
  }

  return (
    <>
      <NavBar />
      <NavMenu />
      <ErrorBoundary>
        <Switch>
          <Route path={routes.pathToMainPage} exact component={MainPage} />
          <Route path={routes.pathToUsers} exact component={UsersPage} />
          <Route
            path={routes.pathToUsersDetails}
            exact
            component={UsersDetails}
          />
          <Route path={routes.pathToNews} exact component={NewsPage} />
          <Route path={routes.pathToPatterns} exact component={PatternPage} />
          <Route path={routes.pathToModels} exact component={ModelPage} />
          <Route path={routes.pathToHeaders} exact component={HeaderPage} />
          <Route path={routes.pathToAddHeader} exact component={HeaderAdd} />
          <Route path={routes.pathToAddPattern} exact component={PatternAdd} />
          <Route path={routes.pathToAddNews} exact component={NewsAdd} />
          <Route
            path={routes.pathToNewsDetails}
            exact
            component={NewsDetails}
          />
          <Route
            path={routes.pathToHeaderDetails}
            exact
            component={HeaderDetails}
          />
          <Route
            path={routes.pathToAddMaterial}
            exact
            component={MaterialAdd}
          />
          <Route path={routes.pathToMaterials} exact component={MaterialPage} />
          <Route
            path={routes.pathToMaterialDetails}
            exact
            component={MaterialDetails}
          />
          <Route
            path={routes.pathToPatternDetails}
            exact
            component={PatternDetails}
          />
          <Route
            path={routes.pathToBusinessPages}
            exact
            component={BusinessPageList}
          />
          <Route
            path={routes.pathToAddBusinessPage}
            exact
            component={BusinessPageForm}
          />
          <Route
            path={routes.pathToBusinessPageDetails}
            exact
            render={({ match }) => (
              <BusinessPageForm id={match.params.id} editMode />
            )}
          />
          <Route path={routes.pathToContacts} exact component={ContactsPage} />
          <Route path={routes.pathToAddContact} exact component={ContactsAdd} />
          <Route
            path={routes.pathToContactsEdit}
            exact
            component={ContactsEdit}
          />
          <Route path={routes.pathToAddModel} exact component={ModelAdd} />
          <Route
            path={routes.pathToModelDetails}
            exact
            component={ModelDetails}
          />
          <Route path={routes.pathToProducts} exact component={ProductsPage} />
          <Route path={routes.pathToAddProduct} exact component={ProductsAdd} />
          <Route
            path={routes.pathToEditProduct}
            exact
            render={({ match }) => <ProductEdit id={match.params.id} />}
          />
          <Route path={routes.pathToCategories} exact component={Categories} />
          <Route path={routes.pathToComments} exact component={Comments} />
          <Route path={routes.pathToSizes} exact component={Sizes} />
          <Route path={routes.pathToAddSize} exact component={SizeAdd} />
          <Route
            path={routes.pathToEditSize}
            exact
            render={({ match }) => <SizeEdit id={match.params.id} />}
          />

          <Route
            path={routes.pathToRegisterAdmin}
            exact
            component={RegisterUser}
          />
          <Route path={routes.pathToHomePageEdit} exact component={HomePage} />
          <Route
            path={routes.pathToAddCategory}
            exact
            component={CategoriesAdd}
          />
          <Route
            path={routes.pathToEditCategory}
            exact
            component={CategoryDetails}
          />

          <Route
            path={routes.pathToEmailQuestions}
            exact
            component={EmailQuestionsList}
          />
          <Route
            path={routes.pathToEmailQuestionDetails}
            exact
            render={({ match }) => (
              <EmailQuestionsDetails id={match.params.id} />
            )}
          />
          <Route
            path={routes.pathToStatistic}
            exact
            component={StatisticPage}
          />
          <Route path={routes.pathToOrders} exact component={Orders} />
          <Route
            path={routes.pathToOrderItem}
            exact
            render={({ match }) => <OrderItem id={match.params.id} />}
          />
          <Route path={routes.pathToOrderAdd} exact component={OrderItem} />
          <Route
            path={routes.pathToHomePageSlides}
            exact
            component={SlidesPage}
          />
          <Route
            path={routes.pathToAddHomePageSlide}
            exact
            component={SlideAdd}
          />
          <Route
            path={routes.pathToHomePageSlideDetail}
            exact
            component={SlideDetails}
          />
          <Route
            path={routes.pathToConstructor}
            exact
            component={ConstructorPage}
          />
          <Route
            path={routes.pathToAddConstructor}
            exact
            component={ConstructorAdd}
          />
          <Route
            path={routes.pathToConstructorDetails}
            exact
            component={ConstructorDetails}
          />
          <Route
            path={routes.pathToCommentsEdit}
            exact
            component={CommentEdit}
          />
          <Route component={ErrorPage} />
        </Switch>
      </ErrorBoundary>
      <DialogWindow />
      <SnackbarItem />
    </>
  );
};

export default Routes;
