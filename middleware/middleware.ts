import { Request, Response, NextFunction } from "express";
import { validateToken } from "../routers/login/login-session";
import { handleError } from "../functions/handleError";

export const verifyAuthToken = (request: Request, response: Response, next: NextFunction) => {
    if (request.path !== "/api/login" && request.path !== '/api/login-session' ) {
        try {
            const TOKEN = request.cookies.session;
            const DECODED = validateToken(TOKEN);
        } catch (error) {
            response.status(403).send({unauthorized: "Geen toegang."});
        }    
    }
    next();
}