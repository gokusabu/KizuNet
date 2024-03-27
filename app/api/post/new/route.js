import Post from "@lib/models/Post"
import { connectToDB } from "@lib/mongodb/mongoose"

export const POST = async(req)=>{
    try{
        await connectToDB()
        const data =await req.formData()

        const newPost = await Post.create({
            creator:data.get("creatorId"),
            caption:data.get("caption"),
            tag:data.get('tag'),
            postPhoto:data.get("postPhoto")
        })
    }catch(err){}
}