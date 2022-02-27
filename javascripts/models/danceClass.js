class DanceClass {
    static all = []

    constructor(id, title, description, date, start_time, end_time, price, teacher_id, level_id, studio_id) {
        this.id = id
        this.title = title
        this.description = description
        this.date = date
        this.start_time = start_time
        this.end_time = end_time
        this.price = price
        this.teacher_id = teacher_id
        this.level_id = level_id
        this.studio_id = studio_id
        DanceClass.push(this)
    }

    static getAll = () => {
        this.all
    }
}