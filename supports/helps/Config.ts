export interface Config {
    env: {
        production: {
            url: string
            account: Account
        },
        staging: {
            url: string
            account: Account
        },
        default: {
            url: string,
            account: Account
        }
    },
    project: {
        setting: Setting
    }
}

export interface Account {
    username: string
    password: string
}

export interface Setting {
    delay: number
}