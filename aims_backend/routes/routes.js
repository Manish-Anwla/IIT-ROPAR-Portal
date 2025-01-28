import express from 'express';
import { check_email } from '../controllers/email_checking.js';

const router = express.Router();

router.post('/check-email', check_email);

export default router;