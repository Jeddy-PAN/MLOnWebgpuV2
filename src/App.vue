<script setup>
import { startTrain } from './utils/backend/CPU/ModelSetup/setUpData.ts';
import { setFlagTrain, setFlagStop } from './utils/backend/GPU/initModel/GPUTraining.js';
import {
	setReadyForTrain,
	getClientId,
	resetServer,
} from './utils/backend/CPU/tools/client.ts';
import { ref } from 'vue';
import LossPlot from './components/LossPlot.vue';
import ClassifyPlot from './components/ClassifyPlot.vue';

import { connectSocket, disconnectSocket, emitEvent } from './libs/socket.js';
import eventHub from './libs/eventHub.js';
import { onMounted, onUnmounted } from 'vue';
import { useSocketStore } from './store/socketStore.js';
import { storeToRefs } from 'pinia';

function clearLocalStorage() {
	localStorage.clear();
}

const socketStore = useSocketStore();
const { client_id } = storeToRefs(socketStore);
const dataSetName = ref('dataClass1.csv');
// const client_id = ref('');
const resetPlotFlag = ref(false);


// async function getID() {
// 	client_id.value = await getClientId();
// }
async function getID() {
	await emitEvent('get_client_id', null);
}

async function setReady() {
	await emitEvent('ready_to_train', client_id.value);
}

async function startTraining() {
	await emitEvent('get_dataset', {client_id: client_id.value, dataSetName: dataSetName.value});
}

onMounted(() => {
	eventHub.on('connect', eventHub.handleConnect);
	eventHub.on('disconnect', eventHub.handleDisconnect);
	eventHub.on('get_client_id', eventHub.handleGetId);
	eventHub.on('ready_to_train', eventHub.handleReady);
	eventHub.on('get_dataset', eventHub.handleGetData);
	eventHub.on('submit_gradients', eventHub.handleSubmitGradients);
})

onUnmounted(() => {
	eventHub.off('connect', eventHub.handleConnect);
	eventHub.off('disconnect', eventHub.handleDisconnect);
	eventHub.off('get_client_id', eventHub.handleGetId);
	eventHub.off('ready_to_train', eventHub.handleReady);
	eventHub.off('get_dataset', eventHub.handleGetData);
	eventHub.off('submit_gradients', eventHub.handleSubmitGradients);
})


</script>

<template>
	<div>
		<button @click="connectSocket">Connect</button>
		<button @click="disconnectSocket">Disconnect</button>
		<button @click="getID">GET id: {{ client_id }}</button>
		<button @click="setReady">Ready</button>

		<button
			@click="
				{
					setFlagTrain(); // set stopFlag in GPUTraining.js to false
					startTraining(); // start training
				}
			"
		>
			Start Traning
		</button>
		<button
			@click="
				setFlagStop(); // set stopFlag in GPUTraining.js to true
				resetServer(); // reset server status
				resetPlotFlag = true; // reset plot
			"
		>
			STOP & RESET
		</button>

		<button @click="clearLocalStorage()">Clear Local ID</button>
		<ClassifyPlot :reset-flag="resetPlotFlag" @classifyResetComplete="resetPlotFlag = false" />
		<LossPlot :reset-flag="resetPlotFlag" @resetComplete="resetPlotFlag = false" />
	</div>
</template>
