import axios from 'axios';

const API_URL = 'http://localhost:5000/api/employees';

export const fetchUsers = () => axios.get(API_URL);
export const addUser = (user) => axios.post(API_URL, user);
  export const deleteUser = (id) => axios.delete(`${API_URL}/${id}`);


  export const updateUser = async (id, updatedUser) => {
    console.log(updatedUser); // Log the actual updated user data
    return axios.put(`${API_URL}/${id}`, updatedUser); // Send the correct request to update the user
  };
  