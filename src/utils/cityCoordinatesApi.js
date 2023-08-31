export async function fetchCityCoordinates(cityNames) {
  try {
    const response = await fetch(`https://ca53-2a02-dd07-8000-6700-85a7-5264-a56c-3c1d.ngrok-free.app/searchCities`, {
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
