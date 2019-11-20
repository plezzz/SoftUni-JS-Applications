function attachEvents() {
    const baseServiceUrl = `https://rest-messanger.firebaseio.com/messanger`;
    const refreshBtn = document.getElementById('refresh');
    const sendBtn = document.getElementById('submit');
    const messages = document.getElementById('messages');
    const user = document.getElementById('author');
    const message = document.getElementById('content');

    refreshBtn.addEventListener('click', refresh);
    sendBtn.addEventListener('click', addMessage);

    function refresh() {
        fetch(url(baseServiceUrl))
            .then(res => res.json())
            .then(showMessages)
            .catch(displayError)
    }

    function showMessages(data) {
       let m = [];
        Object.entries(data)
            .forEach((message) => {
                m.push(`${message[1]['author']}: ${message[1]['content']}`)
            });
        messages.value = m.join("\n")
    }

    function addMessage() {
        let author = user.value;
        let content = message.value;
        let headers = {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({author, content})
        };

        fetch(url(baseServiceUrl), headers)
            .then(refresh)
            .catch(displayError);

        user.value = '';
        message.value = '';
    }

    function displayError(err) {
        messages.value = "Error"
    }

    function url(baseUrl, del = false, id = 0) {
        if (del) {
            return baseUrl + '/' + id + '.json'
        }
        return baseUrl + '.json'
    }
}

attachEvents();
