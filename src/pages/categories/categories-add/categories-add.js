import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  FormControl,
  Grid,
  Paper,
  Button,
  TextField,
  FormControlLabel,
  Select
} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { push } from 'connected-react-router';
import { useStyles } from './categories-add.styles';
import TableContainerGenerator from '../../../components/table-container-generator';
import TabPanel from '../../../components/tab-panel';
import { config } from '../../../configs';
import TableContainerRow from '../../../components/table-container-row';
import {
  getCategories,
  createCategory,
  setCategory,
  getCategory,
  resetNewCategory,
  editCategory,
  deleteCategory
} from '../../../redux/categories/categories.actions';
import LoadingBar from '../../../components/loading-bar';
import { omitTypename } from '../../../utils/omitTypeName';
import useSuccessSnackbar from '../../../utils/use-success-snackbar';
import { closeDialog } from '../../../redux/dialog-window/dialog-window.actions';
import AddPhoto from '../../../images/add-photo.png'

const CategoriesAdd = ({ id, editMode }) => {
  // HOOKS
  const dispatch = useDispatch();
  const { newCategory, categories, loading } = useSelector(
    ({ Categories }) => ({
      newCategory: Categories.newCategory,
      categories: Categories.categories,
      loading: Categories.categoriesLoading
    })
  );

  const { isMain } = newCategory;
  const { openSuccessSnackbar } = useSuccessSnackbar();
  const { DELETE_CATEGORY_MESSAGE } = config.messages;
  const { DELETE_CATEGORY } = config.buttonTitles;

  // MAIN CATEGORIES []
  const mainCategories = useMemo(
    () =>
      categories
        .filter((cat) => cat.isMain)
        .sort((a, b) => {
          if (a.name[0].value.toLowerCase() > b.name[0].value.toLowerCase()) {
            return 1;
          }
          else if (a.name[0].value.toLowerCase() < b.name[0].value.toLowerCase()) {
            return -1;
          }
          return 0;
        }),
    [categories]
  );

  const parentCategory = useMemo(
    () => mainCategories.find((ctg) => ctg.subcategories.includes(id)),
    [id, mainCategories]
  );

  useEffect(() => {
    if (!editMode) {
      dispatch(resetNewCategory());
    }
  }, [dispatch, editMode]);

  useEffect(() => {
    if (id) {
      dispatch(getCategory(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (parentCategory) {
      setParentId(parentCategory._id);
    } else {
      setParentId(null);
    }
  }, [parentCategory]);

  useEffect(() => {
    const editedCategory = categories.find((ctg) => ctg._id === id);
    dispatch(setCategory(editedCategory));
  }, [dispatch, id, categories]);

  useEffect(() => {
    if(newCategory.images.medium) {
      setCategoryImageUrl(config.IMG_URL+newCategory.images.medium);
    }
  }, [newCategory.images.medium]);

  // GENERAL
  const [tabValue, setTabValue] = useState(0);
  const { tableHeadRowTitles, buttonTitles } = config;

  // NAMES
  const nameModel = { lang: '', value: '' };
  const [newName, setNewName] = useState(nameModel);
  const [showAddNameForm, setShowAddNameForm] = useState(true);

  // PARENT CATEGORY
  const [parentId, setParentId] = useState(parentCategory);

  // IMAGES
  const [categoryImageUrl, setCategoryImageUrl] = useState(null);
  const [upload, setUpload] = useState(null);

  // VALIDATION
  const [shouldValidate, setShouldValidate] = useState(false);
  const [codeIsValid, setCodeIsValid] = useState(false);
  const [nameIsValid, setNameIsValid] = useState(false);

  useEffect(()=> {
    if(!editMode) {
      setCategoryImageUrl(null)
    }
  },[editMode])

  useEffect(() => {
    if (newCategory.code) {
      setCodeIsValid(true);
    } else {
      setCodeIsValid(false);
    }
    if (newCategory.name.length >= 2) {
      setNameIsValid(true);
    } else {
      setNameIsValid(false);
    }
  }, [newCategory.code, newCategory.name, setCodeIsValid, setNameIsValid]);

  // HANDLERS
  const handleChange = (e) => {
    const inputName = e.target.name;
    let inputValue = e.target.checked;
    if (e.target.type === 'text') {
      inputValue = e.target.value;
    }
    if (tabValue === 2 && !isMain) {
      setTabValue(0);
    }
    dispatch(setCategory({ [inputName]: inputValue }));
  };

  const handleTabChange = (e, newValue) => {
    setTabValue(newValue);
  };

  const handleCategorySave = () => {
    setShouldValidate(true);
    if (isMain) {
      setParentId(null);
    }
    if (codeIsValid && nameIsValid) {
      dispatch(createCategory({ category: newCategory, parentId, upload }));
    }
  };

  const handleCategoryEdit = () => {
    const id = newCategory._id;
    dispatch(
      editCategory({
        category: omitTypename(newCategory, { deleteId: true }),
        id,
        upload
      })
    );
  };

  const categoryDeleteHandler = useCallback(
    (id) => {
      const removeCategory = () => {
        dispatch(closeDialog());
        dispatch(deleteCategory({ id }));
      };
      openSuccessSnackbar(
        removeCategory,
        DELETE_CATEGORY,
        DELETE_CATEGORY_MESSAGE,
        DELETE_CATEGORY
      );
    },
    [DELETE_CATEGORY, DELETE_CATEGORY_MESSAGE, dispatch, openSuccessSnackbar]
  );

  // NAME HANDLERS
  const hideAddNameForm = () => {
    setShowAddNameForm(false);
  };

  const handleAddName = () => {
    if (!showAddNameForm) {
      return setShowAddNameForm(true);
    }
    const nameIndex = newCategory.name.findIndex(
      (name) => name.lang === newName.lang
    );
    if (nameIndex >= 0) {
      return dispatch(
        setCategory({
          name: [
            ...newCategory.name.slice(0, nameIndex),
            newName,
            ...newCategory.name.slice(nameIndex + 1)
          ]
        })
      );
    }

    if (Object.keys(newName).every((key) => newName[key])) {
      dispatch(setCategory({ name: [...newCategory.name, newName] }));
      setNewName(nameModel);
    }
  };

  const handleNameChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setNewName({ ...newName, [inputName]: inputValue });
  };

  const handleNameEdit = (lang, value) => {
    setNewName({ lang, value });
  };

  // IMAGE HANDLERS
  const handleImageError = (e) => {
    e.target.src = AddPhoto;
  }

  const handleImageLoad = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCategoryImageUrl(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
      setUpload(e.target.files[0]);
    }
  };

  // PARENT CATEGORY HANDLERS
  const handleParentChange = (e) => {
    setParentId(e.target.value);
  };

  // SUBCATEGORY LIST []
  const subcategoryList = useMemo(() => {
    const mainCategory = categories.find((category) => category._id === id);
    return categories
      .filter(
        (subcategory) =>
          mainCategory && mainCategory.subcategories.includes(subcategory._id)
      )
      .map((subcategory, index) => (
        <TableContainerRow
          key={index}
          id={subcategory._id}
          image={subcategory.images.thumbnail || ''}
          name={subcategory.name[0].value}
          available={subcategory.available ? 'Так' : 'Ні'}
          deleteHandler={() => categoryDeleteHandler(subcategory._id)}
          editHandler={() => dispatch(push(`/add-category/${subcategory._id}`))}
        />
      ));
  }, [id, categories, dispatch, categoryDeleteHandler]);

  // CATEGORY NAME LIST []
  const categoryNameList = useMemo(
    () =>
      newCategory.name.map((nameItem, index) => (
        <TableContainerRow
          key={index}
          id={nameItem.lang}
          num={index + 1}
          lang={nameItem.lang}
          value={nameItem.value}
          deleteHandler={() =>
            dispatch(
              setCategory({
                name: [
                  ...newCategory.name.slice(0, index),
                  ...newCategory.name.slice(index + 1)
                ]
              })
            )
          }
          editHandler={() => handleNameEdit(nameItem.lang, nameItem.value)}
          showAvatar={false}
        />
      )),
    [newCategory, dispatch]
  );

  // STYLES
  const classes = useStyles();

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={classes.container}>
      <div>
        <FormControl className={classes.addForm}>
          <Grid container spacing={1}>
            <Grid item className={classes.wrapper}>
              <Paper className={classes.addFields}>
                <TextField
                  label={isMain ? 'Код категорії' : 'Код підкатегорії'}
                  variant='outlined'
                  name='code'
                  required
                  error={!codeIsValid && shouldValidate}
                  helperText={
                    !codeIsValid && shouldValidate
                      ? 'Введіть код категорії'
                      : ''
                  }
                  value={newCategory.code}
                  onChange={handleChange}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={newCategory.isMain}
                      name='isMain'
                      onChange={handleChange}
                    />
                  }
                  label='Основна категорія'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={newCategory.available}
                      name='available'
                      onChange={handleChange}
                    />
                  }
                  label={
                    isMain ? 'Категорія доступна' : 'Підкатегорія доступна'
                  }
                />
              </Paper>
              <Paper className={classes.addFields}>
                <Tabs
                  value={tabValue}
                  indicatorColor='primary'
                  textColor='primary'
                  onChange={handleTabChange}
                  aria-label='tabs'
                  className={classes.tabs}
                >
                  <Tab label='Назва' />
                  <Tab label='Зображення' />
                  {!isMain && <Tab label='Батьківська категорія' />}
                  {isMain && editMode && <Tab label='Підкатегорії' />}
                </Tabs>
                <TabPanel value={tabValue} index={0}>
                  <div>
                    <form autoComplete='on' className={classes.addNameForm}>
                      {showAddNameForm ? (
                        <>
                          <TextField
                            label='Мова'
                            variant='outlined'
                            name='lang'
                            value={newName.lang}
                            error={!nameIsValid && shouldValidate}
                            className={classes.addNameInput}
                            onChange={handleNameChange}
                            fullWidth
                          />
                          <TextField
                            label='Назва'
                            variant='outlined'
                            name='value'
                            error={!nameIsValid && shouldValidate}
                            helperText={
                              !nameIsValid && shouldValidate
                                ? "Ім'я повинно містити як мінімум 2 значення"
                                : ''
                            }
                            value={newName.value}
                            className={classes.addNameInput}
                            onChange={handleNameChange}
                            fullWidth
                          />
                        </>
                      ) : null}
                      <div className={classes.addNameBtnGroup}>
                        <Button
                          variant='contained'
                          color='primary'
                          className={classes.addNameBtn}
                          onClick={handleAddName}
                          fullWidth
                        >
                          {config.buttonTitles.ADD_CATEGORY_NAME}
                        </Button>
                        {showAddNameForm ? (
                          <>
                            <div className={classes.divider} />
                            <Button
                              variant='contained'
                              color='primary'
                              className={classes.addNameBtn}
                              onClick={hideAddNameForm}
                              fullWidth
                            >
                              {config.buttonTitles.CANCEL}
                            </Button>
                          </>
                        ) : null}
                      </div>
                    </form>
                    {categoryNameList.length ? (
                      <TableContainerGenerator
                        tableTitles={tableHeadRowTitles.categoryName}
                        tableItems={categoryNameList}
                      />
                    ) : null}
                  </div>
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                  <div className={classes.addImageForm}>
                    <div className={classes.imageContainer}>
                      <img
                        src={categoryImageUrl || AddPhoto}
                        alt='profile-logo'
                        className={classes.userImage}
                        onError={handleImageError}
                      />
                      <input
                        type='file'
                        className={classes.photoUpload}
                        id='photoUpload'
                        onChange={handleImageLoad}
                        multiple={false}
                        accept='image/*'
                      />
                      <label htmlFor='photoUpload' className={classes.uploadLabel}>
                        <Button component='span' className={classes.uploadBtn}>
                          {config.buttonTitles.ADD_PHOTO_LABEL}
                        </Button>
                      </label>
                    </div>
                  </div>
                </TabPanel>
                {!isMain && (
                  <TabPanel value={tabValue} index={2}>
                    <div>
                      <div className={classes.addImageForm}>
                        <FormControl
                          variant='outlined'
                          className={classes.imageSelect}
                        >
                          <Select
                            native
                            fullWidth
                            value={!parentId ? '' : parentId}
                            onChange={handleParentChange}
                          >
                            <option value='' disabled>
                              Оберіть батьківську категорію
                            </option>
                            {mainCategories.map((category) => (
                              <option key={category._id} value={category._id}>
                                {category.name[0].value}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                    </div>
                  </TabPanel>
                )}
                {isMain && editMode && (
                  <TabPanel value={tabValue} index={2}>
                    <div>
                      <TableContainerGenerator
                        tableTitles={tableHeadRowTitles.subcategories}
                        tableItems={subcategoryList}
                      />
                    </div>
                  </TabPanel>
                )}
              </Paper>
            </Grid>
          </Grid>
        </FormControl>
        <Button
          variant='contained'
          color='primary'
          className={classes.saveBtn}
          onClick={editMode ? handleCategoryEdit : handleCategorySave}
        >
          {buttonTitles.titleGenerator(editMode, isMain)}
        </Button>
      </div>
    </div>
  );
};

CategoriesAdd.propTypes = {
  id: PropTypes.string,
  editMode: PropTypes.bool
};

CategoriesAdd.defaultProps = {
  id: '',
  editMode: false
};

export default CategoriesAdd;
