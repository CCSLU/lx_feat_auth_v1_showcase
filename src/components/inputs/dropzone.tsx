"use client";

import { cn } from "@/lib/utils";
import { type UseSupabaseUploadReturn } from "@/hooks/use-supabase-upload";
import { Button } from "@/components/ui/button";
import { CheckCircle, File, Loader2, Upload, X } from "lucide-react";
import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
} from "react";

export const formatBytes = (
  bytes: number,
  decimals = 2,
  size?: "bytes" | "KB" | "MB" | "GB" | "TB" | "PB" | "EB" | "ZB" | "YB",
) => {
  const k = 1000;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  if (bytes === 0 || bytes === undefined)
    return size !== undefined ? `0 ${size}` : "0 bytes";
  const i =
    size !== undefined
      ? sizes.indexOf(size)
      : Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

type DropzoneContextType = Omit<
  UseSupabaseUploadReturn,
  "getRootProps" | "getInputProps"
>;

const DropzoneContext = createContext<DropzoneContextType | undefined>(
  undefined,
);

type DropzoneProps = UseSupabaseUploadReturn & {
  className?: string;
};

const Dropzone = ({
  className,
  children,
  getRootProps,
  getInputProps,
  ...restProps
}: PropsWithChildren<DropzoneProps>) => {
  const isSuccess = restProps.isSuccess;
  const isActive = restProps.isDragActive;
  const isInvalid =
    (restProps.isDragActive && restProps.isDragReject) ||
    (restProps.errors.length > 0 && !restProps.isSuccess) ||
    restProps.files.some((file) => file.errors.length !== 0);

  return (
    <DropzoneContext.Provider value={{ ...restProps }}>
      <div
        {...getRootProps({
          className: cn(
            "border-2 border-border rounded-lg p-6 text-center bg-card transition-colors duration-300 text-foreground",
            className,
            isSuccess ? "border-solid" : "border-dashed",
            isActive && "border-primary bg-primary/5",
            isInvalid && "border-destructive bg-destructive/5",
          ),
        })}
      >
        <input {...getInputProps()} />
        {children}
      </div>
    </DropzoneContext.Provider>
  );
};
const DropzoneContent = ({ 
  className,
  imagePreviewStyle = "rounded" // Nuevo prop para estilo de preview
}: { 
  className?: string;
  imagePreviewStyle?: "rounded" | "square";
}) => {
  const {
    files,
    setFiles,
    onUpload,
    loading,
    successes,
    errors,
    maxFileSize,
    maxFiles,
    isSuccess,
  } = useDropzoneContext();

  const exceedMaxFiles = files.length > maxFiles;

  const handleRemoveFile = useCallback(
    (fileName: string) => {
      setFiles(files.filter((file) => file.name !== fileName));
    },
    [files, setFiles],
  );

  if (isSuccess) {
    return (
      <div
        className={cn(
          "flex flex-row items-center justify-center gap-x-2",
          className,
        )}
      >
        <CheckCircle size={16} className="text-primary" />
        <p className="text-primary text-sm font-medium">
          Se ha subido correctamente {files.length} archivo{files.length > 1 ? "s" : ""}
        </p>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col", className)}>
      {files.map((file, idx) => {
        const fileError = errors.find((e) => e.name === file.name);
        const isSuccessfullyUploaded = !!successes.find((e) => e === file.name);

        return (
          <div
            key={`${file.name}-${idx}`}
            className="flex items-center gap-x-4 border-b border-border py-3 first:mt-4 last:mb-4"
          >
            {file.type.startsWith("image/") ? (
              <div className={cn(
                "bg-muted flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden border border-border",
                imagePreviewStyle === "rounded" ? "rounded-full" : "rounded-md"
              )}>
                <img
                  src={file.preview}
                  alt={file.name}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="bg-muted flex h-24 w-24 items-center justify-center rounded-md border border-border">
                <File size={36} className="text-muted-foreground" />
              </div>
            )}

            <div className="flex shrink grow flex-col items-start truncate">
              <p title={file.name} className="max-w-full truncate text-sm font-medium">
                {file.name}
              </p>
              {file.errors.length > 0 ? (
                <p className="text-destructive text-xs">
                  {file.errors
                    .map((e) =>
                      e.message.startsWith("File is larger than")
                        ? `El archivo es más grande que ${formatBytes(maxFileSize, 2)} (Tamaño: ${formatBytes(file.size, 2)})`
                        : e.message,
                    )
                    .join(", ")}
                </p>
              ) : loading && !isSuccessfullyUploaded ? (
                <p className="text-muted-foreground text-xs">
                  Subiendo archivo...
                </p>
              ) : !!fileError ? (
                <p className="text-destructive text-xs">
                  Error al subir: {fileError.message}
                </p>
              ) : isSuccessfullyUploaded ? (
                <p className="text-primary text-xs">
                  Archivo subido correctamente
                </p>
              ) : (
                <p className="text-muted-foreground text-xs">
                  {formatBytes(file.size, 2)}
                </p>
              )}
            </div>

            {!loading && !isSuccessfullyUploaded && (
              <Button
                size="icon"
                variant="ghost"
                className="text-muted-foreground hover:text-foreground hover:bg-muted shrink-0 justify-self-end h-8 w-8"
                onClick={() => handleRemoveFile(file.name)}
              >
                <X size={16} />
              </Button>
            )}
          </div>
        );
      })}
      {exceedMaxFiles && (
        <p className="text-destructive mt-2 text-left text-sm">
          Solo puedes subir hasta {maxFiles} archivos, por favor elimina{" "}
          {files.length - maxFiles} archivo
          {files.length - maxFiles > 1 ? "s" : ""}.
        </p>
      )}
      {files.length > 0 && !exceedMaxFiles && (
        <div className="mt-4">
          <Button
            variant="default"
            onClick={onUpload}
            disabled={files.some((file) => file.errors.length !== 0) || loading}
            className="w-full sm:w-auto"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Subiendo...
              </>
            ) : (
              <>Subir archivos</>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

const DropzoneEmptyState = ({ className }: { className?: string }) => {
  const { maxFiles, maxFileSize, inputRef, isSuccess } = useDropzoneContext();

  if (isSuccess) {
    return null;
  }

  return (
    <div className={cn("flex flex-col items-center gap-y-3 py-2", className)}>
      <div className="p-3 bg-primary/10 rounded-full">
        <Upload size={24} className="text-primary" />
      </div>
      <p className="text-base font-medium text-foreground">
        Sube archivo
      </p>
      <div className="flex flex-col items-center gap-y-1">
        <p className="text-muted-foreground text-sm">
          Arrastra y suelta o{" "}
          <Button 
            variant="link" 
            className="h-auto p-0 text-sm font-medium text-primary hover:text-primary/80"
            onClick={() => inputRef.current?.click()}
          >
            selecciona archivo
          </Button>{" "}
          para subir
        </p>
        {maxFileSize !== Number.POSITIVE_INFINITY && (
          <p className="text-muted-foreground text-xs">
            Tamaño máximo: {formatBytes(maxFileSize, 2)}
          </p>
        )}
      </div>
    </div>
  );
};

const useDropzoneContext = () => {
  const context = useContext(DropzoneContext);

  if (!context) {
    throw new Error("useDropzoneContext debe usarse dentro de un Dropzone");
  }

  return context;
};

export { Dropzone, DropzoneContent, DropzoneEmptyState, useDropzoneContext };
