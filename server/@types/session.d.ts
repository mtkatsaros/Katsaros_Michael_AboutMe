/**
 * session.d.ts
 * 
 * @description adds ObjectId to interface SessionData
 */
import mongoose from "mongoose";

declare module "express-session"{
    interface SessionData {
        userId: mongoose.Types.ObjectId;
    }
}