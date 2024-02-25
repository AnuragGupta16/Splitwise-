// authService.js

// Function to check if user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

// Function to get the token
export const getToken = () => {
  return localStorage.getItem('token');
};

// Function to set the token
export const setToken = (token) => {
  localStorage.setItem('token', token);
};

// Function to remove the token
export const removeToken = () => {
  localStorage.removeItem('token');
};
