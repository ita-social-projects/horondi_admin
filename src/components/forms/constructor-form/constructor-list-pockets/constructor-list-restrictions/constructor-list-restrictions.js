import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import {
  Checkbox,
  FormControlLabel,
  Button,
  Radio,
  RadioGroup,
  Select,
  TableCell,
  TableRow
} from '@material-ui/core';
import { getAllPockets } from '../../../../../redux/pockets/pockets.actions';
import { pocketsSelectorWithPagination } from '../../../../../redux/selectors/pockets.selectors';
import { useStyles } from './constructor-list-restrictions.styles';
import { handleMenuItem } from '../../../../../utils/handle-menu-item';
import { positionsSelectorWithPagination } from '../../../../../redux/selectors/position.selectors';
import { getAllPositions } from '../../../../../redux/position/position.actions';
import TableContainerGenerator from '../../../../../containers/table-container-generator';
import addIcon from '../../../../../assets/images/add-icon.svg';
import { config } from '../../../../../configs';

const { materialUiConstants } = config;

const ConstructorListRestrictions = ({
  restrictionsToAdd,
  setRestrictionsToAdd
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [isHiding, setHiding] = useState(true);
  const [activePocket, setActivePocket] = useState({ _id: '', positions: [] });
  const [activePosition, setActivePosition] = useState({ _id: '', name: '' });
  const [currentRestrictions, setCurrentRestrictions] = useState([]);

  const {
    items: pockets,
    currentPage: pocketCurrentPage,
    rowsPerPage: pocketRowsPerPage,
    filter: pocketFilter
  } = useSelector(pocketsSelectorWithPagination);
  const {
    items: positions,
    currentPage: positionCurrentPage,
    rowsPerPage: positionRowsPerPage,
    filter: positionFilter
  } = useSelector(positionsSelectorWithPagination);

  const handleToggleRestrictions = () => {
    setActivePocket(pockets[0]);
    setHiding(!isHiding);
  };

  const handlePocketChange = (e) => {
    const pocket = pockets.filter(({ _id }) => _id === e.target.value)[0];
    setActivePocket(pocket);
  };

  const createTitles = () => {
    const titles = ['Кишеня'];
    if (positions) {
      for (const position of positions) {
        titles.push(position.name[0].value);
      }
    }
    return titles;
  };

  const checkboxChangeHandler = (positionId, pocketId) => {
    const possibleItems = currentRestrictions.find(
      (item) => item.pocketId === pocketId && item.positionId === positionId
    );
    if (possibleItems) {
      setCurrentRestrictions(
        currentRestrictions.filter(
          (item) => item.pocketId !== pocketId || item.positionId !== positionId
        )
      );
    } else {
      setCurrentRestrictions([
        ...currentRestrictions,
        { pocket: pocketId, position: positionId }
      ]);
    }
  };

  const handleAddRestriction = () => {
    const pocket = pockets.filter(({ _id }) => _id === activePocket._id)[0];
    const position = positions.filter(({ _id }) => _id === activePosition._id)[0];

    const possibleItems = restrictionsToAdd.find(
      (item) =>
        item.pocket._id === pocket._id && item.position._id === position._id
    );
    let newRestrictionsToAdd = restrictionsToAdd;
    if (possibleItems) {
      newRestrictionsToAdd = restrictionsToAdd.filter(
        (item) =>
          item.pocket._id !== pocket._id || item.position._id !== position._id
      );
    }
    setRestrictionsToAdd([
      ...newRestrictionsToAdd,
      { pocket, position, currentRestrictions }
    ]);
    handleToggleRestrictions();
  };

  useEffect(() => {
    setActivePosition(activePocket.positions[0]);
  }, [activePocket]);

  useEffect(() => {
    dispatch(
      getAllPositions({
        pagination: {
          limit: positionRowsPerPage,
          skip: positionCurrentPage * positionRowsPerPage
        },
        positionFilter
      })
    );
    dispatch(
      getAllPockets({
        pagination: {
          limit: pocketRowsPerPage,
          skip: pocketCurrentPage * pocketRowsPerPage
        },
        pocketFilter
      })
    );
  }, [
    dispatch,
    pocketCurrentPage,
    pocketRowsPerPage,
    pocketFilter,
    positionCurrentPage,
    positionRowsPerPage,
    positionFilter
  ]);

  const pocketItems = map(pockets, (pocket) => {
    const positionCheckboxes = map(positions, (position, index) => {
      for (const pocketPosition of pocket.positions) {
        if (pocketPosition._id === position._id) {
          return (
            <TableCell key={index}>
              <Checkbox
                color='default'
                inputProps={{ 'aria-label': 'checkbox with default color' }}
                onClick={(e) =>
                  checkboxChangeHandler(pocketPosition._id, pocket._id)
                }
              />
            </TableCell>
          );
        }
      }
      return (
        <TableCell key={index}>
          <div />
        </TableCell>
      );
    });

    return (
      <TableRow key={pocket._id} hover>
        <TableCell>
          <p>{pocket.name[0].value}</p>
        </TableCell>
        {positionCheckboxes}
      </TableRow>
    );
  });

  const pocketOptions = useMemo(() => handleMenuItem(pockets), [pockets]);

  const positionOptions = map(activePocket.positions, (position) => (
    <FormControlLabel
      className={classes.label}
      value={position._id}
      control={
        <Radio
          onChange={() => {
            setActivePosition(position);
          }}
          color='default'
          size='small'
        />
      }
      label={position.name[0].value}
      key={position._id}
    />
  ));

  return (
    <div>
      <button
        type='submit'
        className={
          isHiding ? `${classes.addPocketBtn} ${classes.show}` : classes.hide
        }
        onClick={handleToggleRestrictions}
      >
        <img src={addIcon} alt='add icon' />
        <p>Додати кишеню</p>
      </button>
      <div
        className={
          isHiding ? classes.hide : `${classes.addPocketForm} ${classes.show}`
        }
      >
        <div className='option'>
          Опція:
          <Select
            onChange={handlePocketChange}
            name='pockets'
            value={activePocket._id}
            className={classes.select}
          >
            {pocketOptions}
          </Select>
        </div>
        <div className='option'>
          Розміщення:
          <RadioGroup
            name='restrictions'
            value={activePosition?._id}
            className={classes.radioButtons}
          >
            {positionOptions}
          </RadioGroup>
        </div>
        <div className='option'>
          {pocketItems?.length ? (
            <TableContainerGenerator
              data-cy='restrictionstable'
              tableTitles={createTitles()}
              tableItems={pocketItems}
            />
          ) : (
            <p>Обмеження відсутні</p>
          )}
        </div>
        <Button
          data-cy={materialUiConstants.save}
          type={materialUiConstants.types.submit}
          variant='contained'
          color='primary'
          onClick={handleAddRestriction}
          className={classes.saveButton}
        >
          Зберегти
        </Button>
      </div>
    </div>
  );
};

const valueShape = PropTypes.shape({
  value: PropTypes.string
});

ConstructorListRestrictions.propTypes = {
  setRestrictionsToAdd: PropTypes.func,
  restrictionsToAdd: PropTypes.arrayOf(valueShape)
};

ConstructorListRestrictions.defaultProps = {
  restrictionsToAdd: [],
  setRestrictionsToAdd: ''
};

export default ConstructorListRestrictions;
