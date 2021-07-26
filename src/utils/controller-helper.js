

export const responseApi = (res, status, data, message) => {
    return res.status(status).send({ data, message });
  };