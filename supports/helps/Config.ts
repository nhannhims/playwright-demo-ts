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
    }
}

export interface Account {
    username: string
    password: string
}