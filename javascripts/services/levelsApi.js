class LevelsApi {
    static fetchLevels = () => {
        fetch('http://127.0.0.1:3000/levels')
        .then(resp => resp.json())
        .then(json => json.data.map(level => Level.all.push(level)))
        // .then(json => {debugger})
        .catch(err => alert(err))
    }
}