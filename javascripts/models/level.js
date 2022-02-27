class Level {
    static all = []

    constructor(id, title, dance_classes = []) {
        this.id = id
        this.title = title
        this.dance_classes = dance_classes
        Level.all.push(this)
    }

    static getAll = () => {
        this.all
    }
}