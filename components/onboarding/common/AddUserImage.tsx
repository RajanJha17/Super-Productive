import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useMemo, useRef, useState } from "react";
import { Camera, User } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/ui/user-avatar";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { imageSchema, ImageShema } from "@/schema/imageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";

interface Props {
  profileImage?: string | null;
  className?: string;
}

const AddUserImage = ({ profileImage, className }: Props) => {
  const [open, setOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const inputRef = useRef<null | HTMLInputElement>(null);

  const form = useForm<ImageShema>({
    resolver: zodResolver(imageSchema),
  });

  const onImageChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    if(e.target.files && e.target.files[0]){
      const selectedFile=e.target.files[0];
      const result=imageSchema.safeParse({image:selectedFile})

      if(result.success){
        form.clearErrors("image");
        form.setValue("image",selectedFile)
        setImagePreview(URL.createObjectURL(e.target.files[0]))
      }else{
        const errors=result.error.flatten().fieldErrors.image;
        errors?.forEach((error)=>{
          form.setError("image",{message:error})
        })
      }

    }

  }

  const imageOptions=useMemo(()=>{
    if(!imagePreview && profileImage){
      return{
        canDelete:true,
        canSave:false
      }
    }else if(imagePreview && profileImage){
      return{
        canDelete:false,
        canSave:true
      } 
    }else if(imagePreview && !profileImage){
      return {
        canDelete:false,
        canSave:true
      }
        
    }else {
      return {
        canDelete:false,
        canSave:false
      }
    }

  },[imagePreview,profileImage])

  const onSubmit = () => {};

  return (
    <div className="w-full flex flex-col justify-center items-center gap-2">
      <p className="text-sm text-muted-foreground">Add a photo</p>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            className={cn(
              "group relative bg-muted w-16 h-16 md:h-20 md:w-20 rounded-full flex justify-center items-center text-muted-foreground overflow-hidden",
              className
            )}
          >
            {profileImage ? (
              <Image
                priority
                src={profileImage}
                alt=""
                fill
                className="object-cover w-full h-full"
              />
            ) : (
              <User />
            )}
            <div className="group-hover:opacity-80 transition-opacity duration-200 opacity-0 w-full h-full absolute bg-black flex justify-center items-center flex-col gap-1 text-xs text-white">
              <Camera size={20} />
              <p>Hover</p>
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload a photo</DialogTitle>
          </DialogHeader>
          {imagePreview ? (
            <div className="rounded-full w-32 h-32 sm:w-52 sm:h-52 relative overflow-hidden my-5">
              <Image
                src={imagePreview}
                alt=""
                fill
                className="object-cover w-full h-full"
              />
            </div>
          ) : (
            <UserAvatar
              className="w-32 h-32 sm:w-52 sm:h-52 my-5"
              size={52}
              profileImage={profileImage}
            />
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex justify-center items-center">
                        <Button
                          onClick={() => {
                            inputRef.current?.click();
                          }}
                          type="button"
                          className=" mb-1"
                        >
                          Choose a file
                        </Button>
                        <Input
                          {...field}
                          ref={inputRef}
                          value={undefined}
                          onChange={onImageChange}
                          type="file"
                          id="image"
                          className="hidden"
                          accept="image/*"
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
              <div className="flex mt-5 w-full justify-center items-center gap-4">
                <Button  type="button">

                </Button>

              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddUserImage;
