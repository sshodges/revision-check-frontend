import io from 'socket.io-client';
import md5 from 'md5';
import {
  addFolder,
  updateFolder,
  deleteFolder
} from '../actions/socketActions';
import store from '../store';

class Websocket {
  constructor(user) {
    const socket = io('https://revisioncheck.herokuapp.com/');
    socket.on('connect', function() {
      socket.on('connection:sid', function(socketId) {
        localStorage.socketId = socketId;
      });
    });

    socket.emit('join', md5(user));

    socket.on('add folder', function(folder) {
      folder.type = 'folder';
      console.log(folder);
      store.dispatch(addFolder(folder));
    });

    socket.on('update folder', function(folder) {
      folder.type = 'folder';
      console.log(folder);
      store.dispatch(updateFolder(folder));
    });

    socket.on('delete folder', function(folder) {
      console.log(folder);
      // store.dispatch(deleteFolder(folder));
    });

    socket.on('add document', function(folder) {
      console.log(folder);
    });

    socket.on('update document', function(folder) {
      console.log(folder);
    });

    socket.on('archive document', function(folder) {
      console.log(folder);
    });
  }
}

export default Websocket;
