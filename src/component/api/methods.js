
// // const baseUrl = "http:localhost:3003"



function getheaders() {
    var options = { 'Content-Type': 'application/json' };
    return options;
}


// export function Get(url) {
//     return fetch(baseUrl + url, getheaders()).then(response => response.json())
//         .then(res => {
//            console.log(res.data)
//             return res;
//         })
// }

// export function Post(url, body) {
//     const requestOptions = {
//         method: 'POST',
//         headers: getheaders(),
//         body: JSON.stringify(body)
//     };
//     return fetch(baseUrl + url, requestOptions).then(response => response.json())
//         .then(res => {
//             console.log(res.data)
//             return res;
//         })
// }

// export function Update(url, body) {
//     const requestOptions = {
//         method: 'PUT',
//         headers: getheaders(),
//         body: JSON.stringify(body)
//     };
//     return fetch(baseUrl + url, requestOptions).then(response => response.json())
//         .then(res => {
//             console.log(res.data)
//             return res;
//         })
// }

// export function Remove(url) {
//     const requestOptions = {
//         method: 'DELETE',
//         headers: getheaders()
//     };
//     return fetch(baseUrl + url, requestOptions).then(response => response.json())
//         .then(res => {
//             console.log(res.data)
//             return res;
//         })
// }






