import { prismaClient } from "../src/application/database.js"
import bcrypt from "bcrypt"

export const removeTestUser = async () => {
    await prismaClient.user.deleteMany({
        where :{
            username:"test"
        }
    })
}
export const createTestUser = async () => {
    await prismaClient.user.create({
        data :{
            username:"test",
            password: await bcrypt.hash("rahasia", 10),
            email:"reza@gmail.com",
            token : "test"
        }
    })
}
export const getTestUser = async()=>{
    return prismaClient.user.findUnique({
        where:{
            username:"test"
        }
    });
}

export const removeAllTestSiswa = async()=>{
    return prismaClient.siswa.deleteMany({
        where:{
            username:"test"
        }
    });
}
export const createTestSiswa = async()=>{
    await prismaClient.siswa.create({
        data :{
            username:"test",
            NISN:'089089',
            Nama:'test',
            JK:'laki',
            NIK:"1140"
        }
    })
}
export const getTestSiswa = async()=>{
    return prismaClient.siswa.findFirst({
        where:{
            username: 'test'
        }
    })
}
export const createManyTestSiswa = async()=>{
    for(let i=0; i<15; i++){        
        await prismaClient.siswa.create({
            data :{
                username:"test",
                NISN:`089089${i}`,
                Nama:`test${i}`,
                JK:`laki${i}`,
                NIK:`1140${i}`
            }
        })
    }
}

export const removeAllTestAlamat = async() =>{
    await prismaClient.alamat.deleteMany({
        where:{
            siswa:{
                username: "test"
            }
        }
    });
}