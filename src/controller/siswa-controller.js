import siswaService from "../service/siswa-service.js";

const create = async(req, res, next) =>{
    try {
        const user = req.user;
        const request = req.body;
        const result = await siswaService.create(user, request);
        res.status(200).json({
            data : result
        })
    } catch (e) {
        next(e);
    }
}
const get = async(req,res,next)=>{
    try {
        const user = req.user;
        const siswaId = req.params.siswaId;
        const result = await siswaService.get(user, siswaId);
        res.status(200).json({
            data:result
        })
    } catch (e) {
        next(e);
    }
}
const update = async(req,res,next)=>{
    try {
        const user = req.user;
        const siswaId = req.params.siswaId;
        const request = req.body;
        request.id = siswaId;

        const result = await siswaService.update(user, request);
        res.status(200).json({
            data:result
        })
    } catch (e) {
        next(e);
    }
}
const remove = async(req,res,next)=>{
    try {
        const user = req.user;
        const siswaId = req.params.siswaId;
        
        const result = await siswaService.remove(user, siswaId);
        res.status(200).json({
            data:result
        })
    } catch (e) {
        next(e);
    }
}
const search = async(req,res,next)=>{
    try {
        const user = req.user;
        const request = {
            Nama : req.params.Nama,
            NISN : req.params.NISN,
            NIK : req.params.NIK,
            page : req.params.page,
            size : req.params.size,
        };
        
        const result = await siswaService.search(user, request);
        res.status(200).json({
            data:result.data,
            paging:result.paging
        })
    } catch (e) {
        next(e);
    }
}

export default{
    create,
    get,
    update, remove, search
}