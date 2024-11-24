import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(sessionStorage.getItem("token")|| '');
    const [id, setId] = useState(sessionStorage.getItem("id")|| '');
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return sessionStorage.getItem("isAuthenticated") === "true";
    })
    const login = async (data) => {
        try {
          const response = await axios.post('http://localhost:8080/api/user/login', data);
          if (response.status === 200 || response.status === 201) {
            sessionStorage.setItem("isAuthenticated", true);
            setUser(response.data.user);
            setToken(response.data);
            sessionStorage.setItem("token", response.data);
            setIsAuthenticated(true);
            try {
              const id = await axios.post(`http://localhost:8080/api/user/setIDsession`, data, {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                }
              });
              if (id.status === 200 || id.status === 201) {
                setId(id.data);
                sessionStorage.setItem("id", id.data);
              } else {
                return "Failed to set ID session";
              }
            } catch (error) {
              console.log(error);
              return "Failed to set ID session";
            }
          } else {
            return response.data;
          }
        } catch (error) {
          console.log(error);
          return "Invalid email or password";
        }
      }
    const logout = () => {
        setUser(null);
        setToken('');
        setId('');
        sessionStorage.removeItem("id");
        sessionStorage.removeItem("token");
        sessionStorage.setItem("isAuthenticated", false);
        setIsAuthenticated(false);
    }
    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout , token, user}}>
            {children}
        </AuthContext.Provider>
    )
}