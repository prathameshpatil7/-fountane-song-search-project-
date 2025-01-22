/* eslint-disable no-unused-vars */
import { useParams, useNavigate } from "react-router-dom";
import CommentSection from "../components/CommentSection";
import { useContext, useEffect, useState } from "react";
import { fetch } from "../services/fetch";
import Header from "../components/Header";
import { SearchContext } from "../context/SearchContext";

const SongDetailsPage = ({ songs, users, currentUser, handleLogout }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [songDetails, setSongDetails] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const { query, setQuery } = useContext(SearchContext);
  useEffect(() => {
    if (!id) {
      navigate("/");
      return;
    }
    const fetchSongDetails = async () => {
      try {
        const trackResponse = await fetch(
          {
            url: `/api/songs/${id}`,
          },
          "GET"
        );
        if (!trackResponse.success) {
          throw new Error("Failed to fetch song details");
        }
        const data = trackResponse.track;
        setSongDetails(data);
        const commentsResponse = await fetch(
          {
            url: `/api/comments/${data.id}`,
          },
          "GET"
        );
        setComments([...commentsResponse.comments]);
        setTotalPages(commentsResponse.totalPages);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSongDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return (
      <div className="bg-gray-100">
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex-col gap-4 w-full flex items-center justify-center">
            <div className="w-28 h-28 border-8 text-blue-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-blue-400 rounded-full">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                height="1em"
                width="1em"
                className="animate-ping"
              >
                <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (!songDetails) {
    return <div>Song not found!</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        currentUser={currentUser}
        handleLogout={() => {
          setQuery("");
          handleLogout();
        }}
      />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-blue-500 hover:text-blue-600"
        >
          ← Back to search
        </button>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-start space-x-6">
            <img
              src={songDetails.image}
              alt={songDetails.title}
              className="w-48 h-48 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{songDetails.title}</h2>
              <p className="text-gray-500 mt-2">{songDetails.artist}</p>
              <CommentSection
                songId={songDetails.id}
                comments={comments}
                users={users}
                currentUser={currentUser}
                totalPages={totalPages}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SongDetailsPage;
