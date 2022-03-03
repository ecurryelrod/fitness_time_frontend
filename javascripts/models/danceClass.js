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

        document.querySelector(`.deleteButton[data-id="${dance_class.id}"]`).addEventListener('click', this.handleDelete)
        document.querySelector(`.editButton[data-id="${dance_class.id}"]`).addEventListener('click', this.handleEditButton)
    }

    static handleDelete = (e) => {
        fetch(`http://127.0.0.1:3000/dance_classes/${e.target.dataset.id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        })
        .then(resp => resp.json())
        .then(json => {
            e.target.parentElement.remove()
            alert(json.message)
        })
    }

    static handleEditButton = (event) => {
        if (event.target.innerText === "Edit") {
            this.handleUpdate(event)
        } else {
            this.handleFetchUpdate(event)
        }
    }

    static handleUpdate = (event) => {
        const dateArray = event.target.parentElement.querySelector('.date').innerText.split("/")
        
        event.target.parentElement.innerHTML = `
            <label for="date">Date: </label>
            <input id="editDate" name="date" type="date" value="${dateArray[2]}-${dateArray[0]}-${dateArray[1]}">
            <label for="start_time">Start Time: </label>
            <input id="editStartTime" name="start_time" type="time" value="${event.target.parentElement.querySelector('.startTime').innerText}">
            <label for="end_time">End Time: </label>
            <input id="editEndTime" name="end_time" type="time" value="${event.target.parentElement.querySelector('.endTime').innerText}">
            <label for="level">Level: </label>
            <select name="levels" id="editLevel" ></select>
            <label for="title">Class Title: </label>
            <input id="editClassTitle" name="title" type="text" value="${event.target.parentElement.querySelector('.classTitle').innerText}">
            <label for="teacherName">Teacher Name: </label>
            <select name="teachers" id="editTeacher"></select>
            <label for="title">Teacher Bio: </label>
            <input id="editTeacherBio" name="bio" type="text" value="${event.target.parentElement.querySelector('.teacherBio').innerText}">
            <br><br>
            <button class="updateButton" data-id="${event.target.dataset.id}">Update</button> 
        `

        const levelCollection = Level.all.map(level => `<option value="${level.id}" selected>${level.attributes.title}</option>`)
        editLevel.innerHTML = levelCollection.join("")

        const teacherCollection = Teacher.all.map(teacher => `<option value="${teacher.id}">${teacher.attributes.name}</option>`)
        editTeacher.innerHTML = teacherCollection.join("")

        document.querySelector(`.updateButton[data-id="${event.target.dataset.id}"]`).addEventListener('click', this.handleFetchUpdate)
    }

    static handleFetchUpdate = (e) => {
        const data = {
            title: e.target.parentElement.querySelector('#editClassTitle').value,
            date: e.target.parentElement.querySelector('#editDate').value,
            start_time: e.target.parentElement.querySelector('#editStartTime').value,
            end_time: e.target.parentElement.querySelector('#editEndTime').value,
            teacher_id: e.target.parentElement.querySelector('#editTeacher').dataset.id,
            level_id: e.target.parentElement.querySelector('#editLevel').dataset.id,
        }

        fetch(`http://127.0.0.1:3000/dance_classes/${e.target.dataset.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(json => this.replaceDanceClassBox(json.data, e.target.parentElement))
        .catch(err => alert(err))
    }

    // need to replace the danceClassBox on the page instead of moving it in the list
    static replaceDanceClassBox = (danceClass, div) => {
        const startTimeArrayFirstSplit = danceClass.attributes.start_time.split("T")
        const startTimeArraySecondSplit = startTimeArrayFirstSplit[1].split(".")
        const startTimeThirdSplit = startTimeArraySecondSplit.toString().split(':')
        const startHour = startTimeThirdSplit[0]
        const startMinutes = startTimeThirdSplit[1]

        const endTimeArrayFirstSplit = danceClass.attributes.end_time.split("T")
        const endTimeArraySecondSplit = endTimeArrayFirstSplit[1].split(".")
        const endTimeThirdSplit = endTimeArraySecondSplit.toString().split(':')
        const endHour = endTimeThirdSplit[0]
        const endMinutes = endTimeThirdSplit[1]

        const dateArray = danceClass.attributes.date.split("-")
        
        div.innerHTML = `
            <p><strong class="date">${dateArray[1]}/${dateArray[2]}/${dateArray[0]}</strong> @ 
            <strong class="startTime">${startHour}:${startMinutes}</strong> - 
            <strong class="endTime">${endHour}:${endMinutes}</strong> 
            <strong class="classLevel"> ${danceClass.attributes.level.title}</strong>
            <strong class="classTitle">${danceClass.attributes.title}</strong>
             w/ <span class="teacherName">${danceClass.attributes.teacher.name}</span>
            <a href="#" class="teacherBio">Teacher Bio </a></p>
            <button class="editButton" data-id="${danceClass.id}">Edit</button>
            <button class="deleteButton" data-id="${danceClass.id}">Delete</button>
        `
        document.querySelector(`.deleteButton[data-id="${danceClass.id}"]`).addEventListener('click', this.handleDelete)
        document.querySelector(`.editButton[data-id="${danceClass.id}"]`).addEventListener('click', this.handleUpdate)
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