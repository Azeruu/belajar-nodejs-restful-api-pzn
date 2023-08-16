import { prismaClient } from "../application/database.js"
import { getUserValidation, loginUserValidation, registerUserValidation, updateUserValidation } from "../validation/user-validation.js"
import { validate } from "../validation/validate.js"
import { ResponseError } from "../error/response-error.js"
import bcrypt from "bcrypt"
import { v4 as uuid} from "uuid"

const register = async(request) => {
    const user = validate(registerUserValidation, request);

    const constUser = await prismaClient.user.count({
        where: {
            username : user.username
        }
    });

    if(constUser === 1){
        throw new ResponseError(400,"Username Sudah ada");
    }
    user.password = await bcrypt.hash(user.password,10);

    return prismaClient.user.create({
        data : user,
        select : {
            username : true,
            email:true
        }
    });
}

const login = async(request) => {
    const loginRequest = validate(loginUserValidation, request);

    const user = await prismaClient.user.findUnique({
        where : {
            username:loginRequest.username
        },
        select:{
            username:true,
            password:true
        }
    });

    if(!user){
        throw new ResponseError(401, " username Wrong");
    }
    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
    if(!isPasswordValid){
        throw new ResponseError(401, " Password Wrong");
    }

    const token = uuid().toString()
    return prismaClient.user.update({
        data :{
            token:token
        },
        where:{
            username : user.username
        },
        select:{
            token:true
        }
    });
}

const get = async(username) => {
    username = validate(getUserValidation, username);

    const user = await prismaClient.user.findUnique({
        where:{
            username:username
        },
        select:{
            username:true,
            email:true
        }
    });
    if(!user){
        throw new ResponseError(404, "user Is not found");
    }
    return user;
}

const update = async(request) => {
    const user = validate(updateUserValidation, request);

    const totalUserInDatabase = await prismaClient.user.count({
        where: {
            username : user.username
        }
    });

    if(totalUserInDatabase !== 1){
        throw new ResponseError(400,"Username tidak ditemukan");
    }
    const data = {};
    if(user.email){
        data.email = user.email;
    }
    if(user.username){
        data.username = user.username;
    }
    if(user.password){
        data.password = await bcrypt.hash(user.password, 10);
    }

    return prismaClient.user.update({
        where:{
            username : user.username
        },
        data:data,
        select:{
            username:true,
            email:true
        }
    });

}

const logout = async(username) => {
    username = validate(getUserValidation, username);

    const user = await prismaClient.user.findUnique({
        where:{
            username:username
        }
    });

    if(!user){
        throw new ResponseError(404, "user Is not found");
    }

    return prismaClient.user.update({
        where:{
            username:username
        },
        data : {
            token:null
        },
        select:{
            username:true
        }
    });
}

export default{
    register,
    login,
    get,
    update,
    logout
}