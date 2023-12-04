
export const getTripDuration = async (origin, destination) => {

    const apiUrl = 
    `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${origin[0]},${origin[1]}&destinations=${destination[0]},${destination[1]}&key=1whg5mTs66LqG90JYVs8ZOoslT8qPksxl4RJokTVkbpU3PNatiMM9GzZ8Bh2j4K3`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      // Check if the response is OK
      if (data.status === 'OK') {
        const durationValue = data.rows[0].elements[0].duration.value;
        return durationValue;
      } else {
        throw new Error('API request failed');
      }
    } catch (error) {
      console.error('Error:', error.message);
      throw error;
    }
  };