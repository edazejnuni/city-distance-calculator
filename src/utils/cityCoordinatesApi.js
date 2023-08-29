export async function fetchCityCoordinates(cityNames) {
  try {
    const response = await fetch(`https://7ae6-2a02-dd07-8000-6700-4c6f-2f9e-f329-5db3.ngrok-free.app/searchCities`, {
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
