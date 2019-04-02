export function setState(state) {
    return { type: 'SET_STATE', args: state};
};

export function addEntry(entry) {
    return { type: 'ADD_ENTRY', args: entry };
}

export function clear() {
    return { type: 'CLEAR', args: null};
}

export function setConnectionState(fargs) {
    return { type: 'SET_CONNECTION_STATE', args: fargs};
}

export function selectSession(fargs) {
    return { type: 'SELECT_SESSION', args: fargs};
}

export function selectLog(fargs) {
    return { type: 'SELECT_LOG', args: fargs};
}
