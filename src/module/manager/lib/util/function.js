function redirect(location = '#/login') {
    const hashReg = /^#w+/;
    if (hashReg.test(location)) {
        return window.location.hash = location;
    }
    window.location.href = location;
}
function goback() {
    window.history.back();
}

export { redirect, goback };
