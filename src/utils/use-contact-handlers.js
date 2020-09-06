import { useState } from 'react';

const useContactHandlers = () => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const [ukSchedule, ukSetSchedule] = useState('');
  const [enSchedule, enSetSchedule] = useState('');

  const [ukAddress, ukSetAddress] = useState('');
  const [enAddress, enSetAddress] = useState('');

  const [email, setEmail] = useState('');

  const [ukCartImage, ukSetCartImage] = useState('');
  const [enCartImage, enSetCartImage] = useState('');

  const [cartLink, setCartLink] = useState('');

  return {
    phoneNumber,
    ukSchedule,
    enSchedule,
    ukAddress,
    enAddress,
    email,
    ukCartImage,
    enCartImage,
    cartLink,
    setPhoneNumber,
    ukSetSchedule,
    enSetSchedule,
    ukSetAddress,
    enSetAddress,
    setEmail,
    ukSetCartImage,
    enSetCartImage,
    setCartLink
  };
};

export default useContactHandlers;
