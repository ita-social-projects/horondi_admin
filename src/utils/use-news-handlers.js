import { useState } from 'react';

const useNewsHandlers = () => {
  const [authorPhoto, setAuthorPhoto] = useState('');
  const [newsImage, setNewsImage] = useState('');
  const [newsVideo, setNewsVideo] = useState('');

  const [ukAuthorName, ukSetAuthor] = useState('');
  const [ukText, ukSetText] = useState('');
  const [ukTitle, ukSetTitle] = useState('');

  const [enAuthorName, enSetAuthor] = useState('');
  const [enText, enSetText] = useState('');
  const [enTitle, enSetTitle] = useState('');

  const [tabsValue, setTabsValue] = useState(0);
  const [checkboxes, setCheckboxes] = useState({});
  const [preferredLanguages, setPreferredLanguages] = useState([]);

  return {
    checkboxes,
    authorPhoto,
    newsImage,
    newsVideo,
    ukAuthorName,
    ukText,
    ukTitle,
    enAuthorName,
    enText,
    enTitle,
    preferredLanguages,
    tabsValue,
    setAuthorPhoto,
    setNewsImage,
    setNewsVideo,
    ukSetAuthor,
    ukSetText,
    ukSetTitle,
    enSetAuthor,
    enSetText,
    enSetTitle,
    setPreferredLanguages,
    setTabsValue,
    setCheckboxes
  };
};

export default useNewsHandlers;
