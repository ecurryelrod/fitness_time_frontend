class DanceClassApi {
    static fetchDanceClasses = () => {
        fetch('http://127.0.0.1:3000/dance_classes', {
            headers: {'Access-Control-Allow-Origin': '*'}
        })
        .then(resp => resp.json())
        // .then(json => DanceClass.renderDanceClasses(json))
        .then(json => json.data.forEach(danceClassObj => {
            const addDanceClass = new DanceClass(danceClassObj)
            addDanceClass.renderDanceClass()
        }))
    }
}