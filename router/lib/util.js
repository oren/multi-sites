// return true if `str` starts with `starts`
function startWith(str, starts) {
    return str.indexOf(starts) === 0;
}

function isContained(pathname) {
    return function (prefix) {
        return startWith(pathname, prefix);
    }
}

module.exports = {
    startWith: startWith,
    isContained: isContained
};

