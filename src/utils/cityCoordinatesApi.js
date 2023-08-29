export async function fetchCityCoordinates(cityNames) {
  try {
    const response = await fetch(`http://localhost:3001/searchCities`, {
      method: 'POST',
      body: JSON.stringify({ cityNames }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch city coordinates');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching city coordinates:', error);
    throw error;
  }
}
