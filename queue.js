const { v4: uuidv4 } = require('uuid');
const store = require('./memoryStore');

const PRIORITY_ORDER = { HIGH: 1, MEDIUM: 2, LOW: 3 };

function enqueueJob(ids, priority, ingestionId) {
    const batches = [];
    for (let i = 0; i < ids.length; i += 3) {
        const batchIds = ids.slice(i, i + 3);
        const batch_id = uuidv4();

        const job = {
            ingestion_id: ingestionId,
            batch_id,
            ids: batchIds,
            priority,
            createdAt: new Date(),
            status: 'yet_to_start'
        };

        store.queue.push(job);
        batches.push({ batch_id, ids: batchIds, status: 'yet_to_start' });
    }

    store.ingestions[ingestionId] = { ingestion_id: ingestionId, status: 'yet_to_start', batches };
    sortQueue();
}

function sortQueue() {
    store.queue.sort((a, b) => {
        if (PRIORITY_ORDER[a.priority] !== PRIORITY_ORDER[b.priority]) {
            return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
        }
        return a.createdAt - b.createdAt;
    });
}

function getStatus(ingestion_id) {
    const ingestion = store.ingestions[ingestion_id];
    if (!ingestion) return null;

    const batchStatuses = ingestion.batches.map(b => b.status);
    if (batchStatuses.every(s => s === 'yet_to_start')) {
        ingestion.status = 'yet_to_start';
    } else if (batchStatuses.every(s => s === 'completed')) {
        ingestion.status = 'completed';
    } else {
        ingestion.status = 'triggered';
    }

    return ingestion;
}

module.exports = {
    enqueueJob,
    getStatus
};
