import { AddPhotoAlternateOutlined } from '@mui/icons-material'
import Image from 'next/image'
import { useForm } from 'react-hook-form'

const Posting = ({post,handlePublish}) => {
  const {register,handleSubmit,watch,formState:{ errors }} = useForm({defaultValues:posts})
  return (
    <form className='flex flex-col gap-7 pb-24'>

      <label htmlFor='photo' className='flex gap-4 items-center text-light-1 cursor-pointer'>
        {watch('postPhoto')?(
          typeof(watch('postPhoto')) === 'string' ?(
            <Image src={watch("postPhoto")} alt="post" width={250} height={200} className="object-cover rounded-lg"/>
          ):(
            <Image src={URL.createObjectURL(watch("postPhoto"))} alt="post" width={250} height={200} className="object-cover rounded-lg"/>
          )
        ):(
          <AddPhotoAlternateOutlined sx={{fontSize:"100px",color:"white"}}/>
        )}
        
        <p>Upload a Photo</p>
      </label>
      <input {...register("postPhoto",{
        validate:(value)=>{
          if(typeof(vcalue) === null || (Array.isArray(value) && value.length === 0) || value === "undefined")
          {
            return "A photo is required"
          }
          return true
        },
      })}
       id='photo'
       type='file'
       style={{display:'none'}}
       />


    </form>
  )
}

export default Posting