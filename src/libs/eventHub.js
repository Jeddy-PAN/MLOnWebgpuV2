import mitt from 'mitt';

const emitter = mitt();
import { useSocketStore } from '../store/socketStore';
import { startTrain } from '../utils/backend/CPU/tools/client';

const eventHub = {
  on: emitter.on,
  off: emitter.off,
  emit: emitter.emit,

  async handleConnect() {
    const socketStore = useSocketStore();
    if(socketStore) {
        socketStore.setConnected(true);
    }   
  },

  async handleDisconnect() {
    const socketStore = useSocketStore();
    if(socketStore) {
        socketStore.setConnected(false);
        socketStore.resetState();
    }
    
  },
  
  // 处理getId事件
  async handleGetId(res) {
    const socketStore = useSocketStore();
    socketStore.setId(res.data)
  },
  
  // 处理ready事件
  async handleReady(res) {
    const socketStore = useSocketStore();
    if (res.data == socketStore.client_id) {
        socketStore.setReady(true);
        console.log('Client is ready');
    }   
  },
  
  // 处理get_dataset事件
  async handleGetData(res) {
    // const socketStore = useSocketStore();
    // socketStore.setRawData(res.data);
    const dataset = res.data;
    console.log(dataset);
    // startTrain(dataset);
  },

};

export default eventHub;