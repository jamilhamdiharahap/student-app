import instance from "../plugins/axios";

export async function login(payload){
    try{
        const {data} = await instance.post("/user/login", payload);
        return data;
    }catch(err){
        return err;
    }
}