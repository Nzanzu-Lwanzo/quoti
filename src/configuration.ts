export default () => {
    return {
        jwt: {
            secret: process.env.SECRET,
            expiresIn: process.env.JWT_EXPIRES_IN
        },
        google: {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL
        }
    }
}