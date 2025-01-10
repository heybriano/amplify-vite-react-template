// src/components/ui/dropdown-menu.tsx
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { forwardRef, type ReactNode, type ForwardRefRenderFunction } from "react";

interface DropdownProps {
  children?: ReactNode;
  className?: string;
}

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

type DropdownMenuContentComponent = ForwardRefRenderFunction<HTMLDivElement, DropdownProps>;

export const DropdownMenuContent = forwardRef<HTMLDivElement, DropdownProps>(
  ({ children, className = "", ...props }, ref) => (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        align="end"
        className={`z-50 min-w-[8rem] rounded-md border border-gray-200 
          bg-white p-1 shadow-md dark:border-gray-800 dark:bg-gray-900 
          ${className}`}
        {...props}
      >
        {children}
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  )
);

if (DropdownMenuContent) {
  DropdownMenuContent.displayName = "DropdownMenuContent";
}

type DropdownMenuItemComponent = ForwardRefRenderFunction<HTMLDivElement, DropdownProps>;

export const DropdownMenuItem = forwardRef<HTMLDivElement, DropdownProps>(
  ({ children, className = "", ...props }, ref) => (
    <DropdownMenuPrimitive.Item
      ref={ref}
      className={`relative flex cursor-default select-none items-center 
        rounded-sm px-2 py-1.5 text-sm outline-none transition-colors 
        focus:bg-gray-100 focus:text-gray-900 dark:focus:bg-gray-800 
        ${className}`}
      {...props}
    >
      {children}
    </DropdownMenuPrimitive.Item>
  )
);

if (DropdownMenuItem) {
  DropdownMenuItem.displayName = "DropdownMenuItem";
}