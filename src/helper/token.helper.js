// jwt token getter setter
export const getToken = () => {
  return localStorage.getItem('token');
}
// set token to local storage
export const setToken = (token) => {
  localStorage.setItem('token', token);
}

// remove token from local storage
export const removeToken = () => {
  localStorage.removeItem('token');
}
// clear local storage
export const clearStorage = () => {
  localStorage.clear();
}



// roles token getter setter 

export const getUserRole = () => {
  return localStorage.getItem('userRole');
}
// set token to local storage
export const setUserRole = (userRole) => {
  localStorage.setItem('userRole', userRole);
}
// remove token from local storage
export const removeUserRole = () => {
  localStorage.removeItem('user');
}

// user name getter setter 


export const getUserName = () => {
  return localStorage.getItem('username');
}
// set token to local storage
export const setUserName = (userName) => {
  localStorage.setItem('username', userName);
}
// remove token from local storage
export const removeUserName = () => {
  localStorage.removeItem('userName');
}

export const setTermsAndCondition = (aggreed) => {
  localStorage.setItem('isAggreed', aggreed)
}
export const getTermsAndCondition = () => {
  return localStorage.getItem('isAggreed')
}