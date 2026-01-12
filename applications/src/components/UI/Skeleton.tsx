import React, { ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  width?: string | number;
  height?: string | number;
  circle?: boolean;
  children?: ReactNode;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  width,
  height,
  circle = false,
  ...props
}) => {
  return (
    <div
      className={cn(
        "animate-pulse bg-neutral-200 dark:bg-neutral-300 rounded-md",
        circle && "rounded-full",
        className
      )}
      style={{
        width: width,
        height: height,
      }}
      {...props}
    />
  );
};
