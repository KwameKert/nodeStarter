import * as CheckBalance from './checkBalance';
import HTTPStatus from 'http-status';


describe('Check Configuration balance  ', () => {
    test('should return credit and amount', async () => {
        await CheckBalance.checkBalance();
     //  returnExpectations(res, HTTPStatus.CREATED);
     
      });


});