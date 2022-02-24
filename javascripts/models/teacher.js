class Teacher {
    static all = []

    constructor(id, name, bio) {
        this.id = id
        this.name = name
        this.bio = bio
        Teacher.all.push(this)
    }

    static getAll = () => {
        this.all
    }
}