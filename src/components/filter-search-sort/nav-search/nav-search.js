import React, {useState, useCallback} from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import {noop} from 'lodash';
import {useStyles} from './nav-search.styles';
import {config} from '../../../configs';

const {submitKey, labels} = config;
const {search: searchLabel} = labels;

const NavSearch = (
    {
        searchOptions: {
            search,
            setSearchFilter,
            placeholderText = ''
        }
    }) => {

    const styles = useStyles();

    const [searchValue, setSearchValue] = useState(search);

    const handleSetSearchValue = (event) => {
        setSearchValue(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        if (event.key === submitKey) {
            handleUserSearch();
        }
    };

    const handleUserSearch = useCallback(() => {
        setSearchFilter(searchValue);
    }, [searchValue]);

    return (
        <div>
            <Paper className={styles.root}>
                <InputBase
                    placeholder={searchLabel(placeholderText)}
                    value={searchValue}
                    onChange={handleSetSearchValue}
                    onKeyPress={handleSearchSubmit}
                />
                <Tooltip title={searchLabel} placement='bottom'>
                    <IconButton
                        className={styles.iconButton}
                        aria-label='search'
                        onClick={handleUserSearch}
                    >
                        <SearchIcon/>
                    </IconButton>
                </Tooltip>
            </Paper>
        </div>
    );
};
NavSearch.propTypes = {
    searchOptions: PropTypes.objectOf(PropTypes.object),
    filters: PropTypes.func,
    setSearchFilter: PropTypes.func
};

NavSearch.defaultProps = {
    searchOptions: {},
    filters: noop,
    setSearchFilter: noop
};
export default NavSearch;
