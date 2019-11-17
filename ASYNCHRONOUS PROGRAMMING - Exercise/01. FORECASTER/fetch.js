export function weather() {
    const baseURL = "https://judgetests.firebaseio.com/";

    return {
        location: () => fetch(baseURL + "locations.json").then((result) => result.json()),
        today: (code) => fetch(baseURL + `forecast/today/${code}.json`).then((result) => result.json()),
        upcoming: (code) => fetch(baseURL + `forecast/upcoming/${code}.json`).then((result) => result.json())
    }
}
