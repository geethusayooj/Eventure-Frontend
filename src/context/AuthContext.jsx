import { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProviderWrapper = ({ children }) => {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated ] = useState(false)
  const [token, setToken] = useState()

  const authenticateUser = () => {           //  <==  ADD  
    // Get the stored token from the localStorage
    const storedToken = localStorage.getItem('authToken');
    
    // If the token exists in the localStorage
    if (storedToken) {
      // We must send the JWT token in the request's "Authorization" Headers
      axios.get(
        `/api/auth/verify`, 
        { headers: { Authorization: `Bearer ${storedToken}`} }
      )
      .then((response) => {
        // If the server verifies that the JWT token is valid  
        const user = response.data;
       // Update state variables        
        setToken(storedToken)
        setUser(user);  
        setIsAuthenticated(true)     
      })
      .catch((error) => {
        // If the server sends an error response (invalid token) 
        // Update state variables         
        setToken()
        setUser(null); 
        setIsAuthenticated(false)        
      });      
    } else {
      // If the token is not available (or is removed)
        setToken()
        setUser(null);
        setIsAuthenticated(false)       
    }   
  }
  // Log out the user
  const logout = () => {
    setUser({});
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('authToken');  // Remove token from localStorage
  };

  
  useEffect(() => {                
  authenticateUser()
  }, []);
 

  return (
    <AuthContext.Provider value={{ user, isAuthenticated , token, authenticateUser,  logout }}>
      {children}
    </AuthContext.Provider>
  );
};