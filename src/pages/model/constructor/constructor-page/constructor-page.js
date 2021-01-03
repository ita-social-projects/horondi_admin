import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppBar, Tab, Tabs } from '@material-ui/core';
import { push } from 'connected-react-router';
import { selectModels } from '../../../../redux/selectors/model.selectors';
import { useStyles } from './constructor-page.styles';
import { useCommonStyles } from '../../../common.styles';
import { config } from '../../../../configs';
import TabPanel from '../../../../components/tab-panel';
import { BackButton } from '../../../../components/buttons';
import TableContainerRow from '../../../../containers/table-container-row';

const { constructorBasic, constructorBottom, constructorPattern, constructorFrontPocket } = config.labels.model;
const ConstructorPage = () => {
  const styles = useStyles();
  const commonStyles = useCommonStyles();
  const [tabsValue, setTabsValue] = useState(0);
  const {
    model,
    loading
  } = useSelector(selectModels);

  const constructorOptions = {
    constructorBasic: {
      label: constructorBasic
    },
    constructorPattern: {
      label: constructorPattern
    },
    constructorFrontPocket: {
      label: constructorFrontPocket
    },
    constructorBottom: {
      label: constructorBottom
    }
  };

  const modelItems = (list) =>  list !== undefined
    ? list.map((listItem) => (
      <TableContainerRow
        image={
          listItem.images
            ? `${config.IMG_URL}${listItem.images.thumbnail}`
            : ''
        }
        key={listItem._id}
        id={listItem._id}
        name={listItem.name[0].value}
        category={listItem.category.name[0].value}
        show={
          listItem.show
            ? config.labels.model.showEnable
            : config.labels.model.showDisable
        }
        priority={listItem.priority}
        // deleteHandler={() => modelDeleteHandler(modelItem._id)}
        editHandler={() => {
          // dispatch(push(`/models/${modelItem._id}`));
        }}
      />
    ))
    : null

  const handleTabsChange = (event, newValue) => {
    setTabsValue(newValue);
  };

  const constructorTabs = Object.values(
    constructorOptions
  ).map(({ label }) => <Tab label={label} key={label} />);

  return (
    <div className={commonStyles.container}>
      <div className={styles.backButton}>
        <BackButton />
      </div>
      <AppBar position='static'>
        <Tabs
          className={styles.tabs}
          value={tabsValue}
          onChange={handleTabsChange}
          aria-label='simple tabs example'
        >
          {constructorTabs}
        </Tabs>
      </AppBar>
      {Object.values(
        constructorOptions
      ).map(
        ({
          label
        }, index) => (
          <TabPanel key={label} value={tabsValue} index={index}>
            {label}
          </TabPanel>
        )
      )}
    </div>
  );
};

export default ConstructorPage;
