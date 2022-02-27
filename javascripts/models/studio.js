class Studio {
    static all = []

    constructor(id, name, email, phone, address_1, address_2, city, state, zipcode, dance_classes = []) {
        this.id = id
        this.name = name
        this.email = email
        this.phone = phone
        this.address_t = address_1
        this.address_2 = address_2
        this.city = city
        this.state = state
        this.zipcode = zipcode
        this.dance_classes = dance_classes
        Studio.all.push(this)
    }

    static getAll = () => {
        this.all
    }

    static findById = (id) => {
        this.all.find(studio => studio.id === id)
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
        // debugger
        // LevelsApi.getLevelsForSelect()
        const studioBox = document.createElement('div')
        studioBox.id = 'studioBox'
        studioBox.dataset.id = studio.data.id

        const h1 = document.createElement('h1')
        h1.id = "studioName"
        h1.innerText = studio.data.attributes.name
        studioBox.append(h1)

        const phone = document.createElement('p')
        phone.id = "phone"
        phone.innerText = this.phoneFormat(studio.data.attributes.phone)
        studioBox.append(phone)

        const email = document.createElement('p')
        email.id = "email"
        email.innerText = studio.data.attributes.email
        studioBox.append(email)

        const address = document.createElement('p')
        address.id = "address"
        if (studio.address_2) {
                address.innerText = studio.data.attributes.address_1 + " " + studio.data.attributes.address_2 + " " + studio.data.attributes.city + ", " + studio.data.attributes.state + " " + studio.data.attributes.zipcode
        } else {
                address.innerText = studio.data.attributes.address_1 + " " + studio.data.attributes.city + ", " + studio.data.attributes.state + " " + studio.data.attributes.zipcode
        }
        studioBox.append(address)
        
        studioContainer.append(studioBox)

        NewClassForm.showCreateClassButton()
    }

   
}
