class DanceClass {
    static all = []

    constructor(danceClassObj) {
        this.id = danceClassObj.id
        this.title = danceClassObj.attributes.title
        this.description = danceClassObj.attributes.description
        this.date = danceClassObj.attributes.date
        this.start_time = danceClassObj.attributes.start_time
        this.end_time = danceClassObj.attributes.end_time
        this.price = danceClassObj.attributes.price
        this.studio_id = danceClassObj.attributes.studio.id
        this.level_id = danceClassObj.attributes.level.id
        this.teacher_id = danceClassObj.attributes.teacher.id
        this.teacher = danceClassObj.attributes.teacher.name
        this.teacherBio = danceClassObj.attributes.teacher.bio
        this.level = danceClassObj.attributes.level.title
        DanceClass.all.push(this)
    }

    // constructor(id, title, description, date, start_time, end_time, price, teacher_id, level_id, studio_id) {
    //     this.id = id
    //     this.title = title
    //     this.description = description
    //     this.date = date
    //     this.start_time = start_time
    //     this.end_time = end_time
    //     this.price = price
    //     this.studio_id = studio_id
    //     this.level_id = level_id
    //     this.teacher_id = teacher_id
    //     DanceClass.all.push(this)
    // }

    amOrPm = (hour, minutes) => {
        if (hour > 12 && hour <= 24) {
            return `${hour%12}:${minutes} pm`
        } else if (hour == 12) {
            return `${hour}:${minutes} pm`
        } else if (hour >= 0 && hour <= 12) {
            return `${hour}:${minutes} am`
        }
    }

    timeDuration = (startHour, endHour, startMinutes, endMinutes) => {        
        if (startMinutes === '30') {
            return ((endHour - startHour) * 60) - 30
        } else if (endMinutes === '30') {
            return ((endHour - startHour) * 60) + 30
        }
    }

    militaryTime = (startTimeArrayFirstSplit, startTimeArray) => {
        if (startTimeArrayFirstSplit[1] === 'pm') {
            const militaryHour = (parseInt(startTimeArray[0]) + 12).toString()
            return `${militaryHour}:${startTimeArray[1]}`
        } else {
            return `${startTimeArray[0]}:${startTimeArray[1]}`
        }
    }

    renderDanceClass = () => {
        const div = document.createElement('div')
        div.className = 'danceClassBox'
        div.dataset.id = this.id

        const startTimeArrayFirstSplit = this.start_time.split("T")
        const startTimeArraySecondSplit = startTimeArrayFirstSplit[1].split(".")
        const startTimeThirdSplit = startTimeArraySecondSplit.toString().split(':')
        const startHour = startTimeThirdSplit[0]
        const startMinutes = startTimeThirdSplit[1]

        const endTimeArrayFirstSplit = this.end_time.split("T")
        const endTimeArraySecondSplit = endTimeArrayFirstSplit[1].split(".")
        const endTimeThirdSplit = endTimeArraySecondSplit.toString().split(':')
        const endHour = endTimeThirdSplit[0]
        const endMinutes = endTimeThirdSplit[1]

        const dateArray = this.date.split("-")
        
        div.innerHTML = `
            <p><strong class="date">${dateArray[1]}/${dateArray[2]}/${dateArray[0]}</strong> | 
            <strong class="startTime">${this.amOrPm(startHour, startMinutes)}</strong> - 
            <strong class="endTime">${this.amOrPm(endHour, endMinutes)}</strong>
            <span class="timeDuration">(${this.timeDuration(startHour, endHour, startMinutes, endMinutes)} min)</span> | 
            <strong>Class Level: </strong>
            <span class="classLevel" data-id="${this.level_id}">${this.level}</span> | 
            <strong>Class Title: </strong>
            <span class="classTitle">${this.title}</span>
             w/ <strong class="teacherName">${this.teacher}</strong> | 
            <strong>Class Description: </strong>
            <span class="classDescription">${this.description}</span> | 
            <a href="#" class="teacherBio">Teacher Bio:</a></p>
            <button class="editButton" data-id="${this.id}">Edit</button>
            <button class="deleteButton" data-id="${this.id}">Delete</button>
        `
        danceClassContainer.append(div)

        document.querySelector(`.deleteButton[data-id="${this.id}"]`).addEventListener('click', DanceClassApi.handleDelete)
        document.querySelector(`.editButton[data-id="${this.id}"]`).addEventListener('click', this.handleUpdate)
    }

