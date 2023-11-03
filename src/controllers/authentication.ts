import express from 'express';
import { createUser, getUserByEmail , getUserByPhoneno } from '../db/users';

export const register = async(req:express.Request,res:express.Response)=>{
    try {
        const {username , email , phoneno , hobbies} = req.body;

        if(!email || !phoneno || !username) {
            return res.sendStatus(400);
        } 

        const existingUserWithEmail = await getUserByEmail(email);
        const existingUserWithPhoneno = await getUserByPhoneno(phoneno);
        if(existingUserWithEmail || existingUserWithPhoneno) {
            return res.sendStatus(400);
        }



        const user = await createUser({
            username,
            email,
            phoneno,
            hobbies
        });         

        return res.sendStatus(200).end();

    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}