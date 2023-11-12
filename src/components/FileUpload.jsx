import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Spinner from './Spinner';

const FileUpload = ({ onFileSelect, children }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    setIsUploading(true);

    // Simulate file upload (replace this with your actual upload logic).
    setTimeout(() => {
      setIsUploading(false);
      setFile(acceptedFiles[0]);
      onFileSelect(acceptedFiles[0]); // Notify the parent component about the selected file.
    }, 2000);
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDragEnter: () => {
      setFile(null);
    },
    onDragOver: () => {
      setFile(null);
    },
    onDragLeave: () => {
      setFile(null);
    },
  });

  return (
    <>
      <p className='my-2 text-sm text-foreground font-medium'>Imagen {children}</p>
      <div className={`border border-default-400 p-3 mb-5 rounded-xl ${isDragActive ? 'bg-default-100 border-default-100' : ''} transition-colors duration-500`}>
        <div {...getRootProps()}>
          <input {...getInputProps()} name="file" /> {/* Add name="file" attribute */}
          {isUploading ? (
            <Spinner size={'text-tiny'}>Cargando archivo...</Spinner>
          ) : (
            <div>
              {file?.name ? (
                <p className='text-tiny'>{file.name} <span className='text-default-400'>{(file.size / 1000000).toFixed(2)} Mb</span></p>
              ) : (
                <>
                  <p className='text-tiny text-center font-semibold'>{isDragActive ? 'Suelta el archivo aquí' : 'Arrastra y suelta archivos aquí o haz clic para seleccionar archivos'}</p>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-auto mt-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FileUpload;
