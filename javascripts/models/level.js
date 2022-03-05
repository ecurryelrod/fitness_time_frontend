class Level {
    static all = []

    constructor(levelObj) {
        this.id = levelObj.id
        this.title = levelObj.attributes.title
        this.dance_classes = levelObj.attributes.dance_classes
    }

    // constructor(id, title, dance_classes = []) {
    //     this.id = id
    //     this.title = title
    //     this.dance_classes = dance_classes
    //     Level.all.push(this)
    // }

    static getAll = () => {
        this.all
    }
}