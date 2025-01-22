import { Music } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatDuration } from "../utils/helper-functions";

const SongCard = ({ song }) => {
  const navigate = useNavigate();
  const handleSelectSong = (song) => {
    navigate(`/song/${song.id}`);
  };
  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
      onClick={() => handleSelectSong(song)}
    >
      <div className="relative w-full h-48 aspect-square cursor-pointer">
        {song.image ? (
          <img
            src={song.image}
            alt={song.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <Music size={48} className="text-gray-400" />
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="cursor-pointer">
          <h3 className="font-bold text-lg truncate">{song.title}</h3>
          <p className="text-gray-600 truncate">{song.artist}</p>
          <p className="text-gray-500 text-sm mt-2">
            {formatDuration(song.duration)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SongCard;
