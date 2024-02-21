const mockingoose = require('mockingoose');
const paymentController = require('../controllers/paymentMethods');
const paymentModel = require('../models/paymentMethods');
const {startDb} = require('../db/connection');
const {ObjectId} = require('mongodb');


beforeAll((done) => {
    startDb((err) => {
      if (err) {
        console.error('Error initializing database:', err);
        done(err);
      } else {
        console.log('Database initialized successfully');
        done();
      }
    });
  });


describe('Testing Payment Methods', () => {
    
    let generatedId

    test('Get all payment methods', async () => {


        const payments = [];

        mockingoose(paymentModel).toReturn(payments, 'find');
    
        const req = {}
        const res = {
            setHeader: jest.fn(),
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
    
        await paymentController.getAll(req, res);
    
        expect(res.status).toBeCalledWith(200);
    })


    test('Get payment methods by ID', async () => {

        const paymentId = new ObjectId("65c6c8676a56c510d7412946");

        const payments = {
            _id: paymentId,
            method_name: "Credit Card",
            issuer: "Diners Club",
            card_number: "9012 3456 7890 1234",
            expiration_date: "11/29",
            cvv: "654"
          };

        mockingoose(paymentModel).toReturn(payments, 'find');
    
        const req = {params: {id: paymentId.toString()}}
        const res = {
            setHeader: jest.fn(),
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
    
        await paymentController.getSingleById(req, res);
    
        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith(payments);
    })


    test('Get payment methods by Name', async () => {


        const paymentId = new ObjectId("65c6c8676a56c510d7412942");
        const card = "1234 5678 9012 3456";

        const payments = {
            _id: paymentId,
            method_name: "Credit Card",
            issuer: "Visa",
            card_number: "1234 5678 9012 3456",
            expiration_date: "12/25",
            cvv: "123"
          };

        mockingoose(paymentModel).toReturn(payments, 'find');
    
        const req = {params: {card_number: card}}
        const res = {
            setHeader: jest.fn(),
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
    
        await paymentController.getSingleByCard(req, res);
    
        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith(payments);
    })


    test('Insert payment method', async () => {

        const req = {
            body:{
                method_name: "Debit Card",
                issuer: "Visa",
                card_number: "4941 2856 6734 9456",
                expiration_date: "12/26",
                cvv: "593"
            }
        }

        mockingoose(paymentModel).toReturn({ req }, 'insertOne');
    
        const res = {
            setHeader: jest.fn(),
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
    
        await paymentController.createPaymentMethod(req, res);
    
        expect(res.status).toBeCalledWith(201);

        generatedId = res.json.mock.calls[0][0]._id;
    })


    test('Update payment method', async () => {

        const req = {
            body:{
                method_name: "Debit Card",
                issuer: "Visa",
                card_number: "4941 2856 6734 9456",
                expiration_date: "12/26",
                cvv: "400"
            },
            params: {id: "65d549e0a5db0c2f05b83298"}
        }

        mockingoose(paymentModel).toReturn({ req }, 'updateOne');
    
        const res = {
            setHeader: jest.fn(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        }
    
        await paymentController.updatePaymentMethod(req, res);
    
        expect(res.status).toBeCalledWith(204);
    })


    test('Delete payment method', async () => {

        const req = {
            params: {id: generatedId.toString()}
        }

        mockingoose(paymentModel).toReturn({ req }, 'deleteOne');
    
        const res = {
            setHeader: jest.fn(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        }
    
        await paymentController.deletePaymentMethod(req, res);
    
        expect(res.status).toBeCalledWith(204);
    })
})
