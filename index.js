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

