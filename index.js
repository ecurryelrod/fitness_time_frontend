const endPoint = "http://127.0.0.1:3000/api/studios/1"

document.addEventListener("DOMContentLoaded", () => {
    getStudio()
})

const getStudio = () => {
    fetch(endPoint)
    .then(resp => resp.json())
    .then(studio => {
        const studioName = document.createElement('h1')
        studioName.innerText = studio.data.attributes.name;

        const phone = document.createElement('p')
        phone.innerText = phoneFormat(studio.data.attributes.phone);

        const email = document.createElement('p')
        email.innerText = studio.data.attributes.email;

        const address = document.createElement('p')
        if (studio.data.attributes.address_2) {
            address.innerText = studio.data.attributes.address_1 + " " + studio.data.attributes.address_2 + " " + studio.data.attributes.city + ", " + studio.data.attributes.state + " " + studio.data.attributes.zipcode
        } else {
            address.innerText = studio.data.attributes.address_1 + " " + studio.data.attributes.city + ", " + studio.data.attributes.state + " " + studio.data.attributes.zipcode
        }
        document.querySelector('#studio-container').append(studioName, phone, email, address);
    })
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

