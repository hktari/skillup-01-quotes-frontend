import React from 'react'
import authApi from '../services/authApi'
import { User } from '../services/interface';

export interface AuthContextType {
    user: any;
    login: (username: string, pwd: string) => Promise<User>;
    logout: () => Promise<any>;
}

var AuthContext = React.createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode }) {
    let [user, setUser] = React.useState<any>(null);

    let login = async (username: string, pwd: string) => {
        const user = await authApi.login(username, pwd)
        setUser(user);
        return user;
    }
    let logout = async () => {
        await authApi.logout()
        setUser(null);
    };

    let value = { user, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}


export function useAuth() {
    return React.useContext(AuthContext);
  }

export default AuthProvider