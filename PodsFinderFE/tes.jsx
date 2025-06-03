import React, { useState, useEffect } from 'react';

function MyComponent() {
  const [myState, setMyState] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem('ACCESS_TOKEN'); // Replace 'myKey' with your actual key

    if (storedData) {
      setMyState(JSON.parse(storedData));
    } else {
      setMyState({ default: null }); // Set default value
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  useEffect(() => {
    if (myState) {
      localStorage.setItem('ACCESS_TOKEN', JSON.stringify(ACCESS_TOKEN)); // Store updated data
    }
  }, [myState]); // Dependency array ensures local storage is updated when myState changes

  return (
    <div>
      {/* Display the restored or default state */}
      <p>My State: {JSON.stringify(ACCESS_TOKEN)}</p>
    </div>
  );
}

export default MyComponent;