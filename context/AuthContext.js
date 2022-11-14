import { createContext, useReducer } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...action.payload,
      };
      console.log(action);
      switch (action.type) {
        case "LOGIN":
          return {
            ...action.payload,
          };

        case "LOGOUT":
          return { user: null, token: null };

        default:
          return state;
      }
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    token: null,
    refreshToken: null,
    expireDate: null,
  });

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
