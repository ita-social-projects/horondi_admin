import React, { useEffect } from 'react';
import {
  Paper,
  TextField,
  FormControl,
  FormControlLabel,
  Grid,
  Checkbox
} from '@material-ui/core';
import propTypes from 'prop-types';
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

const { languages } = config;

const PatternDetails = ({ id }) => {
  const dispatch = useDispatch();
  const { loading, pattern } = useSelector(
    ({ Pattern: { pattern, patternLoading } }) => ({
      loading: patternLoading,
      pattern
    })
  );
  const classes = useStyles();

  const {
    ukName,
    setUkName,
    enName,
    setEnName,
    ukDescription,
    setUkDescription,
    enDescription,
    setEnDescription,
    material,
    setMaterial,
    image,
    setImage,
    available,
    setAvailable,
    handmade,
    setHandmade
  } = usePatternHandlers();

  useEffect(() => {
    dispatch(getPattern(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (pattern !== null) {
      setImage(pattern.images.large);
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
    setImage,
    setHandmade
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
        large: image
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
      id: 'handmade',
      value: handmade,
      checked: handmade,
      color: 'primary',
      label: 'зроблений вручну',
      handler: (e) => setHandmade(e.target.checked)
    },
    {
      id: 'available',
      value: available,
      checked: available,
      color: 'primary',
      label: 'доступний',
      handler: (e) => setAvailable(e.target.checked)
    }
  ];

  const checkboxInputs = checkboxes.map(
    ({ color, checked, label, value, handler }) => (
      <FormControlLabel
        key={label}
        value={value}
        checked={checked}
        control={<Checkbox color={color} />}
        label={label}
        labelPlacement='start'
        onChange={handler}
      />
    )
  );
  return (
    <div className={classes.detailsContainer}>
      <form className={classes.form} onSubmit={patternSaveHandler}>
        <FormControl className={classes.patternDetails}>
          <Grid container spacing={1}>
            {checkboxInputs}
            <Grid item xs={12}>
              <Paper className={classes.patternItemUpdate}>
                <TextField
                  id='image'
                  className={classes.textField}
                  variant='outlined'
                  label='Фото гобелена'
                  multiline
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  required
                />
                <TextField
                  id='material'
                  className={classes.textField}
                  variant='outlined'
                  label='Матеріал'
                  multiline
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  required
                />
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.patternItemUpdate}>
                <TextField
                  id='ukName'
                  className={classes.textField}
                  variant='outlined'
                  label='назва (укр.)'
                  multiline
                  value={ukName}
                  onChange={(e) => setUkName(e.target.value)}
                  required
                />
                <TextField
                  id='ukDescription'
                  className={classes.textField}
                  variant='outlined'
                  label='опис (укр.)'
                  multiline
                  value={ukDescription}
                  onChange={(e) => setUkDescription(e.target.value)}
                  required
                />
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.patternItemUpdate}>
                <TextField
                  id='enName'
                  className={classes.textField}
                  variant='outlined'
                  label='назва (англ.)'
                  multiline
                  value={enName}
                  onChange={(e) => setEnName(e.target.value)}
                  required
                />
                <TextField
                  id='enDescription'
                  className={classes.textField}
                  variant='outlined'
                  label='опис (англ.)'
                  multiline
                  value={enDescription}
                  onChange={(e) => setEnDescription(e.target.value)}
                  required
                />
              </Paper>
            </Grid>
          </Grid>
        </FormControl>
        <SaveButton
          id='save'
          type='submit'
          title='Зберегти'
          className={classes.saveButton}
        />
      </form>
    </div>
  );
};
PatternDetails.propTypes = {
  id: propTypes.string.isRequired
};

export default withRouter(PatternDetails);
