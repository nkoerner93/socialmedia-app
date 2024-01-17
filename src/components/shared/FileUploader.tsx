import { useCallback } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { useState } from "react";
import { Button } from "../ui/button";
import DeleteIcon from "./deleteIcon";

interface FileUploaderProps {
  fieldChange: (FILES: File[]) => void;
  mediaUrl: string;
}

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState("");
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [file]
  );
  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: { "image/*": [".png", ".jpeg", ".jpg", ".svg"] } });

  return (
    <div {...getRootProps()} className="flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer">
      <input {...getInputProps()} className="cursor-pointer" />
      {fileUrl ? (
        <div>
          <DeleteIcon width={32} height={32} />
          <img src="/assets/icons/delete.svg" width={32} height={32} alt="delete"></img>
          <img src={fileUrl} alt="Preview" />
        </div>
      ) : (
        <div className="file_uploader-box">
          <img src="/assets/icons/file-upload.svg" width={96} height={77} alt="file-upload"></img>
          <h2 className="text-light-2 base-medium mt-3 mb-2">Drag Photo here</h2>
          <h3 className="text-light-4 small-regular mb-6">SVG, PNG, JPG</h3>
          <Button type="button" className="shad-button_dark_4">
            Select from computer
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
