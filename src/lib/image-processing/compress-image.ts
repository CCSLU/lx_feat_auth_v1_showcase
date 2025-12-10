import imageCompression from "browser-image-compression";

// Función para comprimir avatares y recortarlos en forma cuadrada
export const compressAvatarImage = async (file: File) => {
  console.log(
    "🔍 compressAvatarImage - Archivo original:",
    file.name,
    file.size,
    file.type,
  );

  try {
    // Primero recortamos la imagen en forma cuadrada
    const squareImage = await cropImageToSquare(file);

    // Luego comprimimos la imagen recortada
    const options = {
      maxWidthOrHeight: 256,
      maxSizeMB: 0.1,
      fileType: "image/webp",
      useWebWorker: false, // Desactivamos el web worker para depurar
      initialQuality: 0.7, // Forzamos una calidad inicial
      alwaysKeepResolution: false, // Permitimos cambiar la resolución
    };

    const compressedFile = await imageCompression(squareImage, options);

    // Forzar el tipo MIME a webp
    const webpBlob = new Blob([await compressedFile.arrayBuffer()], {
      type: "image/webp",
    });

    // Crear un nuevo archivo con la extensión .webp
    const fileName = file.name.split(".")[0] + ".webp";
    const webpFile = new File([webpBlob], fileName, { type: "image/webp" });

    console.log(
      "✅ compressAvatarImage - Archivo recortado, comprimido y convertido a WebP:",
      webpFile.name,
      webpFile.size,
      webpFile.type,
    );

    return webpFile;
  } catch (error) {
    console.error("❌ compressAvatarImage - Error al procesar:", error);
    throw error;
  }
};

// Función para recortar la imagen en forma cuadrada (relación 1:1)
const cropImageToSquare = async (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    img.onload = () => {
      try {
        if (!ctx) {
          reject(new Error("Error al obtener el contexto del canvas"));
          return;
        }

        // Determinar el tamaño del cuadrado (el lado más pequeño)
        const size = Math.min(img.width, img.height);

        // Configurar el canvas al tamaño cuadrado
        canvas.width = size;
        canvas.height = size;

        // Calcular posición para centrar la imagen
        const offsetX = (img.width - size) / 2;
        const offsetY = (img.height - size) / 2;

        // Dibujar la porción cuadrada de la imagen en el canvas
        ctx.drawImage(img, offsetX, offsetY, size, size, 0, 0, size, size);

        // Convertir el canvas a un Blob
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error("Error al crear el blob de la imagen recortada"));
            return;
          }

          // Crear un nuevo archivo con el mismo nombre
          const croppedFile = new File([blob], file.name, { type: file.type });
          resolve(croppedFile);
        }, file.type);
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error("Error al cargar la imagen para recortar"));
    };

    // Cargar la imagen desde el archivo
    img.src = URL.createObjectURL(file);
  });
};

// Función para comprimir miniaturas
export const compressThumbnailImage = async (file: File) => {
  const options = {
    maxWidthOrHeight: 150,
    maxSizeMB: 0.05,
    fileType: "image/webp",
    useWebWorker: true,
  };
  return await imageCompression(file, options);
};

// Función para comprimir logos
export const compressLogoImage = async (file: File) => {
  const options = {
    maxWidthOrHeight: 512,
    maxSizeMB: 0.3,
    fileType: "image/png", // PNG para mejor calidad en logos
    useWebWorker: true,
  };
  return await imageCompression(file, options);
};

// Función para comprimir imágenes de contenido
export const compressContentImage = async (file: File) => {
  const options = {
    maxWidthOrHeight: 1200,
    maxSizeMB: 0.8,
    fileType: "image/webp",
    useWebWorker: true,
  };
  return await imageCompression(file, options);
};

// Exportar la función original como predeterminada para mantener compatibilidad
export default compressAvatarImage;
