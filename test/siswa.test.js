import supertest from "supertest";
import { createTestUser,removeTestUser, removeAllTestSiswa, createTestSiswa, getTestSiswa, createManyTestSiswa } from "./test-util.js";
import { web } from "../src/application/web.js";

describe('POST /api/siswa', function(){
    beforeEach(async()=>{
        await createTestUser();
    })
    afterEach(async()=>{
        await removeAllTestSiswa();
        await removeTestUser();
    })

    it('should can create new contact', async()=>{
        const result = await supertest(web)
        .post("/api/siswa")
        .set('Authorization', 'test')
        .send({
            NISN : '089089',
            Nama : 'budii',
            JK : 'laki',
            NIK : '1140'
        });

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.NISN).toBe('089089');
        expect(result.body.data.Nama).toBe('budii');
        expect(result.body.data.JK).toBe('laki');
        expect(result.body.data.NIK).toBe('1140');
    });
    it('should reject if request not valid', async()=>{
        const result = await supertest(web)
        .post("/api/siswa")
        .set('Authorization', 'test')
        .send({
            NISN : '',
            Nama : 'test',
            JK : 'lakiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii',
            NIK : '1140'
        });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });
});

describe('GET /api/siswa/:siswaId', function(){
    beforeEach(async()=>{
        await createTestUser();
        await createTestSiswa();
    })
    afterEach(async()=>{
        await removeAllTestSiswa();
        await removeTestUser();
    })

    it('should can get siswa', async()=>{
        const testSiswa = await getTestSiswa();
        const result = await supertest(web)
        .get("/api/siswa/" + testSiswa.id)
        .set("Authorization","test");

        expect(result.status).toBe(200);
        // expect(result.body.data.id).toBe(testSiswa.id);
        expect(result.body.data.NISN).toBe(testSiswa.NISN);
        expect(result.body.data.Nama).toBe(testSiswa.Nama);
        expect(result.body.data.JK).toBe(testSiswa.JK);
        expect(result.body.data.NIK).toBe(testSiswa.NIK);
    })
    it('should return 404 if ID notfound', async()=>{
        const testSiswa = await getTestSiswa();
        const result = await supertest(web)
        .get("/api/siswa/" + testSiswa.id + 1)
        .set("Authorization","test");

        expect(result.status).toBe(404);
    })
});

describe('PUT /api/siswa/:siswaId', function(){
    beforeEach(async()=>{
        await createTestUser();
        await createTestSiswa();
    })
    afterEach(async()=>{
        await removeAllTestSiswa();
        await removeTestUser();
    })

    it('should can update existing siswa', async()=>{
        const testSiswa = await getTestSiswa();
        const result = await supertest(web)
        .put("/api/siswa/" + testSiswa.id)
        .set("Authorization","test")
        .send({
            NISN :"0838",
            Nama :'BULE',
            JK :"cewe",
            NIK :"1910"
        });

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(testSiswa.id);
        expect(result.body.data.NISN).toBe("0838");
        expect(result.body.data.Nama).toBe("BULE");
        expect(result.body.data.JK).toBe("laki");
        expect(result.body.data.NIK).toBe("1910");
    })
    it('should return 404 if ID notfound', async()=>{
        const testSiswa = await getTestSiswa();
        
        const result = await supertest(web)
        .put("/api/siswa/" + testSiswa.id)
        .set("Authorization","test")
        .send({
            NISN : "0838",
            Nama :'BULE',
            JK : "",
            NIK : "1910"
        });
        expect(result.status).toBe(400);
    })
});

describe('DELETE /api/siswa/:siswaId', function(){
    beforeEach(async()=>{
        await createTestUser();
        await createTestSiswa();
    })
    afterEach(async()=>{
        await removeAllTestSiswa();
        await removeTestUser();
    })

    it('should can delete siswa', async()=>{
        let testSiswa = await getTestSiswa();
        const result = await supertest(web)
        .delete("/api/siswa/" + testSiswa.id)
        .set("Authorization","test");

        // expect(result.status).toBe(200);
        expect(result.body.data).toBe("ok");

        testSiswa = await getTestSiswa();
        expect(testSiswa).toBeNull();
    })
    // it('should return 404 if ID notfound', async()=>{
    //     const testSiswa = await getTestSiswa();
        
    //     const result = await supertest(web)
    //     .put("/api/siswa/" + testSiswa.id)
    //     .set("Authorization","test")
    //     .send({
    //         NISN : "0838",
    //         Nama :'BULE',
    //         JK : "",
    //         NIK : "1910"
    //     });
    //     expect(result.status).toBe(400);
    // })
});

describe('GET /api/siswa', function(){
    beforeEach(async()=>{
        await createTestUser();
        await createManyTestSiswa();
    })
    afterEach(async()=>{
        await removeAllTestSiswa();
        await removeTestUser();
    })

    it('should can get siswa wihout param', async()=>{
        const result = await supertest(web)
        .get("/api/siswa")
        .set("Authorization","test");

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(10);
        expect(result.body.paging.page).toBe(1);
        expect(result.body.paging.total_page).toBe(2);
        expect(result.body.paging.total_item).toBe(15);
    })
    // it('should return 404 if ID notfound', async()=>{
    //     const testSiswa = await getTestSiswa();
    //     const result = await supertest(web)
    //     .get("/api/siswa/" + testSiswa.id + 1)
    //     .set("Authorization","test");

    //     expect(result.status).toBe(404);
    // })
});