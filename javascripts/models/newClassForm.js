class NewClassForm {
    static showCreateClassButton = () => {
        const button = document.createElement('button')
        button.id = "showForm"
        button.innerText = "Add a Dance Class"
        studioBox.append(button)
        button.addEventListener('click', this.renderForm)
    }

    static renderForm = () => {
        if (!classForm()) {
            studioBox.insertAdjacentHTML('beforeend', `
            <form id="classForm">
                <h3>Add a class</h3>
                <input id="inputTitle" type="text" name="title" placeholder="Class Title">
                <br><br>
                <textarea id="inputDescription" name="description" cols="30" rows="10" placeholder="Class description"></textarea>
                <br><br>
                <label>Level: </label>
                <select name="levels" id="levelId">
                </select>
                <br><br>
                <input id="inputDate" type="date" name="date">
                <br><br>
                <label>Start: </label>
                <input id="inputStartTime" type="time" name="start_time" step="900">
                <label>End: </label>
                <input id="inputEndTime" type="time" name="end_time" step="900">
                <br><br>
                <input id="inputTeacher" type="text" name="teacher" placeholder="Teacher">
                <br><br>
                <textarea id="inputTeacherBio" name="bio" placeholder="Teacher bio"></textarea>
                <br><br>
                <button id="" type="submit">Submit</button>
            </form>
            `)
            const collection = Level.all.map(level => `<option value="${level.id}">${level.attributes.title}</option>`)
            levelId.innerHTML = collection.join("")
    
            classForm().addEventListener('submit', this.handleSubmit)
        } else {
            classForm().remove()
        } 
    }

    static handleSubmit = (e) => {
        e.preventDefault()
        // debugger
        let teacher = new Teacher({
            name: e.target.inputTeacher.value,
            bio: e.target.inputTeacherBio.value
        })
        debugger
        const data = {
            title: e.target.inputTitle.value,
            description: e.target.inputDescription.value,
            date: e.target.inputDate.value,
            start_time: e.target.inputStartTime.value,
            end_time: e.target.inputEndTime.value,
            teacher_id: teacher.id,
            level_id: e.target.levelId.id,
            studio_id: e.target.parentElement.dataset.id
        }
        // debugger
        fetch('http://127.0.0.1:3000/dance_classes', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(json => {debugger})
    }
}
