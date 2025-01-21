import { useParams, useNavigate } from "react-router-dom";
import CommentSection from "../components/CommentSection";

const SongDetailsPage = ({ songs, comments, users, currentUser }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const selectedSong = songs.find((song) => song.id === Number(id));

  if (!selectedSong) {
    return <div>Song not found!</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-500 hover:text-blue-600"
      >
        ← Back to search
      </button>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-start space-x-6">
          <img
            src={selectedSong.image}
            alt={selectedSong.title}
            className="w-48 h-48 object-cover rounded-lg"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{selectedSong.title}</h2>
            <p className="text-gray-500 mt-2">{selectedSong.artist}</p>
            <CommentSection
              songId={selectedSong.id}
              comments={comments}
              users={users}
              currentUser={currentUser}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongDetailsPage;
