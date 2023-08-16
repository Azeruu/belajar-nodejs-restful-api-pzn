import Joi from "joi";

const createSiswaValidation = Joi.object({
  NISN: Joi.string().max(100).required(),
  Nama: Joi.string().max(100).required(),
  JK: Joi.string().max(20).required(),
  NIK: Joi.string().max(50).required(),
});

const getSiswaValidation = Joi.number().positive().required();

const updateSiswaValidation = Joi.object({
  id: Joi.number().positive().required(),
  NISN: Joi.string().max(100).required(),
  Nama: Joi.string().max(100).required(),
  JK: Joi.string().max(20).required(),
  NIK: Joi.string().max(50).required(),
});
const searchSiswaValidation = Joi.object({
  page: Joi.number().min(1).positive().default(1),
  size: Joi.number().min(1).positive().max(100).default(10),
  Nama: Joi.string().optional(),
  NISN: Joi.string().optional(),
});
export { createSiswaValidation, getSiswaValidation, updateSiswaValidation, searchSiswaValidation };
