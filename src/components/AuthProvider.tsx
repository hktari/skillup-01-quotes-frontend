import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import authApi from '../services/authApi'
import { User } from '../services/interface';

export interface AuthContextType {
    user: User | null;
    login: (username: string, pwd: string) => Promise<User>;
    logout: () => Promise<any>;
    isLoggedIn: () => boolean
    updateProfile: (email: string, username: string, userProfileImg: any) => void
}

var AuthContext = React.createContext<AuthContextType>({ user: null, login: null!, logout: null!, isLoggedIn: () => false, updateProfile: null! });

function AuthProvider({ children }: { children: React.ReactNode }) {
    let [user, setUser] = React.useState<User | null>(null);

    let login = async (username: string, pwd: string) => {
        const user = await authApi.login(username, pwd)
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        return user;
    }
    let logout = async () => {
        await authApi.logout()
        setUser(null);
        localStorage.setItem("user", "");
    };

    const updateProfile = async (email: string, username: string, userProfileImg: any) => {
        const userUpdate = await authApi.updateProfile(email, username, userProfileImg)
        setUser(userUpdate)
    }

    let isLoggedIn = () => user !== null;

    let value = { user, login, logout, isLoggedIn, updateProfile };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}


export function useAuth() {
    return React.useContext(AuthContext);
}

export function RequireAuth({ children }: { children: JSX.Element }) {
    let auth = useAuth();
    let location = useLocation();

    if (!auth.isLoggedIn()) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

export default AuthProvider