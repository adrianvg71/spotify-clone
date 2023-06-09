"use client"

import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import uniqid from "uniqid";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";



const UploadModal = () => {
  const uploadModal = useUploadModal();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser()
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: '',
      title: '',
      song: null,
      image: null,
    }
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if(!imageFile || !songFile || !user) {
        toast.error("Falta informacion")
        return;
      }

      const uniqueID = uniqid()

      // Upload song
      const { 
        data: songData,
        error: songError,
      } = await supabaseClient.storage.from('songs').upload(`song-${values.title}-${uniqueID}`, songFile, {
        cacheControl: '3600',
        upsert: false
      })

      if(songError) {
        setIsLoading(false);
        return toast.error("Error al subir una cancion");
      }

      //Upload image

      const { 
        data: imageData,
        error: imageError,
      } = await supabaseClient.storage.from('images').upload(`image-${values.title}-${uniqueID}`, imageFile, {
        cacheControl: '3600',
        upsert: false
      })

      if(imageError) {
        setIsLoading(false);
        return toast.error("Error al subir una imagen")
      }

      const {
        error: supabaseError
      } = await supabaseClient.from("songs").insert({
        user_id: user.id,
        title: values.title,
        author: values.author,
        image_path: imageData.path,
        song_path: songData.path
      })

      if(supabaseError) {
        setIsLoading(false)
        return toast.error(supabaseError.message)
      }

      router.refresh();
      setIsLoading(false);
      toast.success("Cancion añadida")
      reset();
      uploadModal.onClose();
    } catch(error) {
      toast.error("Algo ha salido mal")
    } finally {
      setIsLoading(false)
    }
  }

  return ( 
    <Modal
      title="Añade una cancion"
      description="Añade un archivo mp3"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4"
      >
        <Input 
          id="title"
          disabled={isLoading}
          {...register('title', { required: true })}
          placeholder="Titulo de la canción"
        />
        <Input 
          id="author"
          disabled={isLoading}
          {...register('author', { required: true })}
          placeholder="Autor de la cancion"
        />
        <div>
          <div className="pb-1">
            Selecciona una cancion
          </div>
          <Input 
            id="song"
            type="file"
            disabled={isLoading}
            accept=".mp3"
            {...register('song', { required: true })}
          />
        </div>
        <div>
          <div className="pb-1">
            Selecciona una imagen
          </div>
          <Input 
            id="image"
            type="file"
            disabled={isLoading}
            accept="image/*"
            {...register('image', { required: true })}
          />
        </div>
        <Button 
          disabled={isLoading}
          type="submit"
        >
          Crear
        </Button>
      </form>
    </Modal>
   );
}
 
export default UploadModal;