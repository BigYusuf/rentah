import { useContext } from "react"
import { useQueryClient } from "react-query"
import * as SecureStore from 'expo-secure-store';

import { AuthContext } from "../context/AuthContext"
import { User } from "../types/user"

export const useAuth = () => {
    const { user, setUser } = useContext(AuthContext);
    const queryClient = useQueryClient()

    const login = (user: User) =>{
        let stringUser = JSON.stringify(user);
        setUser(user);
        SecureStore.setItemAsync("user", stringUser);
        queryClient.refetchQueries();
    }

    const logout = () => {
        setUser(null);
        SecureStore.deleteItemAsync("user");
        queryClient.clear()
    }
    return { user , login, logout}
}