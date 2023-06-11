"use client"

import useGetSongById from "@/hooks/useGetSongById";
import useLoadSong from "@/hooks/useLoadSong";
import usePlayer from "@/hooks/usePlayer";
import PlayerContent from "./PlayerContent";
import { useEffect } from "react";

const Player = () => {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);
  const songUrl = useLoadSong(song!);

  useEffect(() => {
    if (song && player.activeId) {
      localStorage.setItem("lastPlayedSong", player.activeId);
    }
  }, [song, player.activeId]);

  useEffect(() => {
    const lastPlayedSong = localStorage.getItem("lastPlayedSong");

    if (lastPlayedSong) {
      player.setId(lastPlayedSong);
      player.setIds([lastPlayedSong]);
    }
  }, []);

  if (!song || !songUrl || !player.activeId) {
    return null;
  }

  return (
    <div className="fixed bottom-0 bg-black w-full py-2 h-[80px] px-4">
      <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
    </div>
  );
};

export default Player;