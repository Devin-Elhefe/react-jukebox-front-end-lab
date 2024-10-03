const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/tracks`;

async function getAllTracks() {
    try{
        const response = await fetch(BASE_URL);
        return response.json();
    } catch(err) {
        console.log(err)
    }
};

async function createTrack(trackData){
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(trackData),
        });
        return response.json();
    } catch(err) {
        console.log(err);
    }
};

async function updateTrack(id, updatedData){
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });
        return response.json();
    } catch(err) {
        console.log(err);
    }


}

async function deleteTrack(id){
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
          method: 'DELETE',
        });
        return response.json();
    } catch(err) {
        console.log(err);
    }
};

export { getAllTracks, createTrack, deleteTrack, updateTrack };
