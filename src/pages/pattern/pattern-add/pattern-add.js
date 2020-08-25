import React from 'react';
import { FormControl, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from './pattern-add.styles';
import { SaveButton } from '../../../components/buttons';
import { addPattern } from '../../../redux/pattern/pattern.actions';
import LoadingBar from '../../../components/loading-bar';
import { config } from '../../../configs';
import usePatternHandlers from '../../../utils/use-pattern-handlers';
import Options from '../../../components/options';
import CheckboxOptions from '../../../components/checkboxOptions';

const { languages } = config;

const PatternAdd = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loading = useSelector(({ Pattern }) => Pattern.patternLoading);

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

  const patternSaveHandler = (e) => {
    e.preventDefault();
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
    dispatch(addPattern(pattern));
  };
  const checkboxes = [
    {
      dataCy: 'handmade',
      value: handmade,
      color: 'primary',
      label: 'зроблений вручну',
      handler: (e) => setHandmade(e.target.checked)
    },
    {
      dataCy: 'available',
      value: available,
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
      required: true
    },
    {
      dataCy: 'ukDescription',
      className: classes.textfield,
      variant: 'outlined',
      label: 'Опис гобелена (укр.)',
      ukDescription,
      handler: (e) => setUkDescription(e.target.value),
      required: true
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
      required: true
    },
    {
      dataCy: 'enDescription',
      className: classes.textfield,
      variant: 'outlined',
      label: 'Опис гобелена (англ.)',
      enDescription,
      handler: (e) => setEnDescription(e.target.value),
      required: true
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
      required: true
    },
    {
      dataCy: 'patternImage',
      className: classes.textfield,
      variant: 'outlined',
      label: 'Фото середнього розміру',
      medium,
      handler: (e) => setMedium(e.target.value),
      required: true
    },
    {
      dataCy: 'patternImage',
      className: classes.textfield,
      variant: 'outlined',
      label: 'Фото малого розміру',
      small,
      handler: (e) => setSmall(e.target.value),
      required: true
    },
    {
      dataCy: 'patternImage',
      className: classes.textfield,
      variant: 'outlined',
      label: 'Фото найменшого розміру',
      thumbnail,
      handler: (e) => setThumbnail(e.target.value),
      required: true
    },
    {
      dataCy: 'patternMaterial',
      className: classes.textfield,
      variant: 'outlined',
      label: 'матеріал гобелена',
      material,
      handler: (e) => setMaterial(e.target.value),
      required: true
    }
  ];

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={classes.container}>
      <form onSubmit={patternSaveHandler}>
        <FormControl className={classes.patternAdd}>
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
          className={classes.saveButton}
          data-cy='save'
          type='submit'
          title='Зберегти'
        />
      </form>
    </div>
  );
};

export default PatternAdd;
