// src/components/ui/avatar.tsx
import * as React from "react";

export interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export const Avatar = React.forwardRef<HTMLImageElement, AvatarProps>(
  ({ className, src, alt, ...props }, ref) => {
    return (
      <img
        ref={ref}
        src={src || `/api/placeholder/32/32`}
        alt={alt}
        className={`rounded-full h-10 w-10 object-cover ${className}`}
        {...props}
      />
    );
  }
);

Avatar.displayName = "Avatar";