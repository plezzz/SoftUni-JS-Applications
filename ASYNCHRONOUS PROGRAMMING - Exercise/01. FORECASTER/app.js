import {weather} from "./fetch.js";


function attachEvents() {

    const {$current, $forecast, $location, $submit, $upcoming, currentText, upcomingText, errorText, block, display} = {
        $location: () => document.getElementById("location"),
        $submit: () => document.getElementById("submit"),
        $forecast: () => document.getElementById("forecast"),
        $current: () => document.getElementById("current"),
        $upcoming: () => document.getElementById("upcoming"),
        currentText: 'Current conditions',
        upcomingText: 'Three-day forecast',
        errorText: 'Error!',
        block: 'block',
        display: 'display:none',
    };

    const weatherSymbols = {
        sunny: "☀",
        partlysunny: "⛅",
        overcast: "☁",
        rain: "☂",
        degrees: "°"
    };


    $submit().addEventListener('click', getWeatherInfo);

    function getWeatherInfo() {
        weather()
            .location()
            .then((locations) => {
                const {code} = locations.find((o) => o.name === $location().value);

                return Promise.all([
                        weather().today(code),
                        weather().upcoming(code)
                    ]
                )
            })
            .then(([today, upcoming]) => {
                generateTodayWeatherInfo(today);
                generateUpcomingWeatherInfo(upcoming)
            })
            .catch(errorHandle)
    }

    function getNormalizedSymbol(condition) {
        return condition.split('').filter((c) => c !== ' ').map((c) => c.toLowerCase()).join('')
    }

    function generateTodayWeatherInfo(today) {
        showForecast();
        const {condition, low, high} = today.forecast;
        const {name} = today;
        const degrees = degreeRange(low, high);
        const symbol = getNormalizedSymbol(condition);
        const $divForecastWrapper = createHtmlElement('div', ['forecasts']);
        const $divLabel = createHtmlElement('div', ['label'], currentText);
        const $spanSymbol = createHtmlElement('span', ['condition', 'symbol'], weatherSymbols[symbol]);
        const $spanWrapper = createHtmlElement('span', ['condition']);
        const $spanName = createHtmlElement('span', ['forecast-data'], name);
        const $spanDegrees = createHtmlElement('span', ['forecast-data'], degrees);
        const $spanCondition = createHtmlElement('span', ['forecast-data'], condition);

        $spanWrapper.append($spanName, $spanDegrees, $spanCondition);
        $divForecastWrapper.append($spanSymbol, $spanWrapper);
        $current().innerHTML = "";
        $current().append($divLabel, $divForecastWrapper);
    }

    function generateUpcomingWeatherInfo(upcoming) {
        const $divForecastWrapper = createHtmlElement('div', ['forecast-info']);
        const $divLabel = createHtmlElement('div', ['label'], upcomingText);

        upcoming.forecast.forEach((forecast) => {
            const {condition, low, high} = forecast;
            const symbol = getNormalizedSymbol(condition);
            const degrees = degreeRange(low, high);

            const $spanUpcoming = createHtmlElement('span', ['upcoming']);
            const $spanSymbol = createHtmlElement('span', ['symbol'], weatherSymbols[symbol]);
            const $spanDegrees = createHtmlElement('span', ['forecast-data'], degrees);
            const $spanCondition = createHtmlElement('span', ['forecast-data'], condition);

            $spanUpcoming.append($spanSymbol, $spanDegrees, $spanCondition);
            $divForecastWrapper.appendChild($spanUpcoming)
        });

        $upcoming().innerHTML = "";
        $upcoming().append($divLabel, $divForecastWrapper)
    }

    function degreeRange(low, high) {
        return `${low}${weatherSymbols.degrees}/${high}${weatherSymbols.degrees}`;
    }

    /**
     *
     * @param {string} tagName
     * @param {array} classNames
     * @param {string} textContent
     */
    function createHtmlElement(tagName, classNames = undefined, textContent = undefined) {
        const element = document.createElement(tagName);
        if (classNames) {
            element.classList.add(...classNames)
        }
        if (textContent) {
            element.textContent = textContent
        }
        return element
    }

    function errorHandle() {
        showForecast();
        hiddenForecast();
        const $error = createHtmlElement('h1', ['error','notification'], errorText);
        $error.setAttribute('id', 'error');
        $forecast().appendChild($error)
    }

    function showForecast() {
        $forecast().style = block;
        $current().style = block;
        $upcoming().style = block;
        const $errorElement = document.getElementById('error');
        if ($errorElement) {
            $errorElement.remove();
        }
    }

    function hiddenForecast() {
        $current().style = display;
        $upcoming().style = display;
    }
}

attachEvents();
