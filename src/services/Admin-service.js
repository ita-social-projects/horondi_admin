import axios from 'axios';

import { config } from '../config';

const { serverUrl } = config.app;

export default class AdminService {
  token = localStorage.getItem('accessToken');

  getResource = async (url) => {
    try {
      const response = await axios.get(`${serverUrl}${url}`, {
        headers: { 'x-auth-token': this.token }
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  postData = async (url, dataToSend) => {
    const response = await axios.post(`${serverUrl}${url}`, dataToSend, {
      headers: { 'x-auth-token': this.token }
    });
    return response.data;
  };

  putData = async (url, dataToSend) => {
    try {
      const response = await axios.put(`${serverUrl}${url}`, dataToSend, {
        headers: { 'x-auth-token': this.token }
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  deleteResource = async (url) => {
    try {
      const response = await axios.delete(`${serverUrl}${url}`, {
        headers: { 'x-auth-token': this.token }
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
}
