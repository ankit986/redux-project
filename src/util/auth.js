class auth {
    constructor() {
        this.authenticated = false
    }
    logout(cb) {
        this.authenticated = false;
        cb()
    }
    login(cb) {
        this.authenticated = true;
        cb()
    }
    isAuthenticated() {
        return this.authenticated
    }
}

export default new auth();