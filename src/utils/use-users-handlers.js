import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../redux/users/users.actions';

const useUsersHandler = (id) => {
  const dispatch = useDispatch();

  const { user } = useSelector(({ Users }) => ({
    user: Users.user
  }));

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [adress, setAdress] = useState('');
  const [postCode, setPostCode] = useState('');

  const [isBanned, setBan] = useState('');

  useEffect(() => {
    dispatch(getUser(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (user !== null) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setCountry(user.address.country);
      setCity(user.address.city);
      setAdress(
        `${user.address.street}, ${user.address.buildingNumber}/${user.address.appartment}`
      );
      setPostCode(user.address.zipcode);
      setBan(user.banned);
    }
  }, [
    user,
    setFirstName,
    setLastName,
    setCountry,
    setCity,
    setAdress,
    setPostCode,
    setBan
  ]);

  return {
    firstName,
    lastName,
    country,
    city,
    adress,
    postCode,
    isBanned
  };
};

export default useUsersHandler;
