import {  createContext } from "react";
import { useQueryClient } from "react-query"
import * as SecureStore from 'expo-secure-store';

import { User } from "../types/user";
export const AuthContext = createContext<{
    user: User | null;
    setUser: (user: User | null) => void;
}>({
    user: null,
    setUser: (user: User | null) => {},
})