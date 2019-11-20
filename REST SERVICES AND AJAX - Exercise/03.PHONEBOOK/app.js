function attachEvents() {
    const btnLoad = document.getElementById('btnLoad');
    const btnCreate = document.getElementById('btnCreate');
    const personInput = document.getElementById('person');
    const phoneInput = document.getElementById('phone');
    const baseServiceUrl = `https://phonebook-nakov.firebaseio.com/phonebook`;
    let phonebook = document.getElementById('phonebook');

    btnLoad.addEventListener('click', loadContacts);
    btnCreate.addEventListener('click', createContact);

    function loadContacts() {
        phonebook.textContent = '';
        fetch(url(baseServiceUrl))
            .then(res => res.json())
            .then(displayContacts)
            .catch(displayError);
    }

    function displayContacts(contacts) {
        Object.entries(contacts)
            .forEach((personId) => {
                const li = document.createElement('li');
                const btn = document.createElement('button');
                btn.textContent = 'Delete';
                btn.onclick = function () {
                    deleteContact(personId[0])
                };
                li.textContent = `${personId[1]['person']}: ${personId[1]['phone']}`;
                li.appendChild(btn);
                phonebook.appendChild(li)
            })
    }

    function displayError(err) {
        const li = document.createElement('li');
        li.textContent = `Error`;
        phonebook.appendChild(li)
    }

    function createContact() {
        let person = personInput.value;
        let phone = phoneInput.value;
        let headers = {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({person, phone})
        };

        fetch(url(baseServiceUrl), headers)
            .then(loadContacts)
            .catch(displayError);

        personInput.value = '';
        phoneInput.value = '';
    }

    function deleteContact(id) {
        let headers = {
            method: 'DELETE'
        };
        fetch(url(baseServiceUrl, true, id), headers)
            .then(loadContacts)
            .catch(displayError);
    }

    function url(baseUrl, del = false, id = 0) {
        if (del) {
            return baseUrl + '/' + id + '.json'
        }
        return baseUrl + '.json'
    }
}

attachEvents();
