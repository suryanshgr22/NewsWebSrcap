# NewsWebScrap

**NewsWebScrap** is a Node.js-based web scraping application that fetches the latest news related to natural disasters in India from Bing News. The application filters and processes the scraped news content using a natural language processing API to identify disaster-related events and their locations.

## Features

- Scrapes the latest natural disaster news from Bing.
- Uses Puppeteer for web scraping.
- Filters and processes news to identify articles about disasters occurring in India.
- Uses the RapidAPI GPT-4 model to analyze news content.
- Outputs a JSON array of valid disaster events with details such as the disaster type and location.

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Puppeteer**: Web scraping tool for automating browser tasks.
- **RapidAPI GPT-4**: API used to process and analyze news content.
- **JavaScript (ES6)**: For the main application logic.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/suryanshgr22/NewsWebScrap.git
   cd NewsWebScrap
2. Install the necessary dependencies:
   ```bash
   npm install

3. Create an .env file in the project root to securely store your API key:
    ```bash
   RAPIDAPI_KEY=your_rapidapi_key

This will scrape the latest natural disaster news from Bing, process it using the GPT-4 API, and filter the results to only include news articles mentioning valid disasters in India.

Output
The program will log the following:

Scraped news items from Bing.
Filtered and modified results based on the API analysis.
A JSON array of valid news items containing:
headline: The title of the news article.
link: The URL of the article.
source: The source of the news article.
disaster: The type of disaster described.
place: The location where the disaster occurred.
Example output:

json
   ```bash
[
  {
    "headline": "Cyclone hits coastal regions",
    "link": "https://example.com/cyclone-news",
    "source": "News Agency",
    "disaster": "Cyclone",
    "place": "Odisha"
  }
]
```
Project Structure
main.js: Main entry point of the application.
scrapeNewsDetails.js: Contains the web scraping logic using Puppeteer.
rapidapi.js: Handles the interaction with the RapidAPI GPT-4 endpoint.
package.json: Defines project dependencies and scripts.
API Integration
The project uses the GPT-4 model from RapidAPI for analyzing news content. The API is queried to determine if the news articles describe a natural disaster in a valid location in India.

Setting Up API Access
To get started with the API:

Create an account on RapidAPI.
Subscribe to the ChatGPT API endpoint.
Copy the API key and store it in your .env file as shown in the Installation section.
Contributing
Feel free to contribute by opening issues or submitting pull requests for new features, bug fixes, or improvements.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Contact
For any questions or feedback, reach out to Suryansh at: suryanshgr22@gmail.com.
```bash

This `README.md` provides clear instructions for setup, usage, and contribution while outlining the project's purpose and structure. Let me know if you need any additional details!
```





  

