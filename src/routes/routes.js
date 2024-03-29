import React, { useEffect } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import AboutUsPage from '../pages/about-us';
import AboutUsTitleEdit from '../pages/about-us/about-us-title-edit';
import AboutUsSectionAdd from '../pages/about-us/about-us-section-add';
import AboutUsSectionEdit from '../pages/about-us/about-us-section-edit';
import AboutUsFooterImgEdit from '../pages/about-us/about-us-footer-img-edit';
import UsersPage from '../pages/users';
import NewsPage from '../pages/news';
import NavBar from '../components/nav-bar';
import NavMenu from '../components/nav-menu';
import SnackbarItem from '../components/snackbar';
import DialogWindow from '../components/dialog-window';
import LoginPage from '../pages/login';
import BusinessPageList from '../pages/business-pages';
import BusinessPageForm from '../components/forms/business-page-form';
import FormQNA from '../components/forms/questions-answers-form';
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
import PatternAdd from '../pages/pattern/pattern-add';
import PatternDetails from '../pages/pattern/pattern-details';
import RegisterUser from '../pages/users/register-user';
import ConfirmUser from '../pages/users/confirm-user';
import OrderItem from '../pages/order-item';
import HomePage from '../pages/home-page';
import EmailQuestionsList from '../pages/email-questions';
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
import CommentEdit from '../pages/comments/comment-edit/comment-edit';
import ReplyCommentEdit from '../pages/comments/comment-edit/replyComments/reply-comment-edit';
import History from '../pages/history';
import HistoryDetails from '../pages/history/history-details';
import PocketsPage from '../pages/pockets/pockets-page';
import PocketsAdd from '../pages/pockets/pockets-add/pockets-add';
import PocketsEdit from '../pages/pockets/pockets-edit/pockets-edit';
import BackPage from '../pages/back';
import BottomPage from '../pages/bottom';
import BackAdd from '../pages/back/back-add';
import BackDetails from '../pages/back/back-edit';
import PositionPage from '../pages/position/position-page';
import PositionAdd from '../pages/position/position-add';
import PositionEdit from '../pages/position/position-edit';
import ConstructorListPage from '../pages/constructor-list';
import ConstructorModelDetails from '../pages/constructor-list/constructor-details';
import ClosuresPage from '../pages/closures/closures-page';
import ClosuresAdd from '../pages/closures/closures-add/closures-add';
import ClosuresEdit from '../pages/closures/closures-edit/closures-edit';
import BottomAdd from '../pages/bottom/bottom-add';
import BottomEdit from '../pages/bottom/bottom-edit';
import BasicsPage from '../pages/basics/basics-page';
import BasicAdd from '../pages/basics/basic-add';
import BasicEdit from '../pages/basics/basic-edit';
import StrapsPage from '../pages/straps/straps-page';
import StrapsAdd from '../pages/straps/straps-add/straps-add';
import StrapsEdit from '../pages/straps/straps-edit/straps-edit';
import UserDetails from '../pages/users/user/user-details';
import constructorEdit from '../pages/constructor-list/constructor-edit';
import CreateCertificate from '../pages/certificates/create-certificate/create-certificate';
import PromoCodeAdd from '../pages/promo-code/promo-code-add/promo-code-add';
import PromoCodeEdit from '../pages/promo-code/promo-code-edit/promo-code-edit';
import PromoCodePage from '../pages/promo-code/promo-code-page';
import MaterialAboutAdd from '../pages/material/material-about-add';
import MaterialAbout from '../pages/material/material-about';
import MaterialAboutDetails from '../pages/material/material-about-details';
import CertificatesPage from '../pages/certificates';

const { routes } = config;

