import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  createSiswaValidation,
  getSiswaValidation,
  searchSiswaValidation,
  updateSiswaValidation,
} from "../validation/siswa-validation.js";
import { validate } from "../validation/validate.js";


const create = async (user, request) => {
  const siswa = validate(createSiswaValidation, request);
  siswa.username = user.username;

  return prismaClient.siswa.create({
    data: siswa,
    select: {
      id: true,
      NISN: true,
      Nama: true,
      JK: true,
      NIK: true,
    },
  });
};

const get = async (user, siswaId) => {
  siswaId = validate(getSiswaValidation, siswaId);
  const siswa = await prismaClient.siswa.findFirst({
    where: {
      username: user.username,
      id: siswaId,
    },
    select: {
      NISN: true,
      Nama: true,
      JK: true,
      NIK: true,
    },
  });
  if (!siswa) {
    throw new ResponseError(404, "siswa tidak ditemukan");
  }
  return siswa;
};

const update = async (user, request) => {
  const siswa = validate(updateSiswaValidation, request);

  const totalSiswaInDatabase = await prismaClient.siswa.count({
    where: {
      username: user.username,
      id: siswa.id,
    },
  });
  if (totalSiswaInDatabase !== 1) {
    throw new ResponseError(404, " Siswa tidak Ditemukan");
  }
  return prismaClient.siswa.update({
    where: {
      id: siswa.id,
    },
    data: {
      NISN: siswa.NISN,
      Nama: siswa.Nama,
      Jk: siswa.JK,
      NIK: siswa.NIK,
    },
    select: {
      id: true,
      NISN: true,
      Nama: true,
      JK: true,
      NIK: true,
    },
  });
};

const remove = async (user, siswaId) => {
  siswaId = validate(getSiswaValidation, siswaId);

  const totalSiswaInDatabase = await prismaClient.siswa.count({
    where: {
      username: user.username,
      id: siswaId,
    },
  });
  if (totalSiswaInDatabase !== 1) {
    throw new ResponseError(404, " Siswa tidak Ditemukan");
  }
  return prismaClient.siswa.update({
    where: {
      id: siswaId,
    },
  });
};

const search = async (user, request) => {
    request = validate(searchSiswaValidation, request);

    const skip = (request.page - 1) * request.size;
    const filters = [];
    filters.push({
        username: user.username
    })
    
    if (request.Nama){
        filters.push({
            Nama:{
                contains:request.Nama
            }
        });
    }
    if (request.NISN){
        filters.push({
            NISN:{
                contains:request.NISN
            }
        });
    }
    const siswa = await prismaClient.siswa.findMany({
        where : {
            AND:filters
        },
        take: request.size,
        skip:skip
    });
    const totalItems = await prismaClient.siswa.count({
        where:{
            AND:filters
        }
    });
    return{
        data: siswa,
        paging:{
            page:request.page,
            total_item:totalItems,
            total_page: Math.ceil(totalItems/request.size)
        }
    }
};
export default {
  create,
  get,
  update,
  remove,
  search,
};