    handleUpdate = (event) => {
        const startTimeArrayFirstSplit = event.target.parentElement.querySelector('.startTime').innerText.split(' ')
        const startTimeArray = startTimeArrayFirstSplit[0].split(':')

        const endTimeArrayFirstSplit = event.target.parentElement.querySelector('.endTime').innerText.split(' ')
        const endTimeArray = endTimeArrayFirstSplit[0].split(':')
        
        const dateArray = event.target.parentElement.querySelector('.date').innerText.split("/")
        
        event.target.parentElement.innerHTML = `
            <label for="date">Date: </label>
            <input id="editDate" name="date" type="date" value="${dateArray[2]}-${dateArray[0]}-${dateArray[1]}">
            <label for="start_time">Start Time: </label>
            <input id="editStartTime" name="start_time" type="time" value="${this.militaryTime(startTimeArrayFirstSplit, startTimeArray)}" step="1800">
            <label for="end_time">End Time: </label>
            <input id="editEndTime" name="end_time" type="time" value="${this.militaryTime(endTimeArrayFirstSplit, endTimeArray)}" step="1800">
            <label for="level">Level: </label>
            <select name="levels" id="editLevel" ></select>
            <label for="title">Class Title: </label>
            <input id="editClassTitle" name="title" type="text" value="${event.target.parentElement.querySelector('.classTitle').innerText}">
            <label for="teacherName">Teacher Name: </label>
            <select name="teachers" id="editTeacher"></select>
            <label for="title">Class Description: </label>
            <input id="editDescription" name="description" type="text" value="${event.target.parentElement.querySelector('.classDescription').innerText}">
            <br><br>
            <button class="updateButton" data-id="${event.target.dataset.id}">Update</button> 
        `
        
        const levelCollection = Level.all.map(level => `<option value="${level.id}" selected>${level.attributes.title}</option>`)
        editLevel.innerHTML = levelCollection.join("")

        const teacherCollection = Teacher.all.map(teacher => `<option value="${teacher.id}">${teacher.attributes.name}</option>`)
        editTeacher.innerHTML = teacherCollection.join("")

        document.querySelector(`.updateButton[data-id="${event.target.dataset.id}"]`).addEventListener('click', this.handleFetchUpdate)
    }

    handleFetchUpdate = (e) => {
        const data = {
            title: e.target.parentElement.querySelector('#editClassTitle').value,
            date: e.target.parentElement.querySelector('#editDate').value,
            start_time: e.target.parentElement.querySelector('#editStartTime').value,
            end_time: e.target.parentElement.querySelector('#editEndTime').value,
            description: e.target.parentElement.querySelector('#editDescription').value,
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

    replaceDanceClassBox = (danceClass, div) => {
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
            <p><strong class="date">${dateArray[1]}/${dateArray[2]}/${dateArray[0]}</strong> | 
            <strong class="startTime">${this.amOrPm(startHour, startMinutes)}</strong> - 
            <strong class="endTime">${this.amOrPm(endHour, endMinutes)}</strong> 
            <span class="timeDuration">(${this.timeDuration(startHour, endHour, startMinutes, endMinutes)} min)</span> | 
            <strong>Class Level: </strong>
            <span class="classLevel"> ${danceClass.attributes.level.title}</span> | 
            <strong>Class Title: </strong>
            <span class="classTitle">${danceClass.attributes.title}</span>
             w/ <strong class="teacherName">${danceClass.attributes.teacher.name}</strong> | 
            <strong>Class Description: </strong>
            <span class="classDescription">${danceClass.attributes.description}</span> | 
            <a href="#" class="teacherBio">Teacher Bio </a></p>
            <button class="editButton" data-id="${danceClass.id}">Edit</button>
            <button class="deleteButton" data-id="${danceClass.id}">Delete</button>
        `
        document.querySelector(`.deleteButton[data-id="${danceClass.id}"]`).addEventListener('click', this.handleDelete)
        document.querySelector(`.editButton[data-id="${danceClass.id}"]`).addEventListener('click', this.handleUpdate)
    }
}