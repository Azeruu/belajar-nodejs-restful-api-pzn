import Joi from "joi";

const createAlamatValidation = Joi.object({
    nama_jalan: Joi.string().max(100).required(),
    no_rumah: Joi.string().max(100).optional(),
    desa: Joi.string().max(100).required(),
    kecamatan: Joi.string().max(100).required()
});
const updateAlamatValidation = Joi.object({
    id:Joi.number().min(1).positive().required(),
    nama_jalan: Joi.string().max(100).required(),
    no_rumah: Joi.string().max(100).optional(),
    desa: Joi.string().max(100).required(),
    kecamatan: Joi.string().max(100).required()
});

const getAlamatValidation = Joi.number().min(1).positive().required();

export{
    createAlamatValidation,
    getAlamatValidation,
    updateAlamatValidation
}