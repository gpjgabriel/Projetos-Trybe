const sinon = require('sinon');
const { expect } = require('chai');
const productsService = require('../../../services/productsService');
const productsController = require('../../../controllers/productsController');

describe('1-Test PRODUCTS CONTROLLERS return data from Database', () => {
  describe('Test getAll return data from Database is empty', () => {
    const request = {}
    const response = {}
    const nextSpy = sinon.spy()
    const erro = { status:404, message:'Products not found'}

    beforeEach(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsService, 'getAll').throws(erro);
    })

    afterEach(() => {
      productsService.getAll.restore();
    })

    it('Test return with error from empty data', async () => {
      await productsController.getAll(request, response, nextSpy);
      expect(nextSpy.calledWith(erro)).to.be.equal(true);
    })
  })

  describe('Test getAll return data from Database', () => {
    const response = {};
    const request = {};

    const returnExpect = [
      {
        "id": 1,
        "name": "produto A",
        "quantity": 10
      }
    ];

    beforeEach(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsService, 'getAll').resolves(returnExpect);
    })

    afterEach(() => {
      productsService.getAll.restore();
    });

    it('Test return request with response status 200', async () => {
      await productsController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('Test return response with json array data', async () => {
      await productsController.getAll(request, response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });

  describe('Test GetId return with INVALID ID', () => {
    const request = {}
    const response = {}
    const nextSpy = sinon.spy()
    const erro = { status:404, message:'Product not found'}

    beforeEach(() => {
      request.params = {
        id: 99999
      }
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsService, 'getId').throws(erro);
    })

    afterEach(() => {
      productsService.getId.restore();
    })

    it('Test return with error from Incorrect Id', async () => {
      await productsController.getId(request, response, nextSpy);
      expect(nextSpy.calledWith(erro)).to.be.equal(true);
    })

  })
  describe('Test return with correct Id', () => {
    const request = {};
    const response = {};
    const nextSpy = sinon.spy()

    const returnExpect = {
        "id": 1,
        "name": "produto A",
        "quantity": 10
      };

    beforeEach(() => {
      request.params = { id: 1 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsService, 'getId').resolves(returnExpect);
    })

    afterEach(() => {
      productsService.getId.restore();
    });

    it('Test return request with response status 200', async () => {
      await productsController.getId(request, response, nextSpy);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('Test return response with json array data', async () => {
      await productsController.getId(request, response, nextSpy);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });
});