/**
 * Decodes a JWT token and checks its expiration.
 * @param {string} token The JWT token to validate.
 * @returns {boolean} True if the token is valid, false otherwise.
 */
const isTokenValid = (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
  
      const currentTime = Date.now() / 1000;
      const expirationTime = payload.exp;
  
      return expirationTime > currentTime;
    } catch (error) {
      return false;
    }
  };
  
  export const getAuthToken = () => {
    const token = localStorage.getItem("auth_token");
  
    if (token && isTokenValid(token)) {
      return token;
    }
  
    return null;
  };