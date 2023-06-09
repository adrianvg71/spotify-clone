"use client"

import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";
import { Song } from "@/types";

interface SearchContentProps {
  songs: Song[]
}

const SearchContent: React.FC<SearchContentProps> = ({
  songs
}) => {
  if(songs.length===0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No se han encontrado canciones
      </div>
    )
  }

  return ( 
    <div className="flex flex-col gap-y-2 w-full px-6">
      {songs.map((song) => (
        <div
        key={song.id}
        className="flex items-center gap-x-4 w-full hover:bg-neutral-800/50 rounded-md pr-4"
        >
         <div className="flex-1">
          <MediaItem 
            onClick={() => {}}
            data={song}
          />
          </div>
        </div>
      ))}
    </div>
   );
}
 
export default SearchContent;