
import express from 'express';
const router = express.Router();
import {getWidgets, createWidget, deleteWidget} from '../controllers/widget';

router.get('/widgets', getWidgets);
router.post('/widgets', createWidget);
router.delete('/widgets/:id', deleteWidget);

export default router;