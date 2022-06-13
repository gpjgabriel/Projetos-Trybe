const sinon = require('sinon');
const { expect } = require('chai');

const salesService = require('../../../services/salesService');
const salesController = require('../../../controllers/salesController');

describe('2-Test SALES CONTROLLERS return data from Database', () => {
  describe('Test return with INVALID ID', ()=>{
    const request = {}
    const response = {}
    const nextSpy = sinon.spy()
    const erro = { status:404, message:'Sale not found'}

    beforeEach(() => {
      request.params = {
        id: 99999
      };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesService, 'getId').throws(erro);
    })

    afterEach(() => {
      salesService.getId.restore();
    })

    it('Test return with error from incorrect Id', async()=>{
      await salesController.getId(request, response, nextSpy);
      expect(nextSpy.calledWith(erro)).to.be.equal(true);
    })
  })
  describe('Test return with correct Id', () => {
    const response = {};
    const request = {};

    const returnExpect = [{
      "date": "2021-09-09T04:54:29.000Z",
      "productId": 1,
      "quantity": 2
    },
    {
      "date": "2021-09-09T04:54:54.000Z",
      "productId": 2,
      "quantity": 2
    }];

    beforeEach(() => {
      request.params = {
        id: 1
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesService, 'getId').resolves(returnExpect);
    })

    afterEach(() => {
      salesService.getId.restore();
    });

    it('Test return request with response status 200', async () => {
      await salesController.getId(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('Test return response with json array data', async () => {
      await salesController.getId(request, response);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });

  });
});