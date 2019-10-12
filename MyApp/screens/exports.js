export function getJSONRepos(common) {
    return fetch('https://localhost:5000/name/common=' + common).then(response => response.json());
}
