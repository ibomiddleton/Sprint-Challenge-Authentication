const server = require('./auth-router.js')
const request = require('supertest');

describe('POST /register', () => {
    xit('returns 201', () => {
        return request(server).get('/register')
        .then( res => {
            expect(res.status).toBe(201);
        })
    })
    it('should run the testing env', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });
});

describe('POST /login', () => {
    it('returns 200', () => {
        return request(server).get('/login')
        .then( res => {
            expect(res.status).toBe(200);
        })
    })
    it('should run the testing env', () => {
        expect(process.env.DB_ENV).toBe('testing');
    })
})
