import { useState } from 'react';

const useUserHandlers = () => {
  const [tabsValue, setTabsValue] = useState(0);
  const [userImage, setUserImage] = useState('');
  const [upload, setUpload] = useState({});
  const [imageName] = useState('');
  const handleTabsChange = (event, newValue) => {
    setTabsValue(newValue);
  };

  const createUser = (values) => ({
    firstName: values.userFirstName,
    lastName: values.userLastName,
    email: values.email,
    phoneNumber: values.phoneNumber,
    address: {
      country: values.country,
      region: values.region,
      city: values.city,
      street: values.street,
      buildingNumber: values.buildingNumber,
      appartment: values.appartment,
      zipcode: values.zipcode
    }
  });

  return {
    tabsValue,
    setTabsValue,
    userImage,
    setUserImage,
    upload,
    setUpload,
    imageName,
    handleTabsChange,
    createUser
  };
};

export default useUserHandlers;
