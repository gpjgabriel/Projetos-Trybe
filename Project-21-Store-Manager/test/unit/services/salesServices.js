const sinon = require('sinon');
const { expect } = require('chai');
const salesModel = require('../../../models/salesModel');
const salesService = require('../../../services/salesService');

describe('6-Test SALES SERVICE return all data from Database', () => {
  describe('Test return data from Database is empty', () => {

    const returnExpect = [];

    beforeEach(() => {
      sinon.stub(salesModel, 'getAll').resolves(returnExpect);
    })
    afterEach(() => {
      salesModel.getAll.restore();
    })
    it('Test return error', async ()=>{
      try {
        await salesService.getAll();
      } catch (error) {
        expect(error).to.be.a('object');
        expect(error).to.includes.all.keys('status', 'message');
      }
    });
  });
  describe('Test return data from Database', ()=>{

    const returnExpect = [
      {
        "saleId": 1,
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      }
    ];

    beforeEach(() => {
      sinon.stub(salesModel, 'getAll').resolves(returnExpect);
    })

    afterEach(() => {
      salesModel.getAll.restore();
    })

    it('Test return array data with saleId, date, productId e quantity', async () => {
      const [returnData] = await salesService.getAll();
      expect(returnData).to.be.includes.all.keys('saleId','date','productId','quantity');
    })
  }); 
});