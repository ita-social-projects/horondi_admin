const detailTitles = {
  users: {
    avatar: { id: 'avatar' },
    name: { id: 'name' },
    status: { id: 'status' },
    primarySection: [
      { id: 'country', label: 'Країна' },
      { id: 'city', label: 'Місто' }
    ],
    secondarySection: [
      { id: 'adress', label: 'Адреса' },
      { id: 'postCode', label: 'Поштовий індекс' }
    ]
  },
  emailQuestions: {
    customer: {
      date: 'Дата запитання:',
      status: 'Статус:',
      sender: 'Відправник:',
      email: 'Email:',
      question: 'Запитання:'
    },
    admin: {
      date: 'Дата відповіді:',
      admin: 'Адмін:',
      answer: 'Відповідь:'
    }
  }
};

export default detailTitles;
