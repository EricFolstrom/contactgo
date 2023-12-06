import express from 'express';

// fonction qui prend l'objet "request" fourni par express et retourner une
// version minimal de cet object corespondant a nos cas d'utilisations
export default function requestAdapter(req: express.Request) {
    return {
        path: req.path,
        method: req.method,
        params: req.params,
        query: req.query,
        body: req.body,
    };
}
