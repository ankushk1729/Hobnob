import cookie from 'js-cookie'

export const setToken = (token) => {
    cookie.set('token',token)    
}

export const removeToken = () => {
    cookie.remove('token')
}