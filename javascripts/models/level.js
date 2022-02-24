class Level {
    static all = []

    constructor(id, title) {
        this.id = id
        this.title = title
        Level.all.push(this)
    }

    static getAll = () => {
        this.all
    }
}