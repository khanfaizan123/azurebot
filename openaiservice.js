// every code written by faizan khan in backend 
const { AzureOpenAI } = require('openai');

const endpoint = "https://chatbotfordemotesting.openai.azure.com/openai/deployments/chatdemofortesting/chat/completions?api-version=2023-03-15-preview";
const apiKey = "d6216adbf67743478b08aa425c5fd77b";
const azureSearchEndpoint="https://cognitiveaisearchforchatbot.search.windows.net";
const azureSearchIndexName="vector-1723017827674";
async function getChatCompletion(formattedContext) {

    const client = new AzureOpenAI({
        apiKey: apiKey,
        endpoint: endpoint,
        apiVersion: '2024-05-01-preview', 
        deployment: 'gpt-35-turbo',
      });
      //console.log(client,"client");
  try {
    const response = await client.chat.completions.create({
      model: 'gpt-35-turbo', // Your deployment ID or model name
      messages: [
        { role: 'system', content: 'You are an assistant that summarizes and clarifies search results.' },
        { role: 'user', content: formattedContext} // Provide formatted context to the model
      ],
      temperature:0.8,
      max_tokens:150,
      data_sources: [
        {
          type: "azure_search",
          parameters: {
            endpoint: azureSearchEndpoint,
            index_name: azureSearchIndexName,
            authentication: {
              type: "system_assigned_managed_identity",
             
            },
          },
        },
      ],
      stream:true,
      
    
    });
    let ans="";
    for await (const event of response) {
        for (const choice of event.choices) {
          console.log(choice.delta?.content);
          if(choice.delta?.content!=undefined){
          ans+=choice?.delta?.content;
          }
        }
      }
    return ans; // Adjust based on actual API response structure
  } catch (error) {
    console.error('Error getting chat completion:', error);
    throw error; // Handle the error as needed
  }
}

module.exports = { getChatCompletion };
