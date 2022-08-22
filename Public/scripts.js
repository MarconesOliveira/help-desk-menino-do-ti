const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        login();
    });
}

const saveToken = (token) => {
    localStorage.setItem("token_menino_do_ti", JSON.stringify(token));
}
const getToken = () => {
    return localStorage.getItem("token_menino_do_ti");
}
const deleteToken = () => {
    localStorage.removeItem("token_menino_do_ti");
}

const login = async () => {

    const formData = new FormData(form);
    const formDataJSON = Object.fromEntries(formData.entries());

    axios({
        method: "POST",
        url: "/login",
        data: JSON.stringify(formDataJSON),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(res => {
        saveToken(res.data.msg.jwtToken);
        window.location.href = "/";
    }).catch((err) => {
        console.log(err.response.data.msg);
    });

}
