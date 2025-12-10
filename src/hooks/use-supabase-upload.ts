import { createClient } from "@/lib/supabase/client";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  type FileError,
  type FileRejection,
  useDropzone,
} from "react-dropzone";

// 1. Crear cliente de Supabase
const supabase = createClient();

// 2. Archivo con vista previa y errores
interface FileWithPreview extends File {
  preview?: string;
  errors: readonly FileError[];
}

// 3. Opciones para el hook de carga de Supabase
type UseSupabaseUploadOptions = {
  /** Nombre del bucket en Supabase Storage */
  bucketName: string;
  /** Carpeta/ruta dentro del bucket */
  path?: string;
  /** Lista de tipos MIME permitidos */
  allowedMimeTypes?: string[];
  /** Tama o m ximo permitido (bytes) */
  maxFileSize?: number;
  /** N mero m ximo de archivos permitidos */
  maxFiles?: number;
  /** Control de cach  en segundos */
  cacheControl?: number;
  /** Si es true, sobrescribe archivos existentes */
  upsert?: boolean;
  /** Nombre de archivo fijo (se mantiene la extensi n original) */
  fileName?: string;
  /** Transformar archivos antes de cargarlos */
  transformFile?: (file: File) => Promise<File>;
};

type UseSupabaseUploadReturn = ReturnType<typeof useSupabaseUpload>;

