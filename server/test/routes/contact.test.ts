import request from 'supertest';
import express from 'express';
import start from '@/server';
import { dropDatabase, setupDb } from '@test/db/setup';

let testServer: any;
let testApp: any;

beforeAll(async () => {
    await setupDb();
    const { server, app } = await start();
    testServer = server;
    testApp = app;
});

afterAll(async () => {
    await dropDatabase();
    testServer.close();
});

describe('POST /contact', function () {
    let contact: any;

    it('should add one contact', async function () {
        const res = await request(testApp).post('/contacts').send({
            nom: 'Doe',
            prenom: 'John',
            telephone: '+228 99 99 99 99',
            email: 'johnson.doe@gmail.com',
        });

        contact = res.body.data;

        expect(res.statusCode).toBe(200);
        expect(res.body.data).toHaveProperty('_id');
        expect(res.body.data.email).toBe('johnson.doe@gmail.com');
    }, 20000);

    it('should retrieve one contact', async function () {
        const res = await request(testApp).get(`/contacts/${contact._id}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.data).toHaveProperty('_id');
        expect(res.body.data.email).toBe('johnson.doe@gmail.com');
    }, 20000);

    it('should delete one contact', async function () {
        const res = await request(testApp)
            .delete(`/contacts/`)
            .send({
                contactIds: [contact._id],
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.data).toBe('ok');
    }, 20000);
});
