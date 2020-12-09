export const contactId = '5c3c7929dd85de268bed4fe8';
export const mapImages = ['image1', 'image2'];
export const contactsPagesCount = 1;
export const contactsPerPage = 1;
export const contactsCurrentPage = 1;
export const error = { message: 'error' };
export const payload = {
  skip: 0,
  limit: 6,
  contactsPerPage: 1
};
export const newContact = {
  newContact: { ...contact },
  mapImages: []
};
export const contactRes = {
  items: [contact],
  count: 1
};

export const contact = {
  _id: '5c3c7929dd85de268bed4fe8',
  phoneNumber: '3801241242144',
  openHours: [
    { lang: 'ua', value: 'ПН ...' },
    { lang: 'en', value: 'FR ...' }
  ],
  address: [
    { lang: 'ua', value: 'Вулиця 3' },
    { lang: 'en', value: 'Street 3' }
  ],
  email: 'test@test.com',
  images: [
    { lang: 'ua', value: { medium: 'medium.jpg' } },
    { lang: 'en', value: { medium: 'medium.jpg' } }
  ],
  link: 'https://testURL.com'
};

export const updatedContact = {
  phoneNumber: '3809241242144',
  openHours: [
    { lang: 'ua', value: 'ПН ...' },
    { lang: 'en', value: 'FR ...' }
  ],
  address: [
    { lang: 'ua', value: 'updated' },
    { lang: 'en', value: 'updated' }
  ],
  email: 'updatedtest@test.com',
  images: [
    { lang: 'ua', value: { medium: 'updatedmedium.jpg' } },
    { lang: 'en', value: { medium: 'updatedmedium.jpg' } }
  ],
  link: 'https://testURL.com'
};

export const initialState = {
  contacts: [],
  contact: null,
  contactsLoading: false,
  contactsError: null,
  pagination: {
    contactsCurrentPage: 0,
    contactsPerPage: 6,
    contactPagesCount: 1
  }
};

export const getContacts = {
  skip: 1,
  limit: 1,
  contactsPerPage: 1
};
