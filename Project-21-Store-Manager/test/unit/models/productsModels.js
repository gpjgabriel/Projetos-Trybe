const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');

describe('3-Test PRODUCTS MODELS return data from Database', () => {

  describe('Test getAll return data from Database is empty array', ()=>{

    const returnExpect = [[]];

    beforeEach(() => {
      sinon.stub(connection, 'query').resolves(returnExpect);
    })

    afterEach(() => {
      connection.query.restore();
    })

    it('Test return array from DB', async () => {
      const arrReturn = await productsModel.getAll();
      expect(arrReturn).to.be.an('array');
    });

    it('Test return empty array from DB', async () => {
      const arrReturn = await productsModel.getAll();
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
      const returnData = await productsModel.getAll();
      expect(returnData).to.be.an('array');
    })

    it('Test return array data don`t be empty', async () => {
      const returnData = await productsModel.getAll();
      expect(returnData).to.be.not.empty;
    })

    it('Test return array data with id, name and quantity', async () => {
      const [returnData] = await productsModel.getAll();
      expect(returnData).to.be.includes.all.keys('id', 'name', 'quantity');
    })
  });

  describe('Test return array with more than 2 data', () => {

    const returnExpect = [[
      {
        id: 1,
        name: 'Martelo de Thor',
        quantity: 10,
      },
      {
        id: 2,
        name: 'Traje de encolhimento',
        quantity: 20,
      },
    ]];

    before(() => {
      sinon.stub(connection, 'query').resolves(returnExpect);
    });

    after(() => {
      connection.query.restore();
    });

    it('Test return array data from getProducts', async () => {
      const returnData = await productsModel.getAll();
      expect(returnData).to.be.an('array');
    });

    it('Test return array data don`t be empty', async () => {
      const returnData = await productsModel.getAll();
      expect(returnData).to.not.be.empty;
    });

    it('Test return array with more than 2 objects', async () => {
      const returnData = await productsModel.getAll();
      expect(returnData[0]).to.be.an('object');
      expect(returnData[1]).to.be.an('object');
    });

    it('Test return array data with id, name and quantity', async () => {
      const returnData = await productsModel.getAll();
      expect(returnData[0]).to.be.includes.all.keys('id', 'name', 'quantity');
      expect(returnData[1]).to.be.includes.all.keys('id', 'name', 'quantity');
    });
  });

  describe('Test return with invalid Id', ()=>{

    const returnExpect = [[]];
    const INVALID_ID = 99999;

    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves(returnExpect)
    })

    afterEach(() => {
      connection.execute.restore();
    })

    it('Test return array data from getId Products', async()=>{
      const returnData = await productsModel.getId(INVALID_ID);
      expect(returnData).to.be.an('array');
    });

    it('Test return array data to be empty', async()=>{
      const returnData = await productsModel.getId(INVALID_ID);
      expect(returnData).to.be.empty;
    });
  }); 

  describe('Test return with correct Id', ()=>{

    const CORRECT_ID = 1;

    const returnExpect = [[
      {
        "id": 1,
        "name": "produto A",
        "quantity": 10
      }
    ]];

    beforeEach(async () => {
      sinon.stub(connection, 'execute').resolves(returnExpect)
    })

    afterEach(async () => {
      connection.execute.restore();
    })

    it('Test return array data from getId Products', async()=>{
      const returnData = await productsModel.getId(CORRECT_ID);
      expect(returnData).to.be.an('array');
    });

    it('Test return array data dont be empty', async()=>{
      const returnData = await productsModel.getId(CORRECT_ID);
      expect(returnData).to.be.not.empty;
    });

    it('Test return array data with id, name and quantity', async()=>{
      const [returnData] = await productsModel.getId(CORRECT_ID);
      expect(returnData).to.be.includes.all.keys('id','name','quantity');
    })
  }); 
});
