import { createContext, useContext, useState } from "react";
import axios from '../common/axiosInstance';
import { SESSION_STORAGE_KEY } from "../constants/Constants";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {

    const getCurrentUser = () => {
        const user = localStorage.getItem(SESSION_STORAGE_KEY);
        if(user) {
            return JSON.parse(user);
        } else {
            return null;
        }
    }

    const setCurrentUser = (user) => {
        localStorage.setItem('sasta-coupon-app', JSON.stringify(user));
        axios.interceptors.request.use((config) => {
            if(config && config.headers) {
                config.headers.Authorization = `Bearer ${user.token}`
            }
            return config;
        })
    }

    const signIn = async (email, password) => {
        return await axios.post('/logIn', {
            email: email,
            password: password
        }, ).then(response => {
            if(response.status === 200) {
                setCurrentUser(response.data);
                return 'Success'
            } else {
                return 'User Not found';
            }
        }).catch(() => "User not found");
    }

    const signUp = async (email, password) => {
        return await axios.post('/signUp', {
            email: email,
            password: password
        }).then(response => {
            if(response.status === 200) {
                setCurrentUser(response.data);
                return 'Success'
            } else {
                return 'User already exist';
            }
        }).catch(() => 'Unexpected erorr occured. Please try again')
    }

    const logOut = () => {
        localStorage.removeItem(SESSION_STORAGE_KEY);
        window.location.href='/SastaCouponFrontEnd/';
    }

    const value = {
        signIn,
        signUp,
        logOut,
        getCurrentUser
    }

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}