const endPoint = "http://127.0.0.1:3000/studios/1"
const classForm = () => document.getElementById('classForm')

document.addEventListener("DOMContentLoaded", () => {
    StudioApi.fetchStudio()
    LevelsApi.fetchLevels()
})
