function display(e) {
    const statusElement = e.parentNode.getElementsByClassName('collapsible')[0];
   statusElement.style.display = statusElement.style.display === 'none' ? 'block' : 'none';
}

(() => {
    renderMonkyeTemplate();

    async function renderMonkyeTemplate() {
        const source = await fetch('.\\template.hbs')
            .then(r => r.text());
        const template = Handlebars.compile(source);
        document.getElementById('allMonkeys').innerHTML = template({monkeys});
    }
})();
