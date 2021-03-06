const commands = (state = { commands: {}, ids: []}, action) => {
    switch(action.type) {
        case 'GOT_COMMANDS':
            return {...state, commands: action.commands, ids: action.ids, fetching: false };
        case 'GET_COMMANDS':
            return {...state, fetching: true};
        default:
            return state;
    }
}

export default commands;
 
