const request = require('supertest')
const app = require('../app')

/*
 * Testing Orders endpoints
 */
describe('Testing Orders', () => {
  it('Responds with JSON with all the Orders', (done) => {
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

  //We must login
  it('Responds with JSON when the order is added', (done) => {
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
      .expect(201, done());
      })

      it('Responds with JSON when the order is Updated', (done) => {
        const newData = {
          user: 'messiL',
          date: '02/14/2024',
          conditions: 'Recovered',
        };
        request(app)
          .put('/orders/:id')
          .send(newData)
          .set('Accept', 'application/json')
          .expect('content-type', /json/)
          .expect(204, done());
          })
      
    
      it('Responds when the order is deleted', (done) => {
        request(app)
          .delete('/orders/:id')
          .set('Accept', 'application/json')
          .expect('content-type', /json/)
          .expect(204, done());
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

/*
 * Testing Clothes endpoints
 */
describe('Testing Clothes', () => {
  it('Responds with JSON with all the Clothes', (done) => {
    request(app)
      .get('/clothes')
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200, done());
  })

  it('Responds with JSON with a Clothe by ID', (done) => {
    request(app)
      .get('/clothes/:id')
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200, done());
  })

})
