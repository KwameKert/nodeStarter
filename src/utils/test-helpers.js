import {Users} from '../db/models';


export function buildReq({...overides} = {}){
    const req = { body: {}, params: {}, ...overides };
    return req;
}
  
export  function buildNext(impl) {
    return jest.fn(impl).mockName('next')
  }
  
export function returnExpectations(response, statusCode){
  
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.status).toHaveBeenCalledWith(statusCode)
  }

 export  function buildRes(overrides = {}) {
    const res = {
      send: jest.fn(() => res).mockName('send'),
      status: jest.fn(() => res).mockName('status'),
      ...overrides,
    }
    return res
    }

export async function createNewUser(){
    const user =   await Users.create({
        username: 'kwamekert',
        password: 'password',
        email: 'kwamekert@gmail.com',
        apiKey: '121dsf2dfsdf23234fsdf2'
      });

     // console.log("new user is here : ", user);
}  


export const clearUsers = async () => {
  await Users.destroy({ where: {} });
};
