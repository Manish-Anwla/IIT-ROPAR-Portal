import express from 'express';
import { check_email } from '../controllers/email_checking.js';
import { addCourse, getCourses, deleteCourse } from '../controllers/course_controller.js';
import { getEnrollmentRequests, respondToEnrollmentRequest } from '../controllers/enrollment_controller.js';

const router = express.Router();

router.post('/check-email', check_email);
router.post('/courses', addCourse);
router.get('/courses', getCourses);
router.delete('/courses/:courseId', deleteCourse);
router.get('/enrollment-requests', getEnrollmentRequests);
router.post('/enrollment-requests/respond', respondToEnrollmentRequest);

export default router;