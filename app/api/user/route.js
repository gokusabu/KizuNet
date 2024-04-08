import User from "@lib/models/User"
import { connectToDB } from "@lib/mongodb/mongoose"

export const GET = async(req)=>{
    try{
        await connectToDB()

        const allUsers = await User.find({}).populate("posts likedPosts savedPosts followers following").exec()

        return new Response(JSON.stringify(allUsers), { status : 200})
    }catch(err){
        console.log(err)
        return new Response("error getting users", { status : 500})
    }
}