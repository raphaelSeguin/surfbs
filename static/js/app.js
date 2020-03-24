const logPage   = 'html/log.html';
const forumPage = 'html/forum.html';
const wrapper = document.querySelector('#wrapper');

const state = {
    logged: false,
    avatar: ''
}
const callbacks = {}

const alterState = (prop, val) => {
    // change state prop
    if ( ! state[prop] ) {
        throw Error('no prop ' + prop + ' in state, you can not alter it');
    }
    if ( val !== state[prop] ) {
        state[prop] = val;
        callbacks.forEach( cb => cb(val));
    }
}

const subscribe = (prop, callback) => {
    if ( ! state[prop] ) {
        throw Error('no prop ' + prop + ' in state, you can not subscribe');
    }
    if ( ! callbacks[prop] ) {
        callbacks[prop] = [ callback]
    } else {
        callbacks[prop].push(callback);
    }
}


fetch(forumPage)
    .then( res => {
        res.text()
            .then( txt => wrapper.insertAdjacentHTML('beforeend', txt))
    })
