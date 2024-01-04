import {cleanEnv, str} from 'envalid'

export default cleanEnv(process.env, {
    MONGO_URL: str(),
    SESSION_SECRET: str(),
    EMAIL_USER: str(),
    EMAIL_PASSWORD: str(),
})