class TeacherApi {
    static fetchTeachers = () => {
        fetch('http://127.0.0.1:3000/teachers')
        .then(resp => resp.json())
        .then(json => json.data.map(teacher => Teacher.all.push(teacher)))
        // .then(json => {debugger})
        .catch(err => alert(err))
    }
}