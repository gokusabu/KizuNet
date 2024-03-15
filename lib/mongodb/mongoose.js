import mongoose from "mongoose"

let isConnected = false

export const connectToDB = async()=>{
    mongoose.set('strictQuery',true)

    if(isConnected)
    {
        console.log('database is Already Connected!!')
        return
    }

    try{
        await mongoose.connect(process.env.MONGODB_URL,{
            dbName:'KizuNet',
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        isConnected = true
        console.log('mongoDB connected!!')
    }
    catch(error){
        console.log(error)
    }
}