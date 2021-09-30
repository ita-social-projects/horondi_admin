import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../redux/users/users.actions';

export const useUsersHandler = (id) => {
  const dispatch = useDispatch();

  const { user } = useSelector(({ Users }) => ({
    user: Users.user
  }));

  const [images, setImages] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [adress, setAdress] = useState('');
  const [postCode, setPostCode] = useState('');
  const [email, setEmail] = useState('');
  const [isBanned, setBan] = useState({});
  const [confirmed, setConfirmed] = useState(false);
  const [phone, setPhone] = useState('');

  useEffect(() => {
    dispatch(getUser(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (user !== null) {
      setImages(user.images?.medium || '');
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setCountry(user.address && user.address.country);
      setCity(user.address && user.address.city);
      setAdress(
        user.address &&
          `${user.address.street}, ${user.address.buildingNumber}/${user.address.appartment}`
      );
      setPostCode(user.address && user.address.zipcode);
      setBan(user.banned);
      setConfirmed(user.confirmed);
      setEmail(user.email);
      setPhone(user.phoneNumber);
    }
  }, [user]);

  return {
    images,
    firstName,
    lastName,
    country,
    city,
    adress,
    postCode,
    email,
    isBanned,
    confirmed,
    phone
  };
};
