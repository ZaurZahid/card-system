import { Axios } from "../axios"

export const refreshTokenService = () => {
    Axios.post(`RefreshTokens?refreshToken=${localStorage.getItem('refreshToken')}`)
        .then(res => {
            if (res.data.statusCode === 200) {
                const { jwt } = res.data.result
                localStorage.setItem('token', jwt.token);
            }
        })
        .catch(e => console.log(e))
}