import Data from '../tools/DataClass';
import { useComputeGraphStore } from '../../../../store/computeGraphStore';
import { useSocketStore } from '../../../../store/socketStore';
import setUpModel from './setUpModel';
import { getClientId, fetchDataset } from '../tools/client';

const startTrain = async (dataset) => {
	const computeGraphStore = useComputeGraphStore();
	// const socketStore = useSocketStore();

	// const datasetName = 'easy_class.';
	// startTrain(datasetName);

	// const client_id = socketStore.client_id;

	// const dataset = await fetchDataset(client_id);

	// stopFlag.value = false;

	const dataArray: number[][] = dataset
		.trim()
		.split('\n')
		.map((row) => row.split(',').map(Number));

	const data = new Data(dataArray, 0, dataArray.length - 1, 2, 2, computeGraphStore.batchSize);
	data.dataSetName = 'classify';
	console.log('data is ready', dataArray.length);

	setUpModel(data);
	// 	},
	// });
};

// const startTrain = async () => {
// 	const computeGraphStore = useComputeGraphStore();
// 	const socketStore = useSocketStore();

// 	const client_id = socketStore.client_id;
// 	const dataset = socketStore.rawData;
// }

export { startTrain };
