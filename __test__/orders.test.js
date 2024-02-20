const request = require('supertest')
const app = require('../app')

/*
 * Testing Orders endpoints
 */
describe('Testing Orders', () => {
  it('Responds with JSON with all the orders', (done) => {
    request(app)
      .get('/orders')
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200, done());
  })

  it('Responds with JSON with an order by ID', (done) => {
    request(app)
      .get('/orders/:id')
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200, done());
  })

  it('Responds with JSON with an order by Status', (done) => {
    request(app)
      .get('/orders/name/:conditions')
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200, done());
  })

  it('Responds with JSON with the order saved', (done) => {
    const data = {
      user: 'messiL',
      date: '02/14/2024',
      conditions: 'cancelled',
    };
    request(app)
      .post('/orders')
      .send(data)
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(201)
      .end(err => {
        if (err) return done(err);
        done();
      })
  })


  

})

/*
 * Testing Users endpoints
 */
describe('Testing Users', () => {
  it('Responds with JSON with all the users', (done) => {
    request(app)
      .get('/users')
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200, done());
  })

  it('Responds with JSON with an User by ID', (done) => {
    request(app)
      .get('/users/:id')
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200, done());
  })

})