import express from 'express';
import { register } from '../controllers/authentication';
import router from 'router';
import {data} from '../../index';
import { sendEmail } from '../controllers/sendEmail';
export default(router:express.Router)=>{
    router.post('/auth/register',register);
    router.get('/getData',data);
    router.post('/sendEmail',sendEmail);
}