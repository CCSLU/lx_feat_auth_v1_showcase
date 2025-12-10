import { useCurrentUserId } from "@/entities/1-user/hooks/use-current-user-id";
import { useSupabaseUpload } from "@/hooks/use-supabase-upload";
import { useEffect } from "react";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/inputs/dropzone";
import compressAvatarImage from "@/lib/image-processing/compress-image";

export default function UserProfileAvatarUploadDialog({
  onClose,
}: {
  onClose: () => void;
}) {
  const userId = useCurrentUserId();

  const upload = useSupabaseUpload({
    bucketName: "user-images",
    allowedMimeTypes: ["image/png", "image/jpeg", "image/jpg", "image/webp" ],
    maxFiles: 1,
    path: `user-avatar/${userId}/`,
    maxFileSize: 1024 * 1024 * 1,
    fileName: `avatar-of-user-${userId}`,
    upsert: true,
    cacheControl: 0,
    transformFile: compressAvatarImage,
  });

  useEffect(() => {
    if (upload.isSuccess) {
      const timeout = setTimeout(() => {
        onClose();
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [upload.isSuccess, onClose]);

  return (
    <Dropzone {...upload}>
      <DropzoneEmptyState />
      <DropzoneContent />
    </Dropzone>
  );
}
