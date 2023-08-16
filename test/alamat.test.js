import supertest from "supertest";
import {
  createTestUser,
  removeTestUser,
  removeAllTestSiswa,
  createTestSiswa,
  removeAllTestAlamat,
  getTestSiswa,
} from "./test-util.js";
import { web } from "../src/application/web.js";

describe("POST /api/siswa/:siswaId/alamat", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestSiswa();
  });
  afterEach(async () => {
    await removeAllTestAlamat();
    await removeAllTestSiswa();
    await removeTestUser();
  });

  it("should create new address", async () => {
    const testSiswa = await getTestSiswa();
    const result = await supertest(web)
      .post("/api/siswa/" + testSiswa.id + "/alamat")
      .set("Authorization", "test")
      .send({
        nama_jalan: "jalan test",
        no_rumah: "15",
        desa: "desa test",
        kecamatan: "kecamatan test",
      });
      
    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.nama_jalan).toBe("jalan test");
    expect(result.body.data.no_rumah).toBe("15");
    expect(result.body.data.desa).toBe("desa test");
    expect(result.body.data.kecamatan).toBe("kecamatan test");
  });
});
