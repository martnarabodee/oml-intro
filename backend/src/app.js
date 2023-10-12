import express from 'express';
import cors from 'cors';
import Problem from './models.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get('/api/problem/:count', async (req, res) => {
    try {
      const problem = await Problem.findOne({ count: req.params.count });
      res.json(problem);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});
  

export default app;
