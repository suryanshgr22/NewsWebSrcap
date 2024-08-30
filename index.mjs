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
        .filter(item => item.disaster.toLowerCase() !== "none" && item.place.toLowerCase() !== "none")
        .map(item => {
          // Handle the place field
          let placeParts = item.place.split(" ").map(part => part.trim());

          let firstPlace = placeParts[0];

          // Handle the disaster field
          let disasterParts = item.disaster.split(" ").map(part => part.trim());
          let firstDisaster = disasterParts[0];

          // Update the place and disaster in the object
          return {
            ...item,
            place: firstPlace,
            disaster: firstDisaster
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
