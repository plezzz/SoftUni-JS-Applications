const baseURL = 'https://fisher-game.firebaseio.com/catches/';

export function get() {
    return fetch(baseURL + '.json').then(r => r.json())
}

export function post(data) {
    return fetch(baseURL + '.json', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json'
        }
    }).then(r => r.json())
}

export function put(id,data) {
    return fetch(baseURL + `${id}.json`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json'
        }
    }).then(r => r.json())
}

export function del(id) {
    return fetch(baseURL + `${id}.json`, {
        method: 'DELETE'
    }).catch(console.error)
}
