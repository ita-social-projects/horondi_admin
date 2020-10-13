import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Button, Typography } from '@material-ui/core';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import TableContainerRow from '../../../containers/table-container-row';
import LoadingBar from '../../../components/loading-bar';
import { materialTranslations } from '../../../translations/material.translations';
import { config, routes } from '../../../configs';
import TableContainerGenerator from '../../../containers/table-container-generator';
import { useStyles } from './material-color-palette-style';
import { SaveButton } from '../../../components/buttons';
import {
  getMaterial,
  showColorDialogWindow
} from '../../../redux/material/material.actions';

const tableTitles = config.tableHeadRowTitles.materialsColors;

const MaterialColorPalette = ({ match }) => {
  const { id } = match.params;
  const styles = useStyles();
  const dispatch = useDispatch();
  const { material, loading } = useSelector(({ Material }) => ({
    material: Material.material,
    loading: Material.materialLoading
  }));

  useEffect(() => {
    dispatch(getMaterial(id));
  }, [dispatch, id]);

  const colorDeleteHandler = null;
  const colorClickHandler = () => {
    dispatch(showColorDialogWindow(true));
  };
  const colorPaletteClickHandler = () => {
    console.log(material._id);
    dispatch(push(`/material/${id}`));
  };
  const materialColorItems = material.colors.length
    ? material.colors.map((colorItem) => (
      <TableContainerRow
        key={colorItem.code}
        showAvatar
        image={
          colorItem.images.thumbnail
            ? `${config.patternImageLink}${colorItem.images.thumbnail}`
            : ''
        }
        id={colorItem.code}
        name={colorItem.name[0].value}
        simpleName={colorItem.simpleName[0].value}
        available={
          colorItem.available
            ? materialTranslations.YES
            : materialTranslations.NO
        }
        deleteHandler={() => colorDeleteHandler(colorItem._id)}
        editHandler={() => {
          dispatch(push(`/materials/${colorItem._id}`));
        }}
      />
    ))
    : null;
  if (loading) {
    return <LoadingBar />;
  }
  return (
    <div className={styles.container}>
      <Typography variant='h1' className={styles.materialTitle}>
        {config.materialColorPaletteTitle.mainPageTitle}
      </Typography>
      <div className={styles.tableNav}>
        <Button
          id='go-back'
          onClickHandler={colorPaletteClickHandler}
          variant='outlined'
          color='primary'
          className={styles.returnButton}
          data-cy='goBackButton'
        >
          {config.buttonTitles.GO_BACK_TITLE}
        </Button>
        <SaveButton
          className={styles.saveButton}
          data-cy='open-dialog'
          type='button'
          color='secondary'
          title={config.buttonTitles.CREATE_COLOR_TITLE}
          onClickHandler={colorClickHandler}
        />
      </div>
      <div className={styles.tableContainer}>
        <TableContainerGenerator
          tableTitles={tableTitles}
          tableItems={materialColorItems}
        />
      </div>
    </div>
  );
};

MaterialColorPalette.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }).isRequired,
  material: PropTypes.shape({
    _id: PropTypes.string,
    // name: PropTypes.arrayOf(valueShape),
    // description: PropTypes.arrayOf(valueShape),
    images: PropTypes.shape({
      thumbnail: PropTypes.string
    }),
    purpose: PropTypes.string,
    available: PropTypes.bool
  })
};

MaterialColorPalette.defaultProps = {
  material: {}
};
export default withRouter(MaterialColorPalette);