const Routes = ({ validatorMethods }) => {
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
          <Route path={routes.pathToHistory} exact component={History} />
          <Route
            path={routes.pathToHistoryDetails}
            exact
            component={HistoryDetails}
          />
          <Route path={routes.pathToUsers} exact component={UsersPage} />
          <Route
            path={routes.pathToUsersDetails}
            exact
            component={UsersDetails}
          />
          <Route path={routes.pathToEditUser} exact component={UserDetails} />
          <Route path={routes.pathToNews} exact component={NewsPage} />
          <Route path={routes.pathToPatterns} exact component={PatternPage} />
          <Route path={routes.pathToModels} exact component={ModelPage} />
          <Route path={routes.pathToHeaders} exact component={HeaderPage} />
          <Route path={routes.pathToAddHeader} exact component={HeaderAdd} />
          <Route path={routes.pathToAddPattern} exact component={PatternAdd} />
          <Route path={routes.pathToAddNews} exact component={NewsAdd} />
          <Route path={routes.pathToAboutUs} exact component={AboutUsPage} />
          <Route
            path={routes.pathToAboutUsTitleEdit}
            exact
            component={AboutUsTitleEdit}
          />
          <Route
            path={routes.pathToAboutUsAddSection}
            exact
            component={AboutUsSectionAdd}
          />
          <Route
            path={routes.pathToAboutUsSectionEdit}
            exact
            render={({ match }) => <AboutUsSectionEdit id={match.params.id} />}
          />
          <Route
            path={routes.pathToAboutUsFooterImgEdit}
            exact
            component={AboutUsFooterImgEdit}
          />
          <Route
            path={routes.pathToAboutMaterialsMain}
            exact
            render={(props) => <MaterialAbout {...props} currentType='main' />}
          />
          <Route
            path={routes.pathToAboutMaterialsBottom}
            exact
            render={(props) => (
              <MaterialAbout {...props} currentType='bottom' />
            )}
          />
          <Route
            path={routes.pathToAboutMaterialsMainAdd}
            exact
            render={(props) => (
              <MaterialAboutAdd {...props} currentType='main' />
            )}
          />
          <Route
            path={routes.pathToAboutMaterialsBottomAdd}
            exact
            render={(props) => (
              <MaterialAboutAdd {...props} currentType='bottom' />
            )}
          />
          <Route
            path={routes.pathToAboutMaterialsMainDetails}
            exact
            render={(props) => <MaterialAboutDetails {...props} />}
          />
          <Route
            path={routes.pathToAboutMaterialsBottomDetails}
            exact
            render={(props) => <MaterialAboutDetails {...props} />}
          />
          <Route
            path={routes.pathToCreateCertificates}
            exact
            component={CreateCertificate}
          />
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
          <Route
            path={routes.pathToMaterials}
            exact
            render={(props) => (
              <MaterialPage {...props} validatorMethods={validatorMethods} />
            )}
          />
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
            path={routes.pathToAddQuestionsAnswers}
            exact
            component={FormQNA}
          />
          <Route
            path={routes.pathToEditQuestionsAnswers}
            exact
            render={({ match }) => <FormQNA id={match.params.id} editMode />}
          />
          <Route
            path={routes.pathToBusinessPagePaymentAndShipping}
            exact
            render={() => (
              <BusinessPageForm codePath='payment-and-shipping' editMode />
            )}
          />
          <Route
            path={routes.pathToBusinessPagePrivacyPolicy}
            exact
            render={() => (
              <BusinessPageForm codePath='privacy-policy' editMode />
            )}
          />
          <Route
            path={routes.pathToBusinessPageTerms}
            exact
            render={() => <BusinessPageForm codePath='terms' editMode />}
          />
          <Route
            path={routes.pathToBusinessPageUserAgreement}
            exact
            render={() => (
              <BusinessPageForm codePath='user-agreement' editMode />
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
            path={routes.pathToPromoCodes}
            exact
            component={PromoCodePage}
          />
          <Route
            path={routes.pathToAddPromoCode}
            exact
            component={PromoCodeAdd}
          />
          <Route
            path={routes.pathToEditPromoCode}
            exact
            component={PromoCodeEdit}
          />
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
            component={CategoryDetails}
          />

          <Route
            path={routes.pathToEmailQuestions}
            exact
            component={EmailQuestionsList}
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
            path={routes.pathToEditConstructor}
            exact
            component={constructorEdit}
          />
          <Route
            path={routes.pathToCommentsEdit}
            exact
            component={CommentEdit}
          />
          <Route
            path={routes.pathToReplyCommentsEdit}
            exact
            component={ReplyCommentEdit}
          />
          <Route path={routes.pathToPockets} exact component={PocketsPage} />
          <Route path={routes.pathToPocketsAdd} exact component={PocketsAdd} />
          <Route
            path={routes.pathToPocketsEdit}
            exact
            component={PocketsEdit}
          />
          <Route path={routes.pathToBacks} exact component={BackPage} />
          <Route path={routes.pathToBacksAdd} exact component={BackAdd} />
          <Route
            path={routes.pathToBackDetails}
            exact
            component={BackDetails}
          />
          <Route path={routes.pathToBottoms} exact component={BottomPage} />
          <Route path={routes.pathToBottomsAdd} exact component={BottomAdd} />
          <Route path={routes.pathToBottomsEdit} exact component={BottomEdit} />
          <Route path={routes.pathToPosition} exact component={PositionPage} />
          <Route
            path={routes.pathToPositionAdd}
            exact
            component={PositionAdd}
          />
          <Route
            path={routes.pathToPositionEdit}
            exact
            component={PositionEdit}
          />
          <Route
            path={routes.pathToConstructorList}
            exact
            component={ConstructorListPage}
          />
          <Route
            path={routes.pathToConstructorModelDetails}
            exact
            component={ConstructorModelDetails}
          />
          <Route path={routes.pathToClosures} exact component={ClosuresPage} />
          <Route
            path={routes.pathToClosuresAdd}
            exact
            component={ClosuresAdd}
          />
          <Route
            path={routes.pathToClosuresEdit}
            exact
            component={ClosuresEdit}
          />
          <Route path={routes.pathToBasics} exact component={BasicsPage} />
          <Route path={routes.pathToBasicAdd} exact component={BasicAdd} />
          <Route path={routes.pathToEditBasic} exact component={BasicEdit} />
          <Route path={routes.pathToStraps} exact component={StrapsPage} />
          <Route path={routes.pathToStrapsAdd} exact component={StrapsAdd} />
          <Route path={routes.pathToStrapsEdit} exact component={StrapsEdit} />
          <Route
            path={routes.pathToAboutCertificate}
            component={CertificatesPage}
          />
          <Route component={ErrorPage} />
        </Switch>
      </ErrorBoundary>
      <DialogWindow />
      <SnackbarItem />
    </>
  );
};

Routes.propTypes = {
  validatorMethods: PropTypes.shape({
    deleteValidation: PropTypes.func,
    toggleRerender: PropTypes.func
  })
};

Routes.defaultProps = {
  validatorMethods: PropTypes.shape({
    deleteValidation: noop,
    toggleRerender: noop
  })
};

export default Routes;
