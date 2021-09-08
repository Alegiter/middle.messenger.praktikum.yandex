import mock from 'xhr-mock';
import { assert, expect } from 'chai';
import { Done } from 'mocha';
import HttpClient from './http-client';

describe('HttpClient testing', () => {
    before(() => mock.setup());

    after(() => mock.teardown());

    it('should test post request', (done: Done) => {
        const url = '/test';
        const body = { post: { test: 'request' } };
        const responseBody = { answer: 'post' };
        mock.post(url, (req, res) => {
            assert(req.header('Content-Type') === 'application/json');
            expect(req.body()).equals(JSON.stringify(body));
            return res.status(201).body(JSON.stringify(responseBody));
        });
        const http = new HttpClient();
        http.post<typeof responseBody>(url, { body }).then((response) => {
            expect(response).deep.equals(responseBody);
            done();
        });
    });
});
