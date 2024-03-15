import User from "@lib/models/User";
import { connectToDB } from "@lib/mongodb/mongoose";

export const createOrUpdateUser = async(id,first_name,last_name,image_url,username,email_addresses)=>{

    try{
        await connectToDB()

        const user = await User.findOneAndUpdate(
            {clerkId:id},
            {
                $set:{
                    firstName:first_name,
                    lastName:last_name,
                    username:username,
                    email:email_addresses[0].email_adress,
                    profilePhoto:image_url
                }
            },
            {upsert:true,new:true} //if user does not exist then creates a new user
            
        )
        await user.save()
        return user
    }
    catch(error){
        console.log(error)
    }
}