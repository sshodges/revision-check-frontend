import io from 'socket.io-client';
import md5 from 'md5';
import {
  addFolder,
  updateFolder,
  deleteFolder,
  addDocument,
  archiveDocument,
  updateDocument,
  addRevision,
  updateRevision,
} from '../actions/socketActions';
import store from '../store';

class Websocket {
  constructor(account) {
    const socket = io('http://localhost:5000');
    socket.on('connect', function () {
      socket.on('connection:sid', function (socketId) {
        localStorage.socketId = socketId;
      });
    });

    console.log('has', md5(account) + process.env.REACT_APP_SOCKET_HASH);

    socket.emit('join', md5(account) + process.env.REACT_APP_SOCKET_HASH);

    // rejoin if there's a disconnect
    socket.on('reconnect', () => {
      socket.emit('join', md5(account) + process.env.REACT_APP_SOCKET_HASH);
    });

    // Folders
    socket.on('add folder', function (folder) {
      folder.type = 'folder';
      console.log(folder);
      store.dispatch(addFolder(folder));
    });

    socket.on('update folder', function (folder) {
      folder.type = 'folder';
      store.dispatch(updateFolder(folder));
    });

    socket.on('delete folder', function (folder) {
      store.dispatch(deleteFolder(folder));
    });

    // Documents
    socket.on('add document', function (document) {
      document.type = 'document';
      store.dispatch(addDocument(document));
    });

    socket.on('update document', function (document) {
      document.type = 'document';
      // TODO: A bit messy until archive endpoint created in backend, everything done under update
      if (document.status) {
        store.dispatch(updateDocument(document));
      } else {
        store.dispatch(archiveDocument(document));
      }
    });

    // Revision
    socket.on('add revision', function (revision) {
      store.dispatch(addRevision(revision));
    });

    socket.on('update revision', function (revision) {
      store.dispatch(updateRevision(revision));
    });
  }
}

export default Websocket;
