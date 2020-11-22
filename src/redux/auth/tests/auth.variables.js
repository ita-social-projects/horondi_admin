const email = 'test@gmail.com';
const password = 'testpass';
const token = '1111bGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
const userId = '1111bGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
const loginData = {
  data: {
    loginAdmin: {
      token,
      _id: userId
    }
  }
};
export { email, password, token, userId, loginData };
