const detailTitles = {
  users: {
    avatar: { id: 'avatar' },
    name: { id: 'name' },
    status: { id: 'status' },
    sections: [
      { id: 'phone', label: 'Телефон' },
      { id: 'country', label: 'Країна' },
      { id: 'city', label: 'Місто' },
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
