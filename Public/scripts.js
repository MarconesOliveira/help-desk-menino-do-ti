
const parseJwt = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
const saveToken = (token) => {
    localStorage.setItem("token_menino_do_ti", token);
}
const getToken = () => {
    return localStorage.getItem("token_menino_do_ti");
}
const deleteToken = (msg) => {
    localStorage.removeItem("token_menino_do_ti");
    window.location.href = "/";
    if(msg) alert(msg);
}
setInterval(() => {
    if(getToken()) {
        axios({
            method: "POST",
            url: `/verifyToken`,
            headers: {
                Authorization: `Bearer ${getToken()}`,
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(res => {
            console.log(res.status);
        }).catch((err) => {
            console.log(err.response.status);
            if(err.response.status === "403") {
                deleteToken("Token expirou");
            }
        });
    }
}, 30000);
