import express from 'express';
import { createCourse } from '../server/mongo.db';
import { ICourse, ICourseRequestPost } from '../models/course.types';
import { handleError } from '../functions/handleError';

const CREATE_COURSE_ROUTER = express.Router();

CREATE_COURSE_ROUTER.post('/create-course', async (request, response) => {
	const COURSE : ICourseRequestPost = request.body;
	const COURSE_TO_ADD: ICourse = {
		key: COURSE.name,
		content: COURSE
	}
	try {
		await createCourse(COURSE_TO_ADD);
		response.status(201);
		response.json({
			course: `${COURSE.name} has been created successfully`
		});
	} catch (error: unknown) { 
		handleError(error, response);
	}
});

export default CREATE_COURSE_ROUTER;