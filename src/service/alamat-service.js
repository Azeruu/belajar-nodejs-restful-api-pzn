import { validate } from "../validation/validate.js";
import { getSiswaValidation } from "../validation/siswa-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { createAlamatValidation, getAlamatValidation, updateAlamatValidation } from "../validation/alamat-validation.js";

const checkSiswaExist = async (user, siswaId) => {
  siswaId = validate(getSiswaValidation, siswaId);

  const totalSiswaIndatabase = await prismaClient.siswa.count({
    where: {
      username: user.username,
      id: siswaId,
    },
  });

  if (totalSiswaIndatabase !== 1) {
    throw new ResponseError(404, "siswa tidak ditemukan");
  }
  return siswaId;
};

const create = async (user, siswaId, request) => {
    siswaId = await checkSiswaExist(user, siswaId);

  const alamat = validate(createAlamatValidation, request);
  alamat.siswa_id = siswaId;

  return prismaClient.alamat.create({
    data: alamat,
    select: {
      id: true,
      nama_jalan: true,
      no_rumah: true,
      desa: true,
      kecamatan: true,
    },
  });
};

const get = async(user, siswaId, alamatId) =>{
    siswaId = await checkSiswaExist(user, siswaId);
    alamatId = validate(getAlamatValidation, alamatId);

    const alamat = await prismaClient.alamat.findFirst({
        where:{
            siswa_id:siswaId,
            id: alamatId
        },
        select:{
            id:true,
            nama_jalan: true,
            no_rumah: true,
            desa: true,
            kecamatan: true
        }
    });

    if(!alamat) {
        throw new ResponseError(404, "alama tidak ditemukan");
    }
    return alamat;

}

const update = async(user, siswaId, request) =>{
    siswaId = await checkSiswaExist(user, siswaId);
    const alamat = validate(updateAlamatValidation, request);

    const totalAlamatIndatabase = await prismaClient.alamat.count({
        where:{
            siswa_id : siswaId,
            id:alamat.id
        }
    });

    if(totalAlamatIndatabase !== 1) {
        throw new ResponseError(404, "alamat tidak ditemukan");
    }
    return prismaClient.alamat.update({
        where:{
            id:alamat.id
        },
        data:{
            nama_jalan:alamat.nama_jalan,
            no_rumah:alamat.no_rumah,
            desa:alamat.desa,
            kecamatan:alamat.kecamatan,
        },
        select:{
            id:true,
            nama_jalan:true,
            no_rumah:true,
            desa:true,
            kecamatan:true
        }
    });

}
 const remove = async(user, siswaId, alamatId) => {
    siswaId = await checkSiswaExist(user, siswaId);
    alamatId = validate(getAlamatValidation, alamatId);

    const totalAlamatIndatabase = await prismaClient.alamat.count({
        where:{
            siswa_id : siswaId,
            id:alamatId
        }
    });

    if(totalAlamatIndatabase !== 1) {
        throw new ResponseError(404, "alamat tidak ditemukan");
    }
    return prismaClient.address. delete({
        where:{
            id: alamatId
        }
    });
 }
 const list = async (user, siswaId) =>{
    siswaId = await checkSiswaExist(user, siswaId);
    return prismaClient.alamat.findMany({
        where:{
            siswa_id:siswaId
        },
        select:{
            id:true,
            nama_jalan:true,
            no_rumah:true,
            desa:true,
            kecamatan:true
        }
    });
 }
export default {
  create,
  get, update, remove, list
};
