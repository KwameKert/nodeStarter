import HTTPStatus from 'http-status';


const errors = (app) => {
    app.use((err, req, res, next) => {
        ///console.log("got here error : ")
        res.status(err.status || HTTPStatus.INTERNAL_SERVER_ERROR)
            .send({...err});
    });
};

const status404 = (app) => {
    app.use((req, res) => {
        res.status(404)
            .json({msg: `Cannot ${req.method} to ${req.url}`});
    });
};


export {errors, status404};
