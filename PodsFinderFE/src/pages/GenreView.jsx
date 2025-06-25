import React, { useEffect, useState } from 'react';
import axiosClient from '../axios-client';
import { useParams, Link } from 'react-router-dom';
import { PlaceholderImage } from '../data/podcastsData';
import { useStateContext } from '../contexts/ContextsPorvider';

export const GenreView = () => {
  const { genreName } = useParams();
  const { user, setUser } = useStateContext();

  const [genrePodcasts, setGenrePodcasts] = useState([]);
  const [allPodcasts, setAllPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient.get('/user')
      .then(({ data }) => setUser(data))
      .catch(console.error);

    axiosClient.get('/podcasts')
      .then(({ data }) => {
        setAllPodcasts(data.data);
        const filtered = data.data.filter(
          (podcast) => podcast.genre?.toLowerCase() === genreName.toLowerCase()
        );
        setGenrePodcasts(filtered);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [genreName]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#eae7b1] flex items-center justify-center text-[#3c6255] text-xl">
        Loading podcasts...
      </div>
    );
  }

  if (genrePodcasts.length === 0) {
    return (
      <div className="min-h-screen bg-[#eae7b1] flex items-center justify-center text-[#3c6255] text-2xl font-bold">
        No podcasts found for genre "{genreName}".
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#eae7b1] pb-10">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-[#3c6255] md:ml-10 pt-4 font-bold text-3xl">
          {genreName.charAt(0).toUpperCase() + genreName.slice(1)} Podcasts
        </h1>
        <hr className="border-t border-[#3c6255] w-auto my-6 ml-10 md:mr-10" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {genrePodcasts.map((podcast) => (
            <div key={podcast.id} className="bg-[#eae7b1] gap-4 p-4 rounded-lg shadow-md ml-8 mr-8">
              <div className="flex items-start gap-4 mb-4">
                <Link to={`/detail/${podcast.id}`}>
                  <img
                    src={podcast.image_url ? `${import.meta.env.VITE_API_BASE_URL}/storage/podcast/${podcast.image_url}` : PlaceholderImage}
                    alt={podcast.title}
                    className="w-28 h-28 object-cover rounded-md flex-shrink-0"
                  />
                </Link>

                <div className="flex flex-col justify-center flex-grow">
                  <Link to={`/detail/${podcast.id}`} className="hover:underline">
                    <h2 className="text-xl font-semibold text-[#3c6255] leading-tight">{podcast.title}</h2>
                  </Link>
                  <p className="text-base text-[#3c6255] mt-1">{podcast.latest_episode?.title || 'No episode info'}</p>
                  <div className="flex items-center text-[#3c6255] mt-2">
                    <i className="ri-star-s-fill mr-1"></i>
                    <p>{podcast.average_rating || 0}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Link to={`/detail/${podcast.id}#review-section`} className="flex-1">
                  <button className="w-full bg-[#3c6255] text-[#eae7b1] px-3 py-1.5 rounded-md text-sm hover:opacity-90 flex items-center justify-center">
                    <i className="ri-edit-2-line mr-1"></i> Review
                  </button>
                </Link>
                <button className="flex-1 bg-[#3c6255] text-[#eae7b1] px-3 py-1.5 rounded-md text-sm hover:opacity-90 flex items-center justify-center">
                  <i className="ri-heart-3-fill mr-1"></i> Playlist
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
