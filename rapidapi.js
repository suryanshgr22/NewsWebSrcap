import https from 'https';

function getInfo(newsitem) {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'POST',
      hostname: 'chatgpt-42.p.rapidapi.com',
      port: null,
      path: '/gpt4',
      headers: {
        'x-rapidapi-key': '54021a709bmsh382ff834249424ep1e70c6jsn094b497e771d',
        'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
        'Content-Type': 'application/json'
      }
    };
    
    const req = https.request(options, (res) => {
      const chunks = [];
    
      res.on('data', (chunk) => {
        chunks.push(chunk);
      });
    
      res.on('end', () => {
        const body = Buffer.concat(chunks).toString();
        
        try {
          const parsedBody = JSON.parse(body);
          resolve(parsedBody);
        } catch (error) {
          reject(new Error('Failed to parse JSON response'));
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.write(JSON.stringify({
      messages: [
        {
          role: 'user',
          content: `Please analyze the following news text and determine if it describes a natural disaster that occurred in a valid place in India. If it does, return a JSON object with exactly two keys: "disaster" (type of disaster) and "place" (location where it occurred). If the news text does not mention a natural disaster or the place is not a valid location in India, return nothing. Do not include any extra explanations, formatting, or code blocks in the response. Here is the news text: "${newsitem}"`
        }
      ],
      web_access: false
    }));
    
    req.end();
  });
}

export default getInfo;
