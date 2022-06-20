class DanceClassApi {
    static fetchDanceClasses = () => {
        fetch('http://127.0.0.1:3000/dance_classes', {
            // was having some fetch request issues and thought this would help
            headers: {'Access-Control-Allow-Origin': '*'}
        })
        .then(resp => resp.json())
        // .then(json => DanceClass.renderDanceClasses(json))
        .then(json => json.data.forEach(danceClassObj => {
            const addDanceClass = new DanceClass(danceClassObj)
            addDanceClass.renderDanceClass()
        }))
    }

    static handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            title: e.target.inputTitle.value,
            description: e.target.inputDescription.value,
            date: e.target.inputDate.value,
            start_time: e.target.inputStartTime.value,
            end_time: e.target.inputEndTime.value,
            teacher_id: e.target.teacherId.value,
            // new_teacher: {
            //     name: e.target.inputTeacherName.value,
            //     bio: e.target.inputBio.value
            // },
            level_id: e.target.levelId.value,
            studio_id: e.target.parentElement.dataset.id
        }
        fetch('http://127.0.0.1:3000/dance_classes', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(json => {
            if (json.error) {
                alert(json.error)
            } else {
                const newDanceClass = new DanceClass(json.data)
                newDanceClass.renderDanceClass()
                classForm().reset()
            }
        })
    }

    static handleDelete = (e) => {
        fetch(`http://127.0.0.1:3000/dance_classes/${e.target.dataset.id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        })
        .then(resp => resp.json())
        .then(json => {
            if (json.error) {
                alert(json.error)
            } else {
                e.target.parentElement.parentElement.remove()
                alert(json.message)
            }
        })
    }

    static handleFetchUpdate = (e) => {
        const data = {
            title: e.target.parentElement.parentElement.querySelector('#editClassTitle').value,
            date: e.target.parentElement.parentElement.querySelector('#editDate').value,
            start_time: e.target.parentElement.parentElement.querySelector('#editStartTime').value,
            end_time: e.target.parentElement.parentElement.querySelector('#editEndTime').value,
            description: e.target.parentElement.parentElement.querySelector('#editDescription').value,
            // teacher_id: e.target.parentElement.querySelector('#editTeacher').dataset.id,
            // level_id: e.target.parentElement.querySelector('#editLevel').dataset.id,
        }

        fetch(`http://127.0.0.1:3000/dance_classes/${e.target.dataset.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        // .then(json => this.replaceDanceClassBox(json.data, e.target.parentElement))
        .then(json => {
            if (json.error) {
                alert(json.error)
            } else {
                let danceClass = DanceClass.all.find(dcObj => dcObj.id === json.data.id)
                let updatedDanceClass = danceClass.updateDanceClass(json.data)
                updatedDanceClass.replaceDanceClassBox(e.target.parentElement)
            }
        })
    }
}