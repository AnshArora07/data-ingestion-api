const store = {
    ingestions: {}, // ingestion_id -> { batches: [{ batch_id, ids, status }] }
    queue: []        // [{ ingestion_id, batch_id, ids, priority, createdAt, status }]
};

module.exports = store;
