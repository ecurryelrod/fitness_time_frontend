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


    updateDanceClass = (danceClassObj) => {
        let danceClass = DanceClass.all.find(dc => dc.id === danceClassObj.id)
        
        danceClass.title = danceClassObj.attributes.title
        danceClass.description = danceClassObj.attributes.description
        danceClass.date = danceClassObj.attributes.date
        danceClass.start_time = danceClassObj.attributes.start_time
        danceClass.end_time = danceClassObj.attributes.end_time
        return danceClass
    }

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

    renderHTML = (div) => {
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
            <div class="classDetails">
                <strong class="classTitle">${this.title}</strong> w/ <strong class="teacherName">${this.teacher}</strong>
                <span class="classLevel" data-id="${this.level_id}">(${this.level})</span>
            </div>
            <div class="classDetails">
                <strong class="date">${dateArray[1]}/${dateArray[2]}/${dateArray[0]}</strong> | 
                <strong class="startTime">${this.amOrPm(startHour, startMinutes)}</strong> - 
                <strong class="endTime">${this.amOrPm(endHour, endMinutes)}</strong>
                <span class="timeDuration">(${this.timeDuration(startHour, endHour, startMinutes, endMinutes)} min)</span>
            </div>
            <div class="classDetails">
                <button class="teacherPopupButton" data-id="${this.id}">Teacher Bio</button>
                <button class="descPopupButton" data-id="${this.id}">Class Description</button>
            </div>
            <br>
            <div class="classButtons">
                <button class="editButton" data-id="${this.id}">Edit</button>
                <button class="deleteButton" data-id="${this.id}">Delete</button>
            </div>
            
            <div class="popup" id="teacherPopup" data-id="${this.id}">
                <strong>${this.teacher}</strong>
                <p>${this.teacherBio}</p>
                <button class="button">Close</button>
            </div>
            <div class="popup" id="descPopup" data-id="${this.id}">
                <strong>${this.title}</strong>
                <p>${this.description}</p>
                <button class="button">Close</button>
            </div>
        `
    }

    renderButtons = () => {
        document.querySelector(`.deleteButton[data-id="${this.id}"]`).addEventListener('click', DanceClassApi.handleDelete)
        document.querySelector(`.editButton[data-id="${this.id}"]`).addEventListener('click', this.handleUpdate)
        document.querySelector(`.teacherPopupButton[data-id="${this.id}"]`).addEventListener('click', this.openTeacherPopup)
        document.querySelector(`.descPopupButton[data-id="${this.id}"]`).addEventListener('click', this.openDescPopup)
        document.querySelector(`#teacherPopup[data-id="${this.id}"]`).addEventListener('click', this.closeTeacherPopup)
        document.querySelector(`#descPopup[data-id="${this.id}"]`).addEventListener('click', this.closeDescPopup)
    }

    openTeacherPopup = () => {
        const popup = document.querySelector(`#teacherPopup[data-id="${this.id}"]`)
        popup.classList.add("open-popup")
    }

    closeTeacherPopup = () => {
        document.querySelector(`#teacherPopup.open-popup`).classList.remove('open-popup')
    }

    openDescPopup = () => {
        const popup = document.querySelector(`#descPopup[data-id="${this.id}"]`)
        popup.classList.add('open-popup')
    }

    closeDescPopup = () => {
        document.querySelector('#descPopup.open-popup').classList.remove('open-popup')
    }

    renderDanceClass = () => {
        const div = document.createElement('div')
        div.className = 'danceClassBox'
        div.dataset.id = this.id

        this.renderHTML(div)

        danceClassContainer.append(div)

        this.renderButtons()
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
            <label for="title">Class Title: </label>
            <input id="editClassTitle" name="title" type="text" value="${event.target.parentElement.querySelector('.classTitle').innerText}">
            <label for="description">Class Description: </label>
            <input id="editDescription" name="description" type="text" value="${event.target.parentElement.querySelector('.classDescription').innerText}">
            <br><br>
            <button class="updateButton" data-id="${event.target.dataset.id}">Update</button> 
        `

        document.querySelector(`.updateButton[data-id="${event.target.dataset.id}"]`).addEventListener('click', DanceClassApi.handleFetchUpdate)
    }

    replaceDanceClassBox = (div) => {
        this.renderHTML(div)
        this.renderButtons()
    }
}