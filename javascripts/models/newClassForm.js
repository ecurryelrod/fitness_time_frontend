class NewClassForm {
    static showCreateClassButton = () => {
        const button = document.createElement('button')
        button.id = "showForm"
        button.innerText = "Add a Dance Class"
        studioContainer.append(button)
        button.addEventListener('click', this.renderForm)
    }

    static renderForm = (e) => {
        if (!classForm()) {
            studioContainer.insertAdjacentHTML('beforeend', `
            <form id="classForm">
                <h3>Add a class</h3>
                <input id="inputTitle" type="text" name="title" placeholder="Class Title">
                <br><br>
                <textarea id="inputDescription" name="description" cols="30" rows="10" placeholder="Class description"></textarea>
                <br><br>
                <label>Level: </label>
                <select name="levels" id="inputLevels">
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
                <input id="inputStudio" type="text" name="studio" placeholder="Studio">
                <br><br>
                <button type="submit">Add Class</button>
            </form>
            `)
            // classForm().addEventListener('submit', handleSubmit)
        } else {
            classForm().remove()
        } 
    } 
}