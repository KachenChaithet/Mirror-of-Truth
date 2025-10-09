import express from 'express';
import { addUser } from '../Controller/userController.js';

const router = express.Router();


router.get('/profile', addUser);



export default router;