import express from 'express';
import { createPerspective, getOwnPerspectives } from '../Controller/perspectiveController.js';

const router = express.Router();

router.post('/perspectives', createPerspective);
router.get('/perspectives', getOwnPerspectives);

export default router;
