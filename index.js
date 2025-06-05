const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { enqueueJob, getStatus } = require('./queue');
const app = express();
app.use(express.json());

app.post('/ingest', (req, res) => {
    const { ids, priority } = req.body;
    if (!ids || !Array.isArray(ids) || !priority) {
        return res.status(400).json({ error: 'Invalid input' });
    }

    const ingestionId = uuidv4();
    enqueueJob(ids, priority.toUpperCase(), ingestionId);
    res.json({ ingestion_id: ingestionId });
});

app.get('/status/:id', (req, res) => {
    const ingestionId = req.params.id;
    const result = getStatus(ingestionId);
    if (!result) {
        return res.status(404).json({ error: 'Ingestion ID not found' });
    }
    res.json(result);
});

app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});

require('./processor');
