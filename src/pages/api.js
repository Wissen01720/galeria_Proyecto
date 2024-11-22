export const fetchArtworksByTechniqueAndCategory = async (technique, category) => {
  const response = await fetch(`http://localhost:8080/api/obras?technique=${technique}&category=${category}`, {
    method: 'GET',
    credentials: 'include', // Incluir credenciales en la solicitud
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
};

export const fetchExposiciones = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/exposiciones', {
      method: 'GET',
      credentials: 'include', // Incluir credenciales en la solicitud
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching exposiciones:', error);
    throw error;
  }
};