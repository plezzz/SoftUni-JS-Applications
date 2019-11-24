(function () {
    const elements = {
        $root: () => document.getElementById('root'),
        $townBtn: () => document.getElementById('btnLoadTowns'),
        $towns: () => document.getElementById('towns'),
        url: '.\\towns.hbs'
    };

    elements.$townBtn().addEventListener("click", async function () {
        const towns = elements.$towns().value.split(', ');
        const source = await fetch(elements.url)
            .then(r => r.text());
        const template = Handlebars.compile(source);
        const context = {towns};
        elements.$root().innerHTML = template(context);
    });
}());
