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
                <select name="levels" id="levelId"></select>
                <br><br>
                <input id="inputDate" type="date" name="date">
                <br><br>
                <label>Start: </label>
                <input id="inputStartTime" type="time" name="start_time" step="1800">
                <label>End: </label>
                <input id="inputEndTime" type="time" name="end_time" step="1800">
                <br><br>
                <select name="teachers" id="teacherId"></select>
                <br><br>
                <button id="" type="submit">Submit</button>
            </form>
            `)
            const levelCollection = Level.all.map(level => `<option value="${level.id}">${level.attributes.title}</option>`)
            levelId.innerHTML = levelCollection.join("")

            const teacherCollection = Teacher.all.map(teacher => `<option value="${teacher.id}">${teacher.attributes.name}</option>`)
            teacherId.innerHTML = teacherCollection.join("")
    
            classForm().addEventListener('submit', DanceClassApi.handleSubmit)
        } else {
            classForm().remove()
        } 
    }
}
