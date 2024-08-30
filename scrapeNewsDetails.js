// scrapeNewsDetails.js
import puppeteer from 'puppeteer';
import getInfo from './rapidapi.js';

export async function scrapeNewsDetails() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("https://www.bing.com/news/search?q=disaster+news+india&qft=sortbydate%3d%221%22&form=YFNR", { waitUntil: 'domcontentloaded' });

  // Scrape only the first 3 news items
  const newsItems = await page.evaluate(() => {
    const newsElements = document.querySelectorAll('.t_t');
    
    // Limit to the first 3 items
    return Array.from(newsElements).slice(0, 3).map(el => {
      const headline = el.querySelector('.title')?.textContent.trim();
      const newsContent = el.querySelector('.title')?.textContent.trim();
      const link = el.querySelector('.title')?.href;

      return { headline, newsContent, link };
    });
  });

  console.log('Scraped News Items:', newsItems);

  const validNewsItems = [];

  for (let index = 0; index < newsItems.length; index++) {
    if (newsItems[index] && newsItems[index].newsContent) {
      try {
        const response = await getInfo(newsItems[index].newsContent);

        // Log the API response
        console.log('API Response:', response);

        if (response && response.result) {
          try {
            const resultObject = JSON.parse(response.result);
            console.log('Parsed Result Object:', resultObject);

            if (resultObject.disaster && resultObject.place) {
              validNewsItems.push({
                headline: newsItems[index].headline,
                link: newsItems[index].link,
                ...resultObject
              });
            }
          } catch (parseError) {
            console.error('Error parsing result object:', parseError);
          }
        } else {
          console.log('API Response contains message or error:', response.message || 'No message provided');
        }
      } catch (error) {
        console.error('Error processing news item:', error);
      }
    }
  }

  // Return the JSON string
  await browser.close();
  return JSON.stringify(validNewsItems, null, 2);
}
