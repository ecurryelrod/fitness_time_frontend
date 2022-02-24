const endPoint = "http://127.0.0.1:3000/studios/1"
const classForm = () => document.getElementById('classForm')

document.addEventListener("DOMContentLoaded", () => {
    getStudio()
})

const getStudio = () => {
    fetch(endPoint)
    .then(resp => resp.json())
    .then(json => renderStudio(json))
}

const phoneFormat = (input) => {
    if(!input || isNaN(input)) return `input must be a number was sent ${input}`
    if(typeof(input) !== 'string') input = input.toString()
    if(input.length === 10){
        return input.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
    } else if(input.length < 10) {
        return 'was not supplied enough numbers please pass a 10 digit number'
    } else if(input.length > 10) {
        return 'was supplied too many numbers please pass a 10 digit number'
    }else{
        return 'something went wrong'
    }
}

const showCreateClassButton = () => {
    const button = document.createElement('button')
    button.id = "showForm"
    button.innerText = "Add a Dance Class"
    studioContainer.append(button)
    button.addEventListener('click', renderForm)
}

const renderStudio = (studio) => {
    const h1 = document.createElement('h1')
    h1.id = "studioName"
    h1.innerText = studio.data.attributes.name;

    const pPhone = document.createElement('p')
    pPhone.id = "phone"
    pPhone.innerText = phoneFormat(studio.data.attributes.phone);

    const pEmail = document.createElement('p')
    pEmail.id = "email"
    pEmail.innerText = studio.data.attributes.email;

    const pAddress = document.createElement('p')
    pAddress.id = "address"
    if (studio.address_2) {
            pAddress.innerText = studio.data.attributes.address_1 + " " + studio.data.attributes.address_2 + " " + studio.data.attributes.city + ", " + studio.data.attributes.state + " " + studio.data.attributes.zipcode
    } else {
            pAddress.innerText = studio.data.attributes.address_1 + " " + studio.data.attributes.city + ", " + studio.data.attributes.state + " " + studio.data.attributes.zipcode
    }
    studioContainer.append(h1, pPhone, pEmail, pAddress)

    showCreateClassButton()
}

const renderForm = (e) => {
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
        classForm().addEventListener('submit', handleSubmit)
    } else {
        classForm().remove()
    }   
}