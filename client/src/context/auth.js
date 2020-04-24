import React, { useReducer, createContext } from "react";
import jwtDecode from "jwt-decode";

const initialState = {
  user: null,
  employeeAuth: null,
};

if (localStorage.getItem("jwtToken")) {
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
  } else {
    initialState.user = decodedToken;
  }
}

if (localStorage.getItem("jwtTokenEmployee")) {
  const decodedEmployeeToken = jwtDecode(
    localStorage.getItem("jwtTokenEmployee")
  );

  if (decodedEmployeeToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtTokenEmployee");
  } else {
    initialState.employeeAuth = decodedEmployeeToken;
  }
}

const AuthContext = createContext({
  user: null,
  employeeAuth: null,
  login: (userData) => {},
  employeeLogin: (employeeData) => {},
  logout: () => {},
  employeeLogout: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    case "EMPLOYEE_LOGIN":
      return {
        ...state,
        employeeAuth: action.payload,
      };
    case "EMPLOYEE_LOGOUT":
      return {
        ...state,
        employeeAuth: null,
      };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function login(userData) {
    localStorage.setItem("jwtToken", userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  }

  function logout() {
    localStorage.removeItem("jwtToken");
    dispatch({
      type: "LOGOUT",
    });
  }

  function employeeLogin(employeeData) {
    localStorage.setItem("jwtTokenEmployee", employeeData.employeeToken);
    dispatch({
      type: "EMPLOYEE_LOGIN",
      payload: employeeData,
    });
  }

  function employeeLogout() {
    localStorage.removeItem("jwtTokenEmployee");
    dispatch({
      type: "EMPLOYEE_LOGOUT",
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        employeeAuth: state.employeeAuth,
        login,
        logout,
        employeeLogin,
        employeeLogout,
      }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
