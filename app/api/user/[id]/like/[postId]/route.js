import Post from "@lib/models/Post"
import User from "@lib/models/User"
import { connectToDB } from "@lib/mongodb/mongoose"

export const POST = async(req ,{ params }) =>{
    try{

        await connectToDB()

        const userId = params.id
        const postId = params.postId

        const user = await User.findOne({clerkId : userId}).populate('posts likedPosts savedPosts followers following')
        const post = await Post.findById(postId).populate('creator likes')

        const isliked = user.likedPosts.find((item)=>item._id.toString() === postId)

        if(isliked)
        {
            user.likedPosts = user.likedPosts.filter((item)=>item._id.toString() !== postId)
            post.likes = post.likes.filter((item)=>item._id.toString() !== user._id.toString())
        }else{
            user.likedPosts.push(post)
            post.likes.push(user)
        }

        await user.save()
        await post.save()

        return new Response(JSON.stringify(user),{status:200})

    }catch(err){
        console.log(err)
        return new Response("error liking post",{status:500})
    }
}