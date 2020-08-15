import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useUsersHandler = (id) => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [adress, setAdress] = useState('');
  const [postCode, setPostCode] = useState('');

  useEffect(() => {
    dispatch();
  }, [dispatch, id]);

  useEffect(() => {}, [
    setFirstName,
    setLastName,
    setCountry,
    setCity,
    setAdress,
    setPostCode
  ]);

  return {
    firstName,
    lastName,
    country,
    city,
    adress,
    postCode
  };
};

export default useUsersHandler;
