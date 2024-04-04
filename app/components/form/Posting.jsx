"use client"
import { AddPhotoAlternateOutlined } from "@mui/icons-material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import { useForm } from "react-hook-form";

const Posting = ({ post , apiEndpoint }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: post });

  const router = useRouter();
  const handlePublish = async (data) => {
    try {
      const postForm = new FormData();

      postForm.append("creatorId", data.creatorId);
      postForm.append("caption", data.caption);
      postForm.append("tag", data.tag);

      if (typeof data.postPhoto !== "string") {
        postForm.append("postPhoto", data.postPhoto[0]);
      } else {
        postForm.append("postPhoto", data.postPhoto);
      }

      const response = await fetch(apiEndpoint, {
        method: "POST",
        body: postForm,
      });

      if (response.ok) {
        router.push(`/profile/${data.creatorId}`);
      }
    } catch (err) {
      console.log("error uploading post", err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handlePublish)}
      className="flex flex-col gap-7 pb-24"
    >
      <label
        htmlFor="photo"
        className="flex gap-4 items-center text-light-1 cursor-pointer"
      >
        {watch("postPhoto") ? (
          typeof watch("postPhoto") === "string" ? (
            <Image
              src={watch("postPhoto")}
              alt="post"
              width={250}
              height={200}
              className="object-cover rounded-lg"
            />
          ) : (
            <Image
              src={URL.createObjectURL(watch("postPhoto")[0])}
              alt="post"
              width={250}
              height={200}
              className="object-cover rounded-lg"
            />
          )
        ) : (
          <AddPhotoAlternateOutlined
            sx={{ fontSize: "100px", color: "white" }}
          />
        )}

        <p>Upload a Photo</p>
      </label>
      <input
        {...register("postPhoto", {
          validate: (value) => {
            if (
              typeof vcalue === null ||
              (Array.isArray(value) && value.length === 0) ||
              value === "undefined"
            ) {
              return "A photo is required";
            }
            return true;
          },
        })}
        id="photo"
        type="file"
        style={{ display: "none" }}
      />
      {errors.postPhoto && (
        <p className="text-red-500">{errors.postPhoto.message}</p>
      )}

      <div>
        <label htmlFor="caption" className="text-light-1">
          Caption
        </label>
        <textarea
          {...register("caption", {
            required: "Caption is Required",
            validate: (value) => {
              if (value.length < 3) {
                return "Caption must contain more than 2 characters";
              }
            },
          })}
          type="text"
          rows={3}
          placeholder="What's on your Mind??"
          className="w-full input"
          id="caption"
        ></textarea>
        {errors.caption && (
          <p className="text-red-500">{errors.caption.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="tag" className="text-light-1">
          tag
        </label>
        <input
          {...register("tag", {
            required: "tag is Required",
          })}
          type="text"
          placeholder="#tag"
          className="w-full input"
          id="tag"
        ></input>
        {errors.tag && <p className="text-red-500">{errors.tag.message}</p>}
      </div>

      <button
        type="submit"
        className="py-2.5 rounded-lg mt-10 bg-purple-1 hover:bg-pink-1 text-light-1"
      >
        Post
      </button>
    </form>
  );
};

export default Posting;
