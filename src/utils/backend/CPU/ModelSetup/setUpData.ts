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

	const data = new Data(dataset, 0, dataset.length - 1, 2, 2, computeGraphStore.batchSize);
	data.dataSetName = 'classify';
	console.log('data is ready', dataset.length);

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
