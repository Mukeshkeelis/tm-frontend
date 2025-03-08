import axios from "axios";
// const BASEURL = 'http://127.0.0.1:8000/graphql/'
// const BASEURL = 'http://192.168.0.187:8000/graphql/'
// const BASEURL = 'http://10.10.1.100:8000/graphql/'
 
 
 
export const BASE_URL = 'https://tm-render-7x9s.onrender.com/api/';
// export const BASE_URL = 'http://localhost:8000/api/';

 
// Base URL and apiClient configuration
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Authorization":"Bearer"+" "+sessionStorage.getItem('access'),
    "Content-Type": "application/json",
  },
});
 
// Add an interceptor to attach the token dynamically
// apiClient.interceptors.request.use(
//   (config) => {
//     const token = sessionStorage.getItem("token");
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
 
 
// API methods
export const loginPostData = async (endpoint, data) => {
  try {
    const response = await axios.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};
 
export const fetchData = async (endpoint) => {
  try {
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
 
export const fetchDataById = async (endpoint) => {
  try {
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("Error fetching data by ID:", error);
    throw error;
  }
};
 
export const postData = async (endpoint, data) => {
  try {
    const response = await apiClient.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};
 
export const putData = async (endpoint, data) => {
  try {
    const response = await apiClient.put(endpoint, data);
    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};
 
export const deleteData = async (endpoint) => {
  try {
    const response = await apiClient.delete(endpoint);
    return response.data;
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
};

export const logOut = async (endpoint, data) =>{
  try {
    const response = await apiClient.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
}
 
//------ how to use -------
 
//Fetching Data(get):
// const fetchDataExample = async () => {
//   try {
//     const data = await fetchData('some-endpoint');
//     console.log('Fetched Data:', data);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// };
 
//Fetching Data by ID(get by id):
 
// const fetchByIdExample = async (id) => {
//   try {
//     const data = await fetchDataById(`some-endpoint/${id}`);
//     console.log('Fetched Data by ID:', data);
//   } catch (error) {
//     console.error('Error fetching data by ID:', error);
//   }
// };
 
// Posting Data:
// const postDataExample = async () => {
//   const payload = { key: 'value' };
//   try {
//     const response = await postData('some-endpoint', payload);
//     console.log('Post Response:', response);
//   } catch (error) {
//     console.error('Error posting data:', error);
//   }
// };
 
// Updating Data:
// const putDataExample = async (id) => {
//   const payload = { key: 'updatedValue' };
//   try {
//     const response = await putData(`some-endpoint/${id}`, payload);
//     console.log('Update Response:', response);
//   } catch (error) {
//     console.error('Error updating data:', error);
//   }
// };
 
// Deleting Data:
// const deleteDataExample = async (id) => {
//   try {
//     const response = await deleteData(`some-endpoint/${id}`);
//     console.log('Delete Response:', response);
//   } catch (error) {
//     console.error('Error deleting data:', error);
//   }
// };


export default BASE_URL