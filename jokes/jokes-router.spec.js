const server = require('./jokes-router');
const request = require('supertest');

describe('GET /', () => {
    it('returns 200', () => {
        return request(server).get('/')
        .then( res => {
            expect(res.status).toBe(200);
        })
    })
    it('should run the testing env', () => {
        expect(process.env.DB_ENV).toBe('testing');
    })
});