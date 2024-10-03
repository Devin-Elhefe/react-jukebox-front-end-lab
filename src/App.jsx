import { useState, useEffect } from 'react'
import TrackList from './components/TrackList';
import TrackForm from './components/TrackForm';
import { getAllTracks } from './services/trackService';
import { deleteTrack } from './services/trackService';
import { updateTrack } from './services/trackService';
import { createTrack } from './services/trackService';

import './App.css'

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [nowPlaying, setNowPlaying] = useState(null);
  const [editingTrack, setEditingTrack] = useState(null);

  useEffect(() => {
    const fetchTracks = async () => {
      const tracksData = await getAllTracks();
      setTracks(tracksData);
    };
    fetchTracks();
  }, []);

  const handlePlay = (track) => {
    setNowPlaying(track);
  }

  const handleSaveTrack = async (track) => {
    if (editingTrack) {

      const updatedTrack = await updateTrack(editingTrack._id, track);
      setTracks(tracks.map((t) => (t._id === updatedTrack._id ? updatedTrack : t)));
      setEditingTrack(null);
    } else {
      const newTrack = await createTrack(track);
      setTracks([...tracks, newTrack]);
    }
    setShowForm(false);
  };

  const handleEdit = (track) => {
    setEditingTrack(track);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    await deleteTrack(id);
    setTracks(tracks.filter((track) => track._id !== id));
  };

  return (
    <div>
      <h1>Reactville Jukebox</h1>
      <button onClick={() => {
        setEditingTrack(null); // Clear editing state if adding new track
        setShowForm(true);
      }}>
        Add New Track
      </button>
      {showForm && (
        <TrackForm onSave={handleSaveTrack} track={editingTrack} />
      )}
      <TrackList
        tracks={tracks}
        onPlay={handlePlay}
        onEdit={handleEdit} // Make sure to pass the handleEdit function here
        onDelete={handleDelete}
      />
      {nowPlaying && (
        <div>
          <h2>Now Playing</h2>
          <p>{nowPlaying.title} - {nowPlaying.artist}</p>
        </div>
      )}
    </div>
  )
};

export default App;
