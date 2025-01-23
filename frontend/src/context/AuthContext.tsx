import { createContext, ReactNode, useContext, useReducer } from "react";

type UserRole = "admin" | "user" | null;

interface AuthState {
  role: UserRole;
}

type AuthAction = { type: "LOGIN"; role: UserRole } | { type: "LOGOUT" };

const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "LOGIN":
      return { role: action.role };
    case "LOGOUT":
      return { role: null };
    default:
      return state;
  }
};

const AuthContext = createContext<{
  state: AuthState;
  login: (role: UserRole) => void;
  logout: () => void;
} | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, { role: null });

  const login = (role: UserRole) => {
    dispatch({ type: "LOGIN", role });
  };
  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
