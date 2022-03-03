class StudioApi {
    static fetchStudio = () => {
        fetch("http://127.0.0.1:3000/studios/1", {
            headers: {'Access-Control-Allow-Origin': '*'}
        })
        .then(resp => resp.json())
        .then(json => Studio.renderStudio(json))
        // .then(json => {debugger})
        .catch(err => alert(err))
    }
}