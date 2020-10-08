export const contactId = '5c3c7929dd85de268bed4fe8';
export const mapImages = ['image1', 'image2'];
export const contactsPagesCount = 1;
export const contactsPerPage = 1;
export const contactsCurrentPage = 1;

export const contact = {
  _id: '5c3c7929dd85de268bed4fe8',
  phoneNumber: '3801241242144',
  openHours: [
    { lang: 'uk', value: 'ПН ...' },
    { lang: 'en', value: 'FR ...' }
  ],
  address: [
    { lang: 'uk', value: 'Вулиця 3' },
    { lang: 'en', value: 'Street 3' }
  ],
  email: 'test@test.com',
  images: [
    { lang: 'uk', value: { medium: 'medium.jpg' } },
    { lang: 'en', value: { medium: 'medium.jpg' } }
  ],
  link: 'https://testURL.com'
};

export const updatedContact = {
  phoneNumber: '3809241242144',
  openHours: [
    { lang: 'uk', value: 'ПН ...' },
    { lang: 'en', value: 'FR ...' }
  ],
  address: [
    { lang: 'uk', value: 'updated' },
    { lang: 'en', value: 'updated' }
  ],
  email: 'updatedtest@test.com',
  images: [
    { lang: 'uk', value: { medium: 'updatedmedium.jpg' } },
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

export const allContactsMock = {
  data: {
    getContacts: {
      contact
    }
  }
};

export const contactByIdMock = {
  data: {
    getContactById: {
      contact
    }
  }
};

export const contactDeleteIdMock = {
  data: {
    deleteContact: {
      contact
    }
  }
};

export const contactUpdateMock = {
  data: {
    updateContact: {
      contact
    }
  }
};

export const getContactsMock = {
  skip: 1,
  limit: 1,
  contactsPerPage: 1
};
