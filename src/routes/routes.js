import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { useSelector } from 'react-redux';
import UsersPage from '../pages/users/users-page';
import NewsPage from '../pages/news/news-page';
import NewsAdd from '../pages/news/news-add';
import NewsDetails from '../pages/news/news-details';
import NavBar from '../components/nav-bar';
import NavMenu from '../components/nav-menu';
import SnackbarItem from '../components/snackbar';
import DialogWindow from '../components/dialog-window';
import LoginPage from '../pages/login/login-page';
import BusinessPageList from '../pages/business-pages';
import BusinessPageForm from '../pages/business-pages/business-page-form';
import ErrorPage from '../pages/error-page';
import { config } from '../configs';
import { history } from '../store/store';
import MaterialPage from '../pages/material/material-page';
import MaterialAdd from '../pages/material/material-add';
import ProductsPage from '../pages/products/products-page';
import ProductsAdd from '../pages/products/product-add';
import Categories from '../pages/categories/categories-page';
import CategoriesAdd from '../pages/categories/categories-add/categories-add';
import UsersDetails from '../pages/users/users-details';
import ContactsPage from '../pages/contacts-page';
import ContactsEdit from '../pages/contacts-page/contacts-edit';
import ContactsAdd from '../pages/contacts-page/contacts-add';
import PatternPage from '../pages/pattern/pattern-page';
import Comments from '../pages/comments/comments';
import PatternAdd from '../pages/pattern/pattern-add';
import PatternDetails from '../pages/pattern/pattern-details';
import RegisterUser from '../pages/users/register-user';
import ConfirmUser from '../pages/users/confirm-user';
import OrderItem from '../pages/order-item';
import HomePage from '../pages/home-page';
import EmailQuestionsList from '../pages/email-questions';
import EmailQuestionsDetails from '../pages/email-questions/email-question-details';
import ModelPage from '../pages/model/model-page';
import ModelAdd from '../pages/model/model-add';
import ModelDetails from '../pages/model/model-details';
import HeaderPage from '../pages/header/header-page';
import HeaderAdd from '../pages/header/header-add';
import HeaderDetails from '../pages/header/header-details';
import ProductEdit from '../pages/products/product-edit';
import MaterialDetails from '../pages/material/material-details/material-details';
import MaterialColorPalette from '../pages/material/material-color-palette';
import Orders from '../pages/orders/orders-page/orders-page';
import StatisticPage from '../pages/statistic';
import SlidesPage from '../pages/home-page-slides/slides-page';
import SlideAdd from '../pages/home-page-slides/slide-add';
import SlideDetails from '../pages/home-page-slides/slide-details';
import MainPage from '../pages/main-page';
import ErrorBoundary from '../components/error-boundary/error-boundary';

const { routes } = config;

const Routes = () => {
  const { isAuth } = useSelector(({ Auth }) => ({
    isAuth: Auth.isAuth
  }));

  if (!isAuth) {
    return (
      <ConnectedRouter history={history}>
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
      </ConnectedRouter>
    );
  }

  return (
    <ConnectedRouter history={history}>
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
          <Route path={routes.pathToAddNews} exact component={NewsAdd} />
          <Route path={routes.pathToAddHeader} exact component={HeaderAdd} />
          <Route path={routes.pathToAddPattern} exact component={PatternAdd} />
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
          <Route path={routes.pathToMaterials} exact component={MaterialPage} />
          <Route
            path={routes.pathToMaterialDetails}
            exact
            component={MaterialDetails}
          />
          <Route
            path={routes.pathToMaterialsColorPalette}
            exact
            component={MaterialColorPalette}
          />
          <Route
            path={routes.pathToAddMaterial}
            exact
            component={MaterialAdd}
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
          <Route
            path={routes.pathToContactsEdit}
            exact
            component={ContactsEdit}
          />
          <Route path={routes.pathToAddContact} exact component={ContactsAdd} />
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
            render={({ match }) => (
              <CategoriesAdd id={match.params.id} editMode />
            )}
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
          <Route component={ErrorPage} />
        </Switch>
      </ErrorBoundary>
      <DialogWindow />
      <SnackbarItem />
    </ConnectedRouter>
  );
};

export default Routes;
