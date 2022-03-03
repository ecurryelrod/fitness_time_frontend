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
        this.studio_id = studio_id
        this.level_id = level_id
        this.teacher_id = teacher_id
        DanceClass.all.push(this)
    }
    
    static renderDanceClasses = (dance_classes) => {
        dance_classes.data.forEach(dance_class => this.renderDanceClass(dance_class))
    }

    static renderDanceClass = (dance_class) => {
        const div = document.createElement('div')
        div.className = 'danceClassBox'
        div.dataset.id = dance_class.id

        const startTimeArrayFirstSplit = dance_class.attributes.start_time.split("T")
        const startTimeArraySecondSplit = startTimeArrayFirstSplit[1].split(".")
        const startTimeThirdSplit = startTimeArraySecondSplit.toString().split(':')
        const startHour = startTimeThirdSplit[0]
        const startMinutes = startTimeThirdSplit[1]

        const endTimeArrayFirstSplit = dance_class.attributes.end_time.split("T")
        const endTimeArraySecondSplit = endTimeArrayFirstSplit[1].split(".")
        const endTimeThirdSplit = endTimeArraySecondSplit.toString().split(':')
        const endHour = endTimeThirdSplit[0]
        const endMinutes = endTimeThirdSplit[1]

        const dateArray = dance_class.attributes.date.split("-")

        // const classDuration = ((endHour - startHour) * 60) - 30

        div.innerHTML = `
            <p><strong class="date">${dateArray[1]}/${dateArray[2]}/${dateArray[0]}</strong> @ 
            <strong class="startTime">${startHour}:${startMinutes}</strong> - 
            <strong class="endTime">${endHour}:${endMinutes}</strong> 
            <strong class="classLevel"> ${dance_class.attributes.level.title}</strong>
            <strong class="classTitle">${dance_class.attributes.title}</strong>
             w/ <span class="teacherName">${dance_class.attributes.teacher.name}</span>
            <a href="#" class="teacherBio">Teacher Bio</a></p>
            <button class="editButton" data-id="${dance_class.id}">Edit</button>
            <button class="deleteButton" data-id="${dance_class.id}">Delete</button>
        `
        danceClassContainer.append(div)
    }

    // static amOrPm = (startHour, startMinutes) => {
    //     // debugger
    //     if (startHour >= 12 && startHour <= 24) {
    //         `${startHour%12}:${startMinutes} pm`
    //     } else if (startHour >= 0 && startHour < 12) {
    //         `${startHour%12}:${startMinutes} am`
    //     }
    // }

    // amOrPm = (startHour) => {
    //     if (startHour >= 12 && startHour <= 24) {
    //         document.querySelector('.startTime').innerHTML = `${startHour%12}:${startMinutes} pm`
    //     } else if (startHour >= 0 && startHour < 12) {
    //         document.querySelector('.startTime').innerHTML = `${startHour%12}:${startMinutes} am`
    //     }
    // }

    // static timeDuration = (startHour, endHour, startMinutes, endMinutes) => {
    //     debugger
        
    //     if (startMinutes === 30) {
    //         // debugger
    //         ((endHour - startHour) * 60) - 30
    //     } else if (endMinutes === 30) {
    //         ((endHour - startHour) * 60) + 30
    //     }
    // }

    // displayTeacherBio = (e) => {
    //     debugger
    // }

    // how utilize class and instance methods????? and how decide which one to use???
}