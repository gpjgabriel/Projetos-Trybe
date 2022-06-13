const sinon = require('sinon');
const { expect } = require('chai');
const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');

describe('5-Test PRODUCT SERVICE return all data from Database', () => {
  describe('Test return data from Database is empty', () => {

    const returnExpect = [];

    beforeEach(() => {
      sinon.stub(productsModel, 'getAll').resolves(returnExpect);
    })

    afterEach(() => {
      productsModel.getAll.restore();
    })

    it('Test return error', async () => {
      try {
        await productsService.getAll();
      } catch (error) {
        expect(error).to.be.a('object');
        expect(error).to.includes.all.keys('status', 'message');
      }
    });
  });

  describe('Test return data from Database', () => {

    const returnExpect = [
      {
        "id": 1,
        "name": "produto A",
        "quantity": 10
      }
    ];

    beforeEach(() => {
      sinon.stub(productsModel, 'getAll').resolves(returnExpect);
    })

    afterEach(() => {
      productsModel.getAll.restore();
    })

    it('Test return array data with  id, name e quantity', async()=>{
      const [returnData] = await productsService.getAll();
      expect(returnData).to.be.includes.all.keys('id','name','quantity');
    })
  });
});