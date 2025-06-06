import { defineStore } from "pinia";

export const useSocketStore = defineStore('socket', {
    state: () => ({
        client_id: null,
        isConnected: false,
        isReady: false,
        rawData: null
    }),
    actions: {
        setId(id) {
            this.client_id = id;
        },
        setConnected(status) {
            this.isConnected = status;
        },
        setReady(status) {
            this.isReady = status;
        },
        setRawData(payload) {
            this.rawData = payload;
        },
        resetState() {
            this.client_id = null;
            this.isReady = false;
            this.rawData = null;
        }
    }
})