// Hook para administrar de forma declarativa la carga de archivos en Supabase Storage.
// - Maneja la selecci n, validaci n, carga y estado de los archivos.
const useSupabaseUpload = (options: UseSupabaseUploadOptions) => {
  // 4. Desestructuracion de opciones con valores predeterminados
  const {
    bucketName,
    path,
    allowedMimeTypes = [],
    maxFileSize = Number.POSITIVE_INFINITY,
    maxFiles = 1,
    cacheControl = 3600,
    upsert = false,
    fileName,
    transformFile,
  } = options;

  // 5. Estados internos para archivos, carga, errores y  xitos
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ name: string; message: string }[]>([]);
  const [successes, setSuccesses] = useState<string[]>([]);

  // 6. C lculo de si la carga fue exitosa
  const isSuccess = useMemo(() => {
    if (errors.length === 0 && successes.length === 0) return false;
    if (errors.length === 0 && successes.length === files.length) return true;
    return false;
  }, [errors.length, successes.length, files.length]);

  // 7. Manejador de archivos arrastrados en la zona de drop
  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      // Si solo se permite un archivo, reemplazar archivos actuales
      const newFiles = maxFiles === 1 ? [] : [...files];

      // Preparar archivos v lidos (sin duplicados)
      const validFiles = acceptedFiles
        .filter((file) => !newFiles.find((x) => x.name === file.name))
        .map((file) => {
          (file as FileWithPreview).preview = URL.createObjectURL(file);
          (file as FileWithPreview).errors = [];
          return file as FileWithPreview;
        });

      // Preparar archivos inv lidos
      const invalidFiles = rejectedFiles.map(({ file, errors }) => {
        (file as FileWithPreview).preview = URL.createObjectURL(file);
        (file as FileWithPreview).errors = errors;
        return file as FileWithPreview;
      });

      setFiles([...newFiles, ...validFiles, ...invalidFiles]);
    },
    [files, setFiles, maxFiles],
  );

  // 8. Props para react-dropzone
  const dropzoneProps = useDropzone({
    onDrop,
    noClick: true,
    accept: allowedMimeTypes.reduce(
      (acc, type) => ({ ...acc, [type]: [] }),
      {},
    ),
    maxSize: maxFileSize,
    maxFiles,
    multiple: maxFiles !== 1,
  });

  // 9. Manejador para cargar archivos en Supabase Storage
  const uploadFiles = useCallback(async () => {
    setLoading(true);

    // Determinar qu  archivos cargar (errores anteriores o pendientes)
    const filesWithErrors = errors.map((x) => x.name);
    const filesToUpload =
      filesWithErrors.length > 0
        ? [
            ...files.filter((f) => filesWithErrors.includes(f.name)),
            ...files.filter((f) => !successes.includes(f.name)),
          ]
        : files;

    // Cargar cada archivo
    const responses = await Promise.all(
      filesToUpload.map(async (file) => {
        // Aplicar transformación si existe
        let fileToUpload = file;
        if (transformFile) {
          console.log(
            "🔍 Iniciando transformación del archivo:",
            file.name,
            "Tamaño original:",
            file.size,
          );
          try {
            // Aseguramos que el archivo transformado mantiene las propiedades necesarias
            const transformedFile = await transformFile(file);
            console.log(
              "✅ Archivo transformado:",
              transformedFile.name,
              "Nuevo tamaño:",
              transformedFile.size,
              "Tipo:",
              transformedFile.type,
            );

            // Copiamos las propiedades preview y errors del archivo original
            (transformedFile as FileWithPreview).preview = file.preview;
            (transformedFile as FileWithPreview).errors = file.errors;
            fileToUpload = transformedFile as FileWithPreview;
          } catch (error) {
            console.error("❌ Error al transformar el archivo:", error);
            return {
              name: file.name,
              message: "Error al transformar el archivo",
            };
          }
        } else {
          console.log(
            "⚠️ No se ha proporcionado función de transformación para el archivo:",
            file.name,
          );
        }

        // Determinar el nombre del archivo para subir
        let uploadName;

        // Si se especifica un nombre fijo y solo se permite un archivo, usarlo
        if (fileName && maxFiles === 1) {
          // Mantener el nombre fijo sin preocuparse por la extensión
          // El tipo MIME correcto se conservará en los metadatos del archivo
          uploadName = fileName;
          console.log("💾 Usando nombre fijo sin extensión:", uploadName);
        }
        // Caso por defecto: usar el nombre original
        else {
          uploadName = file.name;
          console.log("💾 Usando nombre original:", uploadName);
        }
        const fullPath = path ? `${path}/${uploadName}` : uploadName;
        const { error } = await supabase.storage
          .from(bucketName)
          .upload(fullPath, fileToUpload, {
            cacheControl: cacheControl.toString(),
            upsert,
          });
        if (error) {
          return { name: file.name, message: error.message };
        } else {
          return { name: file.name, message: undefined };
        }
      }),
    );

    // Procesar errores y  xitos
    const responseErrors = responses.filter((x) => x.message !== undefined);
    setErrors(responseErrors);

    const responseSuccesses = responses.filter((x) => x.message === undefined);
    const newSuccesses = Array.from(
      new Set([...successes, ...responseSuccesses.map((x) => x.name)]),
    );
    setSuccesses(newSuccesses);

    setLoading(false);
  }, [
    files,
    path,
    bucketName,
    errors,
    successes,
    fileName,
    cacheControl,
    upsert,
    maxFiles,
    transformFile,
  ]);

  // 10. Efecto: limpiar errores si se eliminan archivos, y arreglar "too-many-files"
  useEffect(() => {
    if (files.length === 0) setErrors([]);
    if (files.length <= maxFiles) {
      let changes = false;
      const newFiles = files.map((file) => {
        if (file.errors.some((e) => e.code === "too-many-files")) {
          file.errors = file.errors.filter((e) => e.code !== "too-many-files");
          changes = true;
        }
        return file;
      });
      if (changes) setFiles(newFiles);
    }
  }, [files, setFiles, maxFiles]);

  // 11. Devolver API del hook: estado, setters, m todos y props de dropzone
  return {
    files,
    setFiles,
    successes,
    isSuccess,
    loading,
    errors,
    setErrors,
    onUpload: uploadFiles,
    maxFileSize,
    maxFiles,
    allowedMimeTypes,
    ...dropzoneProps,
  };
};

export {
  useSupabaseUpload,
  type UseSupabaseUploadOptions,
  type UseSupabaseUploadReturn,
};
