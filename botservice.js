const { ActivityHandler,MessageFactory } = require('botbuilder');
const { getChatCompletion} = require('./openaiservice');
const { searchDocuments} =require("./searchService");
class MyBot extends ActivityHandler {
  constructor() {
    super();
    // this.conversationstate=conversationstate;
    // this.userstate=userstate;

    this.onMessage(async (context, next) => {
      const userMessage = context.activity.text;
     //await this.dispatchConversationUpdateActivity(userMessage);
      console.log(userMessage,"user message"); 
     const searchQuery={
      search:userMessage, 
      
     }
        
    
     // const ans=await searchDocuments(searchQuery);
      //console.log(ans);
    
    //  const context1 = ans.map(doc => doc.chunk).join(' ');
     // console.log(context1);
      try {
        const results = await getChatCompletion(userMessage);
        let replyText = '';

        if (results.length > 0) {
          replyText = `${results}`;
        } else {
          replyText = 'Sorry, I couldn\'t find any relevant information.';
        }

        await context.sendActivity(MessageFactory.text(replyText,replyText));
      } catch (error) {
        console.log(error,"yha h");
        await context.sendActivity('Sorry, there was an error processing your request.');
      }

      await next();
    });
  }
}

module.exports.MyBot = MyBot;
