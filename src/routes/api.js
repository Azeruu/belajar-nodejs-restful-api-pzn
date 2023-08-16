import express from "express";
import userController from "../controller/user-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import siswaController from "../controller/siswa-controller.js";
import alamatController from "../controller/alamat-controller.js";

const userRouter = new express.Router();
userRouter.use(authMiddleware);

// User API
userRouter.get('/api/users/current',userController.get);
userRouter.patch('/api/users/current',userController.update);
userRouter.delete('/api/users/logout',userController.logout);

// Siswa API
userRouter.post('/api/siswa', siswaController.create);
userRouter.get('/api/siswa/:siswaId', siswaController.get);
userRouter.put('/api/siswa/:siswaId', siswaController.update);
userRouter.delete('/api/siswa/:siswaId', siswaController.remove);
userRouter.get('/api/siswa', siswaController.search);

// Alamat API
userRouter.post('/api/siswa/:siswaId/alamat', alamatController.create);
userRouter.get('/api/siswa/:siswaId/alamat/:alamatId', alamatController.get);
userRouter.put('/api/siswa/:siswaId/alamat/:alamatId', alamatController.update);
userRouter.delete('/api/siswa/:siswaId/alamat/:alamatId', alamatController.remove);
userRouter.get('/api/siswa/:siswaId/alamat', alamatController.list);

export{
    userRouter
}