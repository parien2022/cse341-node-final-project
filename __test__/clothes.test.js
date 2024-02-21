const mockingoose = require('mockingoose');
const clotheController = require('../controllers/clothes');
const clothesModel = require('../models/paymentMethods');
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


        const clothes = [];

        mockingoose(clothesModel).toReturn(clothes, 'find');
    
        const req = {}
        const res = {
            setHeader: jest.fn(),
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
    
        await clotheController.getAll(req, res);
    
        expect(res.status).toBeCalledWith(200);
    })


    test('Get payment methods by ID', async () => {

        const clotheId = new ObjectId("65c3e9cb7b3963d5efdf6d3c");

        const clothes = {
            _id: clotheId,
            title: "JEAN WIDE LEG LUA ATLANTIC",
            price: "20.00",
            category: "Jeans",
            description: "Wide waist jeans, light blue",
            image: "https://www.lto.com.ar/wp-content/uploads/2023/12/DSC_8649-1-700x1051.jpg"
          };

        mockingoose(clothesModel).toReturn(clothes, 'find');
    
        const req = {params: {id: clotheId.toString()}}
        const res = {
            setHeader: jest.fn(),
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
    
        await clotheController.getSingle(req, res);
    
        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith(clothes);
    })


    test('Get payment methods by Name', async () => {


        const clotheId = new ObjectId("65c0e67649d439ae1d68094e");
        const categoryItem = "T-shirts";

        const clothes = {
            _id: clotheId,
            title: "BADGE OF SPORT BASIC T-SHIRT",
            price: "29.00",
            category: "T-shirts",
            description: "The coolest t-shirts, like the coolest people, fit anywhere effortlessly.",
            image: "https://assets.adidas.com/images/w_180,f_auto,q_auto,fl_lossy,c_fill,g_auto/ed6125f4de98446dac51aa07005cdcf4_9366/Remera_Badge_of_Sport_Basic_Negro_ED9605_01_laydown.jpg"
          };

        mockingoose(clothesModel).toReturn(clothes, 'find');
    
        const req = {params: {category: categoryItem}}
        const res = {
            setHeader: jest.fn(),
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
    
        await clotheController.getSingleByCategory(req, res);
    
        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith(clothes);
    })


    test('Insert payment method', async () => {

        const req = {
            body:{
                title: "New Clothe",
                price: "50.00",
                category: "T-shirts",
                description: "Some description",
                image: "https://assets.adidas.com/images/w_600,f_auto,q_auto/182a6cdbe1b74276a…"
            }
        }

        mockingoose(clothesModel).toReturn({ req }, 'insertOne');
    
        const res = {
            setHeader: jest.fn(),
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
    
        await clotheController.createClothes(req, res);
    
        expect(res.status).toBeCalledWith(201);

        generatedId = res.json.mock.calls[0][0]._id;
    })


    test('Update payment method', async () => {

        const req = {
            body:{
                title: "New Clothe Updated",
                price: "50.00",
                category: "T-shirts",
                description: "Some description",
                image: "https://assets.adidas.com/images/w_600,f_auto,q_auto/182a6cdbe1b74276a…"
            },
            params: {id: "65c7cb093e99dbbfdf40652d"}
        }

        mockingoose(clothesModel).toReturn({ req }, 'updateOne');
    
        const res = {
            setHeader: jest.fn(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        }
    
        await clotheController.updateClothes(req, res);
    
        expect(res.status).toBeCalledWith(204);
    })


    test('Delete payment method', async () => {

        const req = {
            params: {id: generatedId.toString()}
        }

        mockingoose(clothesModel).toReturn({ req }, 'deleteOne');
    
        const res = {
            setHeader: jest.fn(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        }
    
        await clotheController.deleteClothes(req, res);
    
        expect(res.status).toBeCalledWith(204);
    })
})
