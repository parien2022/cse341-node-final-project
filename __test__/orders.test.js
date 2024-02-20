const request = require('supertest')
const app = require('../app')

/*
 * Testing Get all Orders
 */
it('responds with json containing all the orders', (done) => {
  request(app)
    .get('/orders')
    .set('Accept', 'application/json')
    .expect('content-type', /json/)
    .expect(200,done());
})
