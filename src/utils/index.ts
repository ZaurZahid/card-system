export const getAccessToken = () => localStorage.getItem('token')
export const getRefreshToken = () => localStorage.getItem('refreshToken')
export const getUserId = () => localStorage.getItem('userId');

export const setAccessToken = (val: string) => localStorage.setItem('token', val)
export const setRefreshToken = (val: string) => localStorage.setItem('refreshToken', val)
export const setUserId = (val: string) => localStorage.setItem('userId', val)

export const removeAccessToken = () => localStorage.removeItem('token')
export const removeRefreshToken = () => localStorage.removeItem('refreshToken')
export const removeUserId = () => localStorage.removeItem('userId')

export const getJWT = () => {
    return {
        headers: {
            'Authorization': getAccessToken() ? `Bearer ${getAccessToken()}` : ''
        }
    }
}