import { type MockMethod } from 'vite-plugin-mock'

export default [
    {
        url: '/api/user/login"',
        method: 'post',
        response: () => {
            return {
                code: 200,
                message: 'success',
                data: {
                    token: "Token"
                }
            }
        }
    }
] as MockMethod[] 
