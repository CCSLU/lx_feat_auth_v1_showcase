"use client";

import { useCurrentUserImage } from "@/entities/1-user/hooks/use-current-user-image";
import { useCurrentUserName } from "@/entities/1-user/hooks/use-current-user-name";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export const CurrentUserAvatar = ({
  className,
  fallbackFontSize,
  ...props
}: React.ComponentProps<typeof Avatar> & {
  fallbackFontSize?: number | string;
}) => {
  const profileImage = useCurrentUserImage();
  const name = useCurrentUserName();
  const initials = name
    ? name
        .split(" ")
        .slice(0, 2)
        .map((word) => word[0])
        .join("")
        .toUpperCase()
    : "";

  return (
    <Avatar className={cn("h-6 w-6", className)} {...props}>
      {profileImage && (
        <AvatarImage src={profileImage} alt={`Profile image of ${name}`} />
      )}
      <AvatarFallback
        style={fallbackFontSize ? { fontSize: fallbackFontSize } : undefined}
        className="text-background flex items-center justify-center bg-gradient-to-br from-cyan-400 to-indigo-400 font-extrabold"
      >
        {initials}
      </AvatarFallback>
    </Avatar>
  );
};
