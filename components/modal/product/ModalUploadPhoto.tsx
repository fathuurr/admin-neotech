"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../../ui/input";
import { FileUp } from "lucide-react";
import { Button } from "../../ui/button";
import { useToast } from "@/components/ui/use-toast";

import { useState } from "react";
import { uploadPhotoProduct } from "@/service/product";
import Image from "next/image";

const ModalUploadPhoto = ({ product }: any) => {
  const { toast } = useToast();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);

      const imageUrl = URL.createObjectURL(files[0]);
      setImagePreview(imageUrl);
    }
  };

  const onSubmit = async () => {
    if (!selectedFile) {
      toast({
        title: "Please select your file",
        className: "bg-red-500",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await uploadPhotoProduct(formData, product._id);
      if (response.error) {
        toast({
          title: "Error uploading",
          description: response.message,
        });
      } else {
        toast({
          title: "Successfully uploaded",
          className: "bg-green-500",
        });

        window.location.reload();
      }
    } catch (error: any) {
      toast({
        title: error,
        className: "bg-red-500",
      });
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <FileUp className="cursor-pointer mr-2" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add your product</DialogTitle>
          <DialogDescription>Upload your photo product</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
          />

          {imagePreview && (
            <Image
              src={imagePreview}
              width={100}
              height={100}
              alt="Preview"
              className="mt-4 w-full max-h-64 object-contain"
            />
          )}
        </div>
        <DialogFooter>
          <Button onClick={onSubmit} type="submit">
            Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalUploadPhoto;
