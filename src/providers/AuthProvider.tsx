
import { AuthContext } from '../contexts/AuthContext';
import { Provider } from '../types/provider.type';
import useAuth from '../hooks/useAuth'

export default function AuthProvider({ children }: Provider) {

    const { auth, register, login, logout } = useAuth();
  
  return (
    <AuthContext.Provider
      value={{
        auth,
        register,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
  
}