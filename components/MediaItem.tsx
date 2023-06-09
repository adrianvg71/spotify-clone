"use client"

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";
import LikeButton from "./LikeButton";
import { twMerge } from "tailwind-merge";

interface MediaItemProps {
  data: Song,
  onClick?: (id: string) => void;
  className?: string; 
}

const MediaItem: React.FC<MediaItemProps> = ({
  data,
  onClick,
  className
}) => {
  const imageUrl = useLoadImage(data);

  const handleClick = () => {
    if(onClick) {
      return onClick(data.id)
    }

    // TODO: default turn on player
  }

  return ( 
    <div
      onClick={handleClick}
      className={twMerge("flex items-center gap-x-3 cursor-pointer w-full p-2 rounded-md mr-1 hover:bg-neutral-800/50", className)}
    >
      <div className="flex flex-row items-center gap-x-3 w-full">
      <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
        <Image 
          fill
          src={imageUrl || 'images/liked.png'}
          alt="media"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gpa-y-1 overflow-hidden">
        <p className="text-white truncate">
          {data.title}
        </p>
        <p className="text-neutral-400 text-sm truncate">
          {data.author}
        </p>
        </div>
      </div>
      <LikeButton songId={data.id} /> 
    </div>
   );
}
 
export default MediaItem;