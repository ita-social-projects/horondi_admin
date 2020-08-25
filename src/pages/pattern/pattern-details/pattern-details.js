import React, { useEffect } from 'react';
import { FormControl, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { useStyles } from './pattern-details.styles';
import { SaveButton } from '../../../components/buttons';
import { config } from '../../../configs';
import usePatternHandlers from '../../../utils/use-pattern-handlers';
import LoadingBar from '../../../components/loading-bar';
import {
  getPattern,
  updatePattern
} from '../../../redux/pattern/pattern.actions';
import Options from '../../../components/options';
import CheckboxOptions from '../../../components/checkboxOptions';

const { languages } = config;

const PatternDetails = ({ match }) => {
  const { id } = match.params;
  const dispatch = useDispatch();
  const { loading, pattern } = useSelector(
    ({ Pattern: { pattern, patternLoading } }) => ({
      loading: patternLoading,
      pattern
    })
  );
  const classes = useStyles();

  const {
    large,
    setLarge,
    medium,
    setMedium,
    small,
    setSmall,
    thumbnail,
    setThumbnail,
    enName,
    setEnName,
    ukName,
    setUkName,
    setAvailable,
    ukDescription,
    setUkDescription,
    enDescription,
    setEnDescription,
    material,
    setMaterial,
    handmade,
    setHandmade,
    available
  } = usePatternHandlers();

  useEffect(() => {
    dispatch(getPattern(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (pattern !== null) {
      setLarge(pattern.images.large);
      setMedium(pattern.images.medium);
      setSmall(pattern.images.small);
      setThumbnail(pattern.images.thumbnail);
      setUkName(pattern.name[0].value);
      setEnName(pattern.name[1].value);
      setUkDescription(pattern.description[0].value);
      setEnDescription(pattern.description[1].value);
      setHandmade(pattern.handmade);
      setAvailable(pattern.available);
      setMaterial(pattern.material);
    }
  }, [
    pattern,
    setUkName,
    setEnName,
    setUkDescription,
    setEnDescription,
    setAvailable,
    setMaterial,
    setHandmade,
    setLarge,
    setMedium,
    setSmall,
    setThumbnail
  ]);

  const patternSaveHandler = () => {
    const pattern = {
      name: [
        {
          lang: languages[0],
          value: ukName
        },
        {
          lang: languages[1],
          value: enName
        }
      ],
      description: [
        {
          lang: languages[0],
          value: ukDescription
        },
        {
          lang: languages[1],
          value: enDescription
        }
      ],
      images: {
        large,
        medium,
        small,
        thumbnail
      },
      material,
      handmade,
      available
    };
    dispatch(updatePattern({ id, pattern }));
  };

  if (loading) {
    return <LoadingBar />;
  }
  const checkboxes = [
    {
      dataCy: 'handmade',
      value: handmade,
      className: classes.textfield,
      checked: handmade,
      color: 'primary',
      label: 'зроблений вручну',
      handler: (e) => setHandmade(e.target.checked)
    },
    {
      dataCy: 'available',
      value: available,
      className: classes.textfield,
      checked: available,
      color: 'primary',
      label: 'доступний',
      handler: (e) => setAvailable(e.target.checked)
    }
  ];

  const ukPatternOptions = [
    {
      dataCy: 'ukName',
      className: classes.textfield,
      variant: 'outlined',
      label: 'Назва гобелена (укр.)',
      ukName,
      handler: (e) => setUkName(e.target.value),
      required: true,
      value: ukName
    },
    {
      dataCy: 'ukDescription',
      className: classes.textfield,
      variant: 'outlined',
      label: 'Опис гобелена (укр.)',
      ukDescription,
      handler: (e) => setUkDescription(e.target.value),
      required: true,
      value: ukDescription
    }
  ];

  const enPatternOptions = [
    {
      dataCy: 'enName',
      className: classes.textfield,
      variant: 'outlined',
      label: 'Назва гобелена (англ.)',
      enName,
      handler: (e) => setEnName(e.target.value),
      required: true,
      value: enName
    },
    {
      dataCy: 'enDescription',
      className: classes.textfield,
      variant: 'outlined',
      label: 'Опис гобелена (англ.)',
      enDescription,
      handler: (e) => setEnDescription(e.target.value),
      required: true,
      value: enDescription
    }
  ];

  const commonOptions = [
    {
      dataCy: 'patternImage',
      className: classes.textfield,
      variant: 'outlined',
      label: 'Фото великого розміру',
      large,
      handler: (e) => setLarge(e.target.value),
      required: true,
      value: large
    },
    {
      dataCy: 'patternImage',
      className: classes.textfield,
      variant: 'outlined',
      label: 'Фото середнього розміру',
      medium,
      handler: (e) => setMedium(e.target.value),
      required: true,
      value: medium
    },
    {
      dataCy: 'patternImage',
      className: classes.textfield,
      variant: 'outlined',
      label: 'Фото малого розміру',
      small,
      handler: (e) => setSmall(e.target.value),
      required: true,
      value: small
    },
    {
      dataCy: 'patternImage',
      className: classes.textfield,
      variant: 'outlined',
      label: 'Фото найменшого розміру',
      thumbnail,
      handler: (e) => setThumbnail(e.target.value),
      required: true,
      value: thumbnail
    },
    {
      dataCy: 'patternMaterial',
      className: classes.textfield,
      variant: 'outlined',
      label: 'матеріал гобелена',
      material,
      handler: (e) => setMaterial(e.target.value),
      required: true,
      value: material
    }
  ];

  return (
    <div className={classes.detailsContainer}>
      <form className={classes.form} onSubmit={patternSaveHandler}>
        <FormControl className={classes.patternDetails}>
          <Grid container spacing={1}>
            <CheckboxOptions options={checkboxes} />
            <Grid item xs={12}>
              <Options options={commonOptions} />
            </Grid>
            <Grid item xs={6}>
              <Options options={ukPatternOptions} />
            </Grid>
            <Grid item xs={6}>
              <Options options={enPatternOptions} />
            </Grid>
          </Grid>
        </FormControl>
        <SaveButton
          data-cy='save'
          type='submit'
          title='Зберегти'
          className={classes.saveButton}
        />
      </form>
    </div>
  );
};
PatternDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }).isRequired
};

export default withRouter(PatternDetails);
