const sessionIdroUserMap = new Map();

function setUser (id, user) {
    sessionIdroUserMap.set(id, user);
}

function getUser (id) {
    return sessionIdroUserMap.get(id);
}


module.exports = {
    setUser,
    getUser
}