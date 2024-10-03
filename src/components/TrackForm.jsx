import { useState, useEffect } from 'react';
import { createTrack } from '../services/trackService';

const TrackForm = ({ onSave, track }) => {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');

    useEffect(() => {
        if (track) {
          setTitle(track.title);
          setArtist(track.artist);
        }
      }, [track]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTrack = { title, artist };
        const savedTrack = await createTrack(newTrack);   
        onSave(savedTrack);
};

return (
    <form onSubmit={handleSubmit}>
        <h2>Add New Track</h2>
        <div>
            <label htmlFor="title">Title: </label>
            <input 
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="artist">Artist: </label>
            <input 
            type="text" 
            id="artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            />
        </div>
        <button type="submit">Save Track</button>
    </form>
    );
};

export default TrackForm;