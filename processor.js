// processor.js
const store = require('./memoryStore');

function updateIngestionStatus(job) {
  const ingestion = store.ingestions[job.ingestion_id];
  if (!ingestion) return;

  const batch = ingestion.batches.find(b => b.batch_id === job.batch_id);
  if (batch) {
    batch.status = job.status;
  }
}

async function processNextBatch() {
  // Pick the next batch that is yet_to_start
  const nextJob = store.queue.find(job => job.status === 'yet_to_start');

  if (!nextJob) {
    // Nothing to process now
    return;
  }

  // Mark batch as triggered
  nextJob.status = 'triggered';
  updateIngestionStatus(nextJob);

  // Simulate external API call delay (1 second)
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Mark batch as completed
  nextJob.status = 'completed';
  updateIngestionStatus(nextJob);

  // Remove completed batch from queue
  store.queue = store.queue.filter(job => job.batch_id !== nextJob.batch_id);

  console.log(`Processed batch ${nextJob.batch_id} with ids: ${nextJob.ids.join(', ')}`);
}

// Process one batch every 5 seconds to respect rate limit
setInterval(() => {
  processNextBatch().catch(console.error);
}, 5000);

console.log('Background batch processor started.');
