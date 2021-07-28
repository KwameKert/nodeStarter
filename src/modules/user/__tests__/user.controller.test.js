import * as UserController from "../user.controller";
import * as AuthController from "../../auth/auth.controller";
import {Users, Configuration} from "../../../db/models";
import HTTPStatus from "http-status";
import {
    buildNext,
    buildReq,
    buildRes,
    createNewUser,
    returnExpectations,
} from "../../../utils/test-helpers";

var configuration = null;

beforeEach(async () => {
    jest.resetAllMocks();
    await Users.destroy({where: {}});
    //  configuration = await Configuration.create( {name: 'SMS GLOBAL',  user: 'kwamekert', password: 'password', apiKey: '23asdf23423', stat: 'active'});
});

async function clearUsers() {
    await Users.destroy({where: {}});
    // await Configuration.destroy({ where: {} });
}

describe("Fetch All Users", () => {
    test("should return 200", async () => {
        let req1 = buildReq({
            body: {
                email: "kwames@gmail.com",
                username: "kwamekert",
                password: "password",
            },
        });
        let req2 = buildReq({
            body: {
                email: "kwame@gmail.com",
                username: "kwameker",
                password: "password",
            },
        });
        let res1 = buildRes();
        let nxtFxn = buildNext();
        // await AuthController.register(req1, res1, nxtFxn);
        // await AuthController.register(req2, res1, nxtFxn);

        // let req = buildReq();
        // let res = buildRes();
        // await UserController.gellAllUsers(req, res, nxtFxn);
        // returnExpectations(res, HTTPStatus.OK);
    });
});
