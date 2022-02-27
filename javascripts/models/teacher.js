class Teacher {
    static all = []

    constructor(id, name, bio, dance_classes = []) {
        this.id = id
        this.name = name
        this.bio = bio
        this.dance_classes = dance_classes
        Teacher.all.push(this)
    }

    static getAll = () => {
        this.all
    }
}