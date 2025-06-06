import { io } from 'socket.io-client';
import eventHub from './eventHub';

let socket = null;

export async function initSocketConnection() {
    if(socket && socket.connected) {
        return;
    }
    socket = io('http://localhost:3000', {
        autoConnect: false
    });

    initSocketListeners();
}


export function initSocketListeners() {
    socket.on('connect', () => {
        eventHub.emit('connect');
    })

    socket.on('disconnect', () => {
        eventHub.emit('disconnect');
    })

    socket.on('get_client_id', (res) => {
       eventHub.emit('get_client_id', res);
    }) 

    socket.on('ready_to_train', (res) => {
        eventHub.emit('ready_to_train', res);
    })

    socket.on('get_dataset', (res) => {
        eventHub.emit('get_dataset', res);
    })

    socket.on('submit_gradients', (res) => {
        eventHub.emit('submit_gradients', res);
    })

    socket.on('connect_error', (error) => {
        console.log('Connect Error: ', error.message);
    });

    socket.on('error', (error) => {
        console.log('Error: ', error.message);
    });
}

export async function connectSocket() {
    if(!socket) {
        await initSocketConnection();
        console.log(socket);
    } else if(socket.connected){
        return;
    }
    socket.connect();
}

export async function disconnectSocket() {
    if(socket && socket.connected) {
        socket.disconnect();
        socket = null;
    }
}

export async function emitEvent(type, payload) {
    if(socket?.connected){
        socket.emit(type, payload);
    } else {
        console.log('Socket Not Connected');
    }
    
}

export default socket;