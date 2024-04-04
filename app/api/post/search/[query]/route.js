import Post from "@lib/models/Post";
import { connectToDB } from "@lib/mongodb/mongoose";

export const GET = async (req, { params }) => {
  const { query } = params;

  try {
    await connectToDB();

    const searchPosts = await Post.find({
      $or: [
        { caption: { $regex: query, $options: "i" } },
        { tag: { $regex: query, $options: "i" } },
      ],
    })
      .populate("creator likes")
      .exec();

    return new Response(JSON.stringify(searchPosts), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("error fetching search results", { status: 500 });
  }
};
