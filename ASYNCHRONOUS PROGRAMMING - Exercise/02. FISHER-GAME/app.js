import {get, post, put, del} from "./fetch-service.js";

function attachEvents() {
    const elements = {
        $catch: {
            $angler: () => document.querySelector('#addForm input.angler'),
            $weight: () => document.querySelector('#addForm input.weight'),
            $species: () => document.querySelector('#addForm input.species'),
            $location: () => document.querySelector('#addForm input.location'),
            $bait: () => document.querySelector('#addForm input.bait'),
            $captureTime: () => document.querySelector('#addForm input.captureTime')
        },
        $addBtn: () => document.querySelector('button.add'),
        $loadBtn: () => document.querySelector("body > aside > button"),
        $catches: () => document.getElementById('catches'),
        $exampleCatch: () => document.querySelector('div.catch')
    };

    elements.$addBtn().addEventListener('click', addCatch);
    elements.$loadBtn().addEventListener('click', refresh);
    window.onload = () => {
        loadCatch()
    };

    function refresh() {
        location.reload();
    }

    function addCatch() {
        const angler = elements.$catch.$angler().value;
        const weight = elements.$catch.$weight().value;
        const species = elements.$catch.$species().value;
        const location = elements.$catch.$location().value;
        const bait = elements.$catch.$bait().value;
        const captureTime = elements.$catch.$captureTime().value;

        post({
            angler,
            weight,
            species,
            location,
            bait,
            captureTime
        })
            .then(refresh)
            .catch((err) => console.log(err))
    }

    function loadCatch() {
        get()
            .then((allCatches) => {
                showAllCatches(allCatches)
            })
            .catch(err => console.log(err))
    }

    function updateCatch(e) {
        const id = e.currentTarget.parentNode.getAttribute('data-id');

        const angler = e.currentTarget.parentNode.children[1].value;
        const weight = e.currentTarget.parentNode.children[4].value;
        const species = e.currentTarget.parentNode.children[7].value;
        const location = e.currentTarget.parentNode.children[10].value;
        const bait = e.currentTarget.parentNode.children[13].value;
        const captureTime = e.currentTarget.parentNode.children[17].value;

        put(id, {
            angler,
            weight,
            species,
            location,
            bait,
            captureTime
        }).then(refresh)
    }

    function deleteCatch(e) {
        const id = e.currentTarget.parentNode.getAttribute('data-id');
        del(id).then(refresh)
    }

    function showAllCatches(allCatches) {
        Object.keys(allCatches).forEach((id) => {
            const copy = elements.$exampleCatch().cloneNode(true);
            copy.setAttribute('data-id', id);

            Object.keys(elements.$catch)
                .map((c) => c.slice(1))
                .forEach((key) =>
                    copy.querySelector(`input.${key}`).value = allCatches[id][key]
                );
            elements.$catches().appendChild(copy)
        });
        [...document.querySelectorAll('button.update')].forEach((b) => b.addEventListener('click', updateCatch));
        [...document.querySelectorAll('button.delete')].forEach((b) => b.addEventListener('click', deleteCatch));
        elements.$exampleCatch().remove();
    }
}

attachEvents();

