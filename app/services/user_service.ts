import axios from "axios";

export default class UserService {

  static async fetchUsers() {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error.message);
    }
  }

  async createUser() {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/users', {
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
      });
      console.log('User created:', response.data);
    } catch (error) {
      console.error('Error creating user:', error.message);
    }
  }

  async fetchWithHeaders() {
    try {
      const response = await axios.get('https://api.example.com/data', {
        headers: {
          Authorization: 'Bearer YOUR_TOKEN',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  }
  
  
  async fetchWithQueryParams() {
    try {
      const response = await axios.get('https://api.example.com/data', {
        params: {
          filter: 'active',
          limit: 10,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  }
  
  
}