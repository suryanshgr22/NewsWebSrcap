import { scrapeNewsDetails } from './scrapeNewsDetails.js'; // Update path as needed

// Define and export the main function
export async function main() {
  try {
    const jsonResult = await scrapeNewsDetails();
    console.log('Result JSON:', jsonResult);
    return jsonResult;
  } catch (error) {
    console.error('Error:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
}

// Call main directly if this file is executed
if (import.meta.url === new URL(import.meta.url).href) {
  main().then(result => {
    // You can use the result here if needed
  }).catch(console.error);
}
