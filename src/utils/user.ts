import Cookies from "js-cookie";

export const setUserToken = (value: string) => {
    Cookies.set('token', value)
}

export const getUserToken = () => {
   return Cookies.get('token')
}

export const removeUserToken = () => {
    return Cookies.remove('token')
 }