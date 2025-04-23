export default () => {
    return {
        jwt: {
            secret: process.env.SECRET
        }
    }
}