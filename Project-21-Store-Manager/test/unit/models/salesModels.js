const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const salesModel = require('../../../models/salesModel');
const productsService = require('../../../services/productsService');
const productsModel = require('../../../models/productsModel');


describe('4-Test SALES MODELS return data from Database', () => {
  describe('Test return data from Database is empty array', () => {

    const returnExpect = [[]];

    before(() => {
      sinon.stub(connection, 'query').returns(returnExpect);
    });

    after(() => {
      connection.query.restore();
    });

    it('Test return array from DB', async () => {
      const arrReturn = await salesModel.getAll();
      expect(arrReturn).to.be.an("array");
    });

    it('Test return empty array from DB', async () => {
      const arrReturn = await salesModel.getAll();
      expect(arrReturn).to.be.empty;
    });
  });

  describe('Test return getProducts from Database', ()=>{

    const returnExpect = [[
      {
        'id': 1,
        'name': 'produto A',
        'quantity': 10
      }
    ]];

    beforeEach(() => {
      sinon.stub(connection, 'query').resolves(returnExpect);
    })

    afterEach(() => {
      connection.query.restore();
    })

    it('Test return array data from getProducts', async () => {
      const returnData = await salesModel.getAll();
      expect(returnData).to.be.an('array');
    })

    it('Test return array data don`t be empty', async () => {
      const returnData = await salesModel.getAll();
      expect(returnData).to.be.not.empty;
    })

    it('Test return array data with id, name and quantity', async () => {
      const [returnData] = await salesModel.getAll();
      expect(returnData).to.be.includes.all.keys('id', 'name', 'quantity');
    })
  });

  describe('Test return array with more than 2 data', () => {

    const returnExpect = [[
      {
        'saleId': 1,
        'date': '2021-09-09T04:54:29.000Z',
        'productId': 1,
        'quantity': 2
      },
      {
        'saleId': 1,
        'date': '2021-09-09T04:54:54.000Z',
        'productId': 2,
        'quantity': 2
      }
    ]];

    before(() => {
      sinon.stub(connection, 'query').resolves(returnExpect);
    });

    after(() => {
      connection.query.restore();
    });

    it('Test return array data from getProducts', async () => {
      const returnData = await salesModel.getAll();
      expect(returnData).to.be.an("array");
    });

    it('Test return array data don`t be empty', async () => {
      const returnData = await salesModel.getAll();
      expect(returnData).to.not.be.empty;
    });

    it('Test return array with more than 2 objects', async () => {
      const returnData = await salesModel.getAll();
      expect(returnData[0]).to.be.an("object");
      expect(returnData[1]).to.be.an("object");
    });

    it('Test return array data with saleId, date, productId and quantity', async () => {
      const returnData = await salesModel.getAll();
      expect(returnData[0]).to.be.includes.all.keys('saleId','date','productId','quantity');
      expect(returnData[1]).to.be.includes.all.keys('saleId','date','productId','quantity');
    });
  });

  describe('Test return with invalid Id', () => {
    const returnExpect = [];
    const INVALID_ID = 99999;

    beforeEach(() => {
      sinon.stub(productsModel, 'getId').resolves(returnExpect);
    })
    afterEach(() => {
      productsModel.getId.restore();
    })
    it('Test return error', async () => {
      try {
        await productsService.getId(INVALID_ID);
      } catch (error) {
        expect(error).to.be.a('object');
        expect(error).to.includes.all.keys('status', 'message');
      }
    });
  });
  describe('Test return with correct Id', () => {

    const CORRECT_ID = 1;
    const returnExpect = {
        "id": 1,
        "name": "produto A",
        "quantity": 10
      };

    beforeEach(() => {
      sinon.stub(productsModel, 'getId').resolves(returnExpect);
    })

    afterEach(() => {
      productsModel.getId.restore();
    })

    it('Test return array data with  id, name e quantity', async () => {
      const returnData = await productsService.getId(CORRECT_ID);
      expect(returnData).to.be.includes.all.keys('id','name','quantity');
    })
  });
});
