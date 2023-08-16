import supertest from "supertest"
import { web } from "../src/application/web.js"
import { logger } from "../src/application/logging.js";
import { createTestUser, removeTestUser } from "./test-util.js";

describe('POST /api/users', function(){
    
    beforeEach(async() =>{
        await createTestUser();
    });
    afterEach(async() =>{
        await removeTestUser();
    });

    it('should can register new user', async() =>{

        const result = await supertest(web)
        .post('/api/users')
        .set('Authorization',"test")
        .send({
            username:'test',
            email : "reza@gmail.com",
            password : "rahasia"
        });

        logger.info(result.body);
        
        expect(result.status).toBe(200);
        expect(result.body.username).toBe('test');
        expect(result.body.email).toBe("reza@gmail.com");
        expect(result.body.password).toBeUndefined();
    });
    
    it('should reject if req invalid', async() =>{

        const result = await supertest(web)
        .post('/api/users')
        .set('Authorization',"test")
        .send({
            username:'',
            email : "",
            password : ""
        });

        logger.info(result.body);
        
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });
});