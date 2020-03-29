import io from 'socket.io-client';
import md5 from 'md5';
import {
  addFolder,
  addRevision,
  updateFolder,
  deleteFolder,
  addDocument,
  archiveDocument,
  updateDocument
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

    // Folders
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
      store.dispatch(deleteFolder(folder));
    });

    // Documents
    socket.on('add document', function(document) {
      document.type = 'document';
      console.log(document);
      store.dispatch(addDocument(document));
    });

    socket.on('update document', function(document) {
      document.type = 'document';
      console.log(document);
      // TODO: A bit messy until archive endpoint created in backend, everything done under update
      if (document.status) {
        store.dispatch(updateDocument(document));
      } else {
        store.dispatch(archiveDocument(document));
      }
    });

    // Revision
    socket.on('add revision', function(revision) {
      console.log(revision);
      store.dispatch(addRevision(revision));
    });
  }
}

export default Websocket;
