import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {push} from 'connected-react-router';
import {Link} from 'react-router-dom';
import {Button, Typography} from '@material-ui/core';
import {map} from 'lodash';

import {useCommonStyles} from '../common.styles';
import {useStyles} from './news-page.styles';
import {config} from '../../configs';
import {getNews, deleteArticle} from '../../redux/news/news.actions';
import {closeDialog} from '../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../utils/use-success-snackbar';
import TableContainerRow from '../../containers/table-container-row';
import TableContainerGenerator from '../../containers/table-container-generator';
import LoadingBar from '../../components/loading-bar';
import {newsSelectorWithPagination} from '../../redux/selectors/news.selectors';
import useNewsFilters from "../../hooks/filters/use-news-filters";
import FilterNavbar from "../../components/filter-search-sort";
import materialUiConstants from "../../configs/material-ui-constants";
import messages from "../../configs/messages";

const {IMG_URL} = config;
const {REMOVE_MESSAGE} = config.messages;
const {CREATE_NEWS_TITLE} = config.buttonTitles;

const pathToNewsAddPage = config.routes.pathToAddNews;
const tableTitles = config.tableHeadRowTitles.news;

const NewsPage = () => {
    const commonStyles = useCommonStyles();
    const styles = useStyles();
    const dispatch = useDispatch();
    const newsFilters = useNewsFilters();
    const {openSuccessSnackbar} = useSuccessSnackbar();
    const {list, loading, currentPage, rowsPerPage, itemsCount, filters} = useSelector(
        newsSelectorWithPagination
    );

    useEffect(() => {
        dispatch(
            getNews({
                limit: rowsPerPage,
                skip: currentPage * rowsPerPage,
                rowsPerPage,
                filter: {
                    search: filters.search
                }
            })
        );
    }, [dispatch, rowsPerPage, currentPage, filters]);

    const newsDeleteHandler = (id) => {
        const removeNews = () => {
            dispatch(closeDialog());
            dispatch(deleteArticle(id));
        };
        openSuccessSnackbar(removeNews, REMOVE_MESSAGE);
    };

    const newsItems = map(list, (newsItem, index) => (
        <TableContainerRow
            key={index}
            image={IMG_URL + newsItem.author.image}
            id={newsItem.id}
            author={
                newsItem.title[0].value !== null
                    ? newsItem.author.name[0].value
                    : newsItem.author.name[1].value
            }
            title={
                newsItem.title[0].value !== null
                    ? newsItem.title[0].value
                    : newsItem.title[1].value
            }
            deleteHandler={() => newsDeleteHandler(newsItem._id)}
            editHandler={() => {
                dispatch(push(`/news/${newsItem._id}`));
            }}
        />
    ));

    return (
        <div className={commonStyles.container}>
            <div className={commonStyles.adminHeader + ' ' + styles.title}>
                <Typography variant={materialUiConstants.typographyVariantH1} className={commonStyles.materialTitle}>
                    {config.titles.newsPageTitles.mainPageTitle}
                </Typography>
                <Button
                    id='add-news'
                    component={Link}
                    to={pathToNewsAddPage}
                    variant={materialUiConstants.outlined}
                    color={materialUiConstants.primary}
                >
                    {CREATE_NEWS_TITLE}
                </Button>
            </div>
            <FilterNavbar options={newsFilters || {}}/>
            {loading && <LoadingBar/>}
            {!loading && <>
                {
                    newsItems?.length ?
                        <TableContainerGenerator
                            pagination
                            id='newsTable'
                            count={itemsCount}
                            tableTitles={tableTitles}
                            tableItems={newsItems}
                        /> :
                        <p className={commonStyles.noRecords}>{messages.NO_NEWS_MESSAGE}</p>
                }
            </>}
        </div>
    );
};

export default NewsPage;
