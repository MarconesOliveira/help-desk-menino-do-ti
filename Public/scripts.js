
const saveToken = (token) => {
    localStorage.setItem("token_menino_do_ti", token);
}
const getToken = () => {
    return localStorage.getItem("token_menino_do_ti");
}
const deleteToken = () => {
    localStorage.removeItem("token_menino_do_ti");
}
