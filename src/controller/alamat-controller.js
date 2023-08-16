import alamatService from "../service/alamat-service.js";

const create = async(req, res, next) => {
    try {
        const user = req.user;
        const request = req.body;
        const siswaId = req.params.siswaId;

        const result = await alamatService.create(user, siswaId, request);

        res.status(200).json({
            data:result
        });
    } catch (e) {
        next(e);
    }
}
const get = async(req, res, next) => {
    try {
        const user = req.user;
        const siswaId = req.params.siswaId;
        const alamatId = req.params.alamatId;

        const result = await alamatService.create(user, siswaId, alamatId);

        res.status(200).json({
            data:result
        });
    } catch (e) {
        next(e);
    }
}
const update = async(req, res, next) => {
    try {
        const user = req.user;
        const request = req.body;
        const siswaId = req.params.siswaId;
        const alamatId = req.params.alamatId;
        request.id = alamatId;

        const result = await alamatService.update(user, siswaId, request);

        res.status(200).json({
            data:result
        });
    } catch (e) {
        next(e);
    }
}
const remove = async(req, res, next) => {
    try {
        const user = req.user;
        const siswaId = req.params.siswaId;
        const alamatId = req.params.alamatId;

        const result = await alamatService.remove(user, siswaId, alamatId);

        res.status(200).json({
            data:"OK"
        });
    } catch (e) {
        next(e);
    }
}
const list = async(req, res, next) => {
    try {
        const user = req.user;
        const siswaId = req.params.siswaId;

        const result = await alamatService.list(user, siswaId);

        res.status(200).json({
            data:result
        });
    } catch (e) {
        next(e);
    }
}

export default{
    create,
    get, update, remove, list
}