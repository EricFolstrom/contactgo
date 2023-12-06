import express, {Router} from "express"
import { createContact, deleteContacts, getContact, getContacts, updateContact } from "@/controllers/contact";
import { ContactFactory } from "@/db/Contact";
import makeHttpError from "@/helpers/http-error";
import makeHttpResponse from "@/helpers/http-response";

const route = Router()



export default function createContactEndpoints(contactFactory : ContactFactory) : Router{
    route.get("/", async (req: express.Request, res: express.Response, next: express.NextFunction) =>{
        
        const { limit = 2, page = 1 } : any = req.query;

        try {
            const contactsData = await getContacts({
                limit: parseInt(limit),
                page: parseInt(page),
                contactFactory
            })

             res.send(makeHttpResponse({
                statusCode: 200,
                data: contactsData
             }))

        } catch (error:any) {
            res.send(makeHttpError({
                statusCode: 400,
                errorMessage: error.message
            }))
        }
    });

    route.get("/:contactId", async (req: express.Request, res: express.Response, next: express.NextFunction) =>{
        const contactId = req.params.contactId

        try {
            const contact = await getContact({
                contactId,
                contactFactory
            })

             res.send(makeHttpResponse({
                statusCode: 200,
                data: contact
             }))

        } catch (error:any) {
            res.send(makeHttpError({
                statusCode: 400,
                errorMessage: error.message
            }))
        }
    });

    route.post("/", async (req: express.Request, res: express.Response, next: express.NextFunction) =>{
        const { nom, prenom, email, telephone } = req.body;
        try {
            const contact = await createContact({ 
                params: {
                    nom, prenom, email, telephone
                },
                contactFactory
             })

             res.send(makeHttpResponse({
                statusCode: 200,
                data: contact
             }))

        } catch (error:any) {
            res.send(makeHttpError({
                statusCode: 400,
                errorMessage: error.message
            }))
        }
    });

    route.put("/:contactId", async (req: express.Request, res: express.Response, next: express.NextFunction) =>{

        const { nom, prenom, email, telephone } = req.body;
        const contactId = req.params.contactId
        try {
            const contact = await updateContact({ 
                params: {
                    nom, prenom, email, telephone
                },
                contactId,
                contactFactory
             })

             res.send(makeHttpResponse({
                statusCode: 200,
                data: contact
             }))

        } catch (error:any) {
            res.send(makeHttpError({
                statusCode: 400,
                errorMessage: error.message
            }))
        }
    });

    route.delete("/", async (req: express.Request, res: express.Response, next: express.NextFunction) =>{

        const { contactIds } = req.body;
        try {
            await deleteContacts({ 
                contactIds,
                contactFactory
             })

             res.send(makeHttpResponse({
                statusCode: 200,
                data: "ok"
             }))

        } catch (error:any) {
            res.send(makeHttpError({
                statusCode: 400,
                errorMessage: error.message
            }))
        }
    });

    return route
}