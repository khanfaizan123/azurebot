const axios = require('axios');

const searchServiceName = 'cognitiveaisearchforchatbot';
const adminKey = 'LiviFqDCeM7VXq1Sn8WWickAnUPh0hKmg1jLf3EPUNAzSeA4KPaP';
const indexName = 'vector-1723017827674';
const apiVersion = '2024-05-01-preview';
const baseUrl = `https://${searchServiceName}.search.windows.net`;

const searchDocuments = async (query1) => {

 

  try {
    console.log('Search query:', query1);

    const response = await axios.post(
      `${baseUrl}/indexes/${indexName}/docs/search?api-version=${apiVersion}`,
      query1,
      
      {
        headers: {
          'api-key': adminKey,
          'Content-Type': 'application/json'
        },
        queryType: "semantic",
      semanticConfiguration: "vector-1722325244691-semantic-configuration",
      queryLanguage: "en-us",
      top:1
      }
    );
    console.log('Search response:', response.data);
    return response.data.value;
  } catch (error) {
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
    } else {
      console.error('Error message:', error.message);
    }
    throw new Error('Error searching documents');
  }
};

module.exports = {
  searchDocuments
};
