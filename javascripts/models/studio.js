class Studio {
    static all = []

    constructor(id, name, email, phone, address_1, address_2, city, state, zipcode) {
        this.id = id
        this.name = name
        this.email = email
        this.phone = phone
        this.address_t = address_1
        this.address_2 = address_2
        this.city = city
        this.state = state
        this.zipcode = zipcode
        Studio.all.push(this)
    }

    static getAll = () => {
        this.all
    }

    static phoneFormat = (input) => {
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

    static renderStudio = (studio) => {
        const h1 = document.createElement('h1')
        h1.id = "studioName"
        h1.innerText = studio.data.attributes.name

        const pPhone = document.createElement('p')
        pPhone.id = "phone"
        pPhone.innerText = this.phoneFormat(studio.data.attributes.phone)

        const pEmail = document.createElement('p')
        pEmail.id = "email"
        pEmail.innerText = studio.data.attributes.email

        const pAddress = document.createElement('p')
        pAddress.id = "address"
        if (studio.address_2) {
                pAddress.innerText = studio.data.attributes.address_1 + " " + studio.data.attributes.address_2 + " " + studio.data.attributes.city + ", " + studio.data.attributes.state + " " + studio.data.attributes.zipcode
        } else {
                pAddress.innerText = studio.data.attributes.address_1 + " " + studio.data.attributes.city + ", " + studio.data.attributes.state + " " + studio.data.attributes.zipcode
        }
        studioContainer.append(h1, pPhone, pEmail, pAddress)

        NewClassForm.showCreateClassButton()
    }

   
}
