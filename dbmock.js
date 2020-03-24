const db = {}

// utils
const uid = () => Math.random().toString();
// minuscules 97-122
const randomWord = len => {
    let name = '';
    while (name.length < len) {
        name += String.fromCharCode(Math.floor(Math.random()*26) + 97)
    }
    return name;
}
const randomText = len => {
    let text = '';
    while (text.length < len) {
        text += randomWord(Math.floor(Math.random() * 15)) + ' '
    }
    return text.slice(0, len);
}

// tables
const users = []
const posts = []
const validKeys = []

// factorys

const createUser = ({
    name,
    hash
}) => {
    if ( ! hash ) {
        throw Error('hash is required');
    }
    if ( ! name ) {
        throw Error('name is required');
    }
    return {
        id: uid(),
        name,
        hash
    };
}

const createPost = ({
    text = '',
    user
}) => {
    if ( ! user ) {
        throw Error('user is required');
    }
    return {
        id: uid(),
        text,
        user,
        date: Date()
    }
}

// methods
db.getUsers = ({id}) => users
db.getPosts = ({from, to}) => posts

// remplir la db avec des users et des posts au hasard
db.init = () => {
    for (let i = 0; i < 20; i += 1) {
        users.push( createUser({
            name: randomWord(5),
            hash: randomWord(16)
        }))
    }
    for (let i = 0; i < 20; i += 1) {
        users.push( createPost({
            text: randomText(400),
            user: users[Math.floor(Math.random()*users.length)].id
        }))
    }
}
// 

module.exports = db;