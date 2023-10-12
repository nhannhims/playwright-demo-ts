export interface Config {
    env: {
        production: {
            url: string
            account: Account
        },
        staging: {
            url: string
            account: Account
        }
    },
    project: {
        delay: number
    }
}

export interface Account {
    username: string
    password: string
}