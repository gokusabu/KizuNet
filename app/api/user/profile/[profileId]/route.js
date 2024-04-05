import User from "@lib/models/User"
import { connectToDB } from "@lib/mongodb/mongoose"

export const GET = async(req,{params}) =>{
    try{
        await connectToDB()
        const user = await User.findById(params.profileId).populate("posts likedPosts savedPosts followers following").exec()
        return new Response(JSON.stringify(user),{status:200})
    }catch(err){
        return new Response("Error fetching the user",{status:500})
    }
}