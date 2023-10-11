import { Config } from './helps/Config'

const projectConfig: Config = {
    env: {
        production: {
            url: "https://flymee.jp",
            account: {
                username: "huunhanproduction",
                password: "Admin@123"
            }
        },
        staging: {
            url: "https://playwright.dev",
            account: {
                username: "huunhanstaging",
                password: "Admin@123"
            }
        }
    }
}

export default projectConfig