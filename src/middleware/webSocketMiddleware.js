import * as actionTypes from '../store/actions/actionTypes';
import * as webSocketActions from '../store/actions/webSocketActions';

const webSocketsMiddleware = (function () {
    let socket = null;

    /**
     * Handler for when the WebSocket opens
     */
    const onOpen = (ws, store, host) => event => {
        // Authenticate with Backend... somehow...
        // console.log(event, host);
        store.dispatch(webSocketActions.webSocketConnectSuccess(event.target.url))
    };

    /**
     * Handler for when the WebSocket closes
     */
    const onClose = (ws, store, host) => event => {
        store.dispatch(webSocketActions.webSocketDisconnect(host));
        console.log('Socket is closed', event.reason);
        // setTimeout(() => {
        //     store.dispatch(webSocketsActions.webSocketConnect(host));
        // }, 5000);

    };

    /**
     * Handler for when a message has been received from the server.
     */
    const onMessage = (ws, store) => event => {
        const payload = JSON.parse(event.data);
        console.log(payload);
        switch (payload.type) {
            case actionTypes.WS_MESSAGE:
                store.dispatch(webSocketActions.webSocketMessage(event.host, payload));
                break;
            default: console.log('default'); break;
        }

    };

    /**
     * Middleware
     */

    return store => next => action => {
        console.log(action.type);
        switch (action.type) {
            case actionTypes.AUTH_SUCCESS:
                if (socket !== null) {
                    socket.close()
                }

                // Pass action along
                next(action);

                // // Tell the store that we're busy connecting...
                store.dispatch(webSocketActions.webSocketConnectStart('ws://192.168.1.45:8000/ws/'));
                let user = JSON.parse(localStorage.getItem('user'));
                // console.log(user);
                // Attempt to connect to the remote host...
                socket = new WebSocket(`ws://192.168.1.45:8000/ws/?token=${user.token}`);

                // Set up WebSocket handlers
                socket.onmessage = onMessage(socket, store);
                socket.onclose = onClose(socket, store, action.host);
                socket.onopen = onOpen(socket, store, action.host);

                break;
            case 'NEW_MESSAGE':
                console.log('sending a message', action.msg);
                socket.send(JSON.stringify({ command: 'NEW_MESSAGE', message: action.msg }));
                break;

            case actionTypes.AUTH_LOGOUT:
                if (socket !== null) {
                    socket.close()
                }
                socket = null;

                // Tell the store that we've been disconnected...
                store.dispatch(webSocketActions.webSocketDisconnect(action.host));
                break;
            default:
                return next(action);
        }
    };
})();

export default webSocketsMiddleware;