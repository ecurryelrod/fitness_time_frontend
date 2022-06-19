class NewClassForm {
    static showCreateClassButton = () => {
        const button = document.createElement('button')
        button.id = "showForm"
        button.className = "formBtn btn btn-secondary btn-large"
        button.innerText = "Add a Dance Class"
        studioBox.append(button)
        button.addEventListener('click', this.renderForm)
    }

    static renderForm = () => {
        if (!classForm()) {
            showForm.innerText = 'Hide Form'
            studioBox.insertAdjacentHTML('beforeend', `
            <form id="classForm" class="mb-3">
                <br>
                <h2>Add a class</h2>
                <label for="exampleFormControlInput1" class="form-label">Class Title:</label><br>
                <input id="inputTitle" class="form-control" id="exampleFormControlInput1" type="text" name="title">
                <br><br>
                <label for="exampleFormControlInput1" class="form-label">Class Description:</label><br>
                <textarea id="inputDescription" class="form-control" id="exampleFormControlTextarea1" rows="3" name="description" cols="30" rows="10"></textarea>
                <br><br>
                <label for="exampleFormControlInput1" class="form-label">Level: </label>
                <select class="form-select" aria-label="Default select example" name="levels" id="levelId"></select>
                <br><br>
                <label for="exampleFormControlInput1" class="form-label">Date: </label>
                <input id="inputDate" class="form-control" id="exampleFormControlInput1" type="date" name="date">
                <br><br>
                <label for="exampleFormControlInput1" class="form-label">Start: </label>
                <input id="inputStartTime" class="form-control" id="exampleFormControlInput1" type="time" name="start_time" step="1800">
                <label for="exampleFormControlInput1" class="form-label">End: </label>
                <input id="inputEndTime" class="form-control" id="exampleFormControlInput1" type="time" name="end_time" step="1800">
                <br><br>
                <label for="exampleFormControlInput1" class="form-label">Teacher: </label>
                <select class="form-select" aria-label="Default select example" name="teachers" id="teacherId"></select>
                <br><br>
                <button class="btn btn-secondary btn-sm" type="submit">Submit</button>
            </form>
            `)
            const levelCollection = Level.all.map(level => `<option value="${level.id}">${level.attributes.title}</option>`)
            levelId.innerHTML = levelCollection.join("")

            const teacherCollection = Teacher.all.map(teacher => `<option value="${teacher.id}">${teacher.attributes.name}</option>`)
            teacherId.innerHTML = teacherCollection.join("")
    
            classForm().addEventListener('submit', DanceClassApi.handleSubmit)
        } else {
            showForm.innerText = "Add a Dance Class"
            classForm().remove()
        } 
    }
}
