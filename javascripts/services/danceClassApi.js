class DanceClassApi {
    static fetchDanceClasses = () => {
        fetch('http://127.0.0.1:3000/dance_classes', {
            headers: {'Access-Control-Allow-Origin': '*'}
        })
        .then(resp => resp.json())
        // .then(json => {debugger})
        .then(json => DanceClass.renderDanceClasses(json))
    }
}