export function getItems(url) {
    var URL = url;
    return fetch(URL, {method:"GET"}).then(res => res.json());
};