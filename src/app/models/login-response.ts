export interface ILoginResponse {
    statusMessage : string,
    statusCode : string,
    jwtToken: string
    isAuthenticated:boolean
}