export const telephoneNumber = /^\+380\(\d{2}\)-\d{3}-\d{2}-\d{2}$/g;
export const email =
  /^((([0-9A-Za-z]{1}[-0-9A-z]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u;
export const textString = /^[а-яіїА-Яa-zA-Z0-9.,)( ]+$/;
export const phoneNumber = '380961737361';
export const uaSchedule =
  'Пн: 10:00 - 19:00|Вт: 10:00 - 19:00|Ср: 10:00 - 19:00|Чт: 10:00 - 19:00|Пт: 10:00 - 19:00|Сб: Вихідний|Нд: Вихідний';
export const enSchedule =
  'Mon: 10 a.m. - 7 p.m.|Tue: 10 a.m. - 7 p.m.|Wed: 10 a.m. - 7 p.m.|Thu: 10 a.m. - 7 p.m.|Fri: 10 a.m. - 7 p.m.|Sat: Closed|Sun: Closed';
export const uaAddress = 'Львів, вул. Заводська, 31';
export const enAddress = 'Lviv, 31 Zavodska Str.';
export const contactToAdd = [
  {
    _id: '5fa034049a59a906f0610e42',
    contactNumber: '380961234567',
    scheduleUa:
      'Пн: 10:00 - 19:00|Вт: 10:00 - 19:00|Ср: 10:00 - 19:00|Чт: 10:00 - 19:00|Пт: 10:00 - 19:00|Сб: Вихідний|Нд: Вихідний',
    scheduleEn:
      'Mon: 10 a.m. - 7 p.m.|Tue: 10 a.m. - 7 p.m.|Wed: 10 a.m. - 7 p.m.|Thu: 10 a.m. - 7 p.m.|Fri: 10 a.m. - 7 p.m.|Sat: Closed|Sun: Closed',
    addressUa: 'Львів, вул.',
    addressEn: 'Lviv, Str.',
    email: 'horondi@gmail.com',
    mapLink:
      'https://www.google.com.ua/maps/@49.8282899,24.0034943,12.75z?hl=ru'
  },
  {
    _id: '5fa034049a59a906f0610e43',
    contactNumber: '380967654321',
    scheduleUa:
      'Пн: 8:00 - 19:00|Вт: 8:00 - 19:00|Ср: 11:00 - 19:00|Чт: 9:00 - 19:00|Пт: 8:00 - 19:00|Сб: Вихідний|Нд: Вихідний',
    scheduleEn:
      'Mon: 8 a.m. - 7 p.m.|Tue: 8 a.m. - 7 p.m.|Wed: 9 a.m. - 7 p.m.|Thu: 10 a.m. - 7 p.m.|Fri: 8 a.m. - 7 p.m.|Sat: Closed|Sun: Closed',
    addressUa: 'Киев, вул.',
    addressEn: 'Kyev, Str.',
    email: 'Horondi@gmail.com',
    mapLink:
      'https://www.google.com.ua/maps/@50.4782429,30.4822679,12.25z?hl=ru'
  }
];
export const contacts = {
  items: [
    {
      _id: '5fa034049a59a906f0610e41',
      phoneNumber: '380961737361',
      openHours: [
        {
          lang: 'ua',
          value:
            'Пн: 10:00 - 19:00|Вт: 10:00 - 19:00|Ср: 10:00 - 19:00|Чт: 10:00 - 19:00|Пт: 10:00 - 19:00|Сб: Вихідний|Нд: Вихідний'
        },
        {
          lang: 'en',
          value:
            'Mon: 10 a.m. - 7 p.m.|Tue: 10 a.m. - 7 p.m.|Wed: 10 a.m. - 7 p.m.|Thu: 10 a.m. - 7 p.m.|Fri: 10 a.m. - 7 p.m.|Sat: Closed|Sun: Closed'
        }
      ],
      address: [
        {
          lang: 'ua',
          value: 'Львів, вул. Заводська, 31'
        },
        {
          lang: 'en',
          value: 'Lviv, 31 Zavodska Str.'
        }
      ],
      email: 'horondi@gmail.com',
      link: 'https://g.page/horondi?share'
    }
  ],
  count: 1
};
export const getContacts = (req) => {
  req.reply({
    body: {
      data: {
        getContacts: contacts
      }
    }
  });
};
export const addContact = (req) => {
  contacts.push({
    _id: contactToAdd[0]._id,
    phoneNumber: contactToAdd[0].contactNumber,
    openHours: [
      {
        lang: 'ua',
        value: contactToAdd[0].scheduleUa
      },
      {
        lang: 'en',
        value: contactToAdd[0].scheduleEn
      }
    ],
    address: [
      {
        lang: 'ua',
        value: contactToAdd[0].addressUa
      },
      {
        lang: 'en',
        value: contactToAdd[0].addressEn
      }
    ],
    email: contactToAdd[0].email,
    link: contactToAdd[0].mapLink
  });
  req.reply({
    body: {
      data: {
        addContacts: contactToAdd[0]
      }
    }
  });
};
export const getContactById = (req) => {
  req.reply({
    body: {
      data: {
        getContactById: {
          ...contactToAdd
        }
      }
    }
  });
};
export const updateContact = (req) => {
  contacts.pop();
  contacts.push({});
  req.reply({
    body: {
      data: {
        updateContact: contacts
      }
    }
  });
};
export const deleteContact = (req, _id) => {
  req.reply({
    body: {
      data: {
        deleteContact: _id
      }
    }
  });
};
