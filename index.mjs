import { scrapeNewsDetails } from './scrapeNewsDetails.js'; // Update path as needed

// Define and export the main function
export async function main() {
  try {
    const jsonString = await scrapeNewsDetails();
    console.log('Result JSON String:', jsonString);
    console.log('Type of jsonResult:', typeof jsonString);
    
    // Parse the JSON string into an array of objects
    const jsonResult = JSON.parse(jsonString);

    if (Array.isArray(jsonResult)) {
      // Filter and modify the array
      const filteredResult = jsonResult
        .filter(item => item.disaster !== "none" || item.place !== "none")
        .map(item => {
          let placeParts = item.place.split(',').map(part => part.trim());
          
          // Check if there are more than one place components
          if (placeParts.length > 1) {
            // Keep only the first part and remove "India"
            placeParts = placeParts.filter(part => part !== "India");
          }
          
          // Update the place in the object
          return {
            ...item,
            place: placeParts.join(', ')
          };
        });

      console.log('Filtered and Modified JSON:', filteredResult);
      return filteredResult;
    } else {
      throw new Error('Parsed JSON is not an array');
    }
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
