function display(e) {
    const el = {
        show: 'Show status code',
        hide: 'Hide status code',
        status: 'status',
        none: 'none',
        inline: 'inline'
    };
    e.textContent = e.textContent === el.show ? el.hide : el.show;
    const statusElement = e.parentNode.getElementsByClassName(el.status)[0];
    statusElement.style.display = statusElement.style.display === el.none ? el.inline : el.none;
}

(() => {
    renderCatTemplate();

    async function renderCatTemplate() {
        const source = await fetch('.\\all-cats.hbs')
            .then(r => r.text());
        const template = Handlebars.compile(source);
        const context = {cats: window.cats};
        document.getElementById('allCats').innerHTML = template(context);
    }

})();
