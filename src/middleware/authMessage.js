import {Users} from '../db/models';

export const apiAuthentication = async (req, res, next) => {
    try {

        const token = req.header("Authorization").replace('Bearer ', '');

        const user = await Users.findOne({where: {apiKey: token}})

        if (user) {
            req.user = user
            // req.token = token
        } else {
            throw new Error();
        }

    } catch (e) {
        console.error(e)

        return res.status(401).send("{error: 'Please authenticate ' }")
    }
    next()
}
