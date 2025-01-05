import express from 'express';
import { modifyCourse } from '../server/mongo.db';
import { ICourse, ICourseRequestPost } from '../models/course.types';
import { handleError } from '../functions/handleError';

const MODIFY_COURSE = express.Router();

MODIFY_COURSE.put('/modify-course', async (request, response) => {
	const course: ICourseRequestPost = request.body;
	try {
		await modifyCourse(course);
		response
			.status(200)
			.json({ Succes: `Course ${course.name} has been modified successfully` });
	} catch (error: unknown) { 
		handleError(error, response);
	}
});

export default MODIFY_COURSE;