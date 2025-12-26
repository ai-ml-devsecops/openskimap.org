import "whatwg-fetch";

export function loadGeoJSON<T>(entityID: string): Promise<T> {
  console.log("entityID:", entityID);
  return fetch("https://api.openskimap.org/features/" + entityID + ".geojson")
    .then((response) => {
      return response.json();
    })
    .then((data: any) => {
      // Log the coordinates from the GeoJSON data
      console.log("GeoJSON data for entity", entityID, ":", data);

      if (data.geometry) {
        console.log("Geometry type:", data.geometry.type);
        console.log("Coordinates:", data.geometry.coordinates);

        // Pretty print coordinates based on geometry type
        if (data.geometry.type === "Point") {
          const [lng, lat] = data.geometry.coordinates;
          console.log(`  Point: [lng: ${lng}, lat: ${lat}]`);
        } else if (data.geometry.type === "LineString") {
          console.log(
            `  LineString with ${data.geometry.coordinates.length} points:`
          );
          data.geometry.coordinates.forEach((coord: number[], idx: number) => {
            console.log(
              `    Point ${idx}: [lng: ${coord[0]}, lat: ${coord[1]}]`
            );
          });
        } else if (data.geometry.type === "Polygon") {
          console.log(
            `  Polygon with ${data.geometry.coordinates.length} rings:`
          );
          data.geometry.coordinates.forEach(
            (ring: number[][], ringIdx: number) => {
              console.log(`    Ring ${ringIdx} with ${ring.length} points:`);
              ring.forEach((coord: number[], idx: number) => {
                console.log(
                  `      Point ${idx}: [lng: ${coord[0]}, lat: ${coord[1]}]`
                );
              });
            }
          );
        } else if (data.geometry.type === "MultiLineString") {
          console.log(
            `  MultiLineString with ${data.geometry.coordinates.length} lines:`
          );
          data.geometry.coordinates.forEach(
            (line: number[][], lineIdx: number) => {
              console.log(`    Line ${lineIdx} with ${line.length} points:`);
              line.forEach((coord: number[], idx: number) => {
                console.log(
                  `      Point ${idx}: [lng: ${coord[0]}, lat: ${coord[1]}]`
                );
              });
            }
          );
        }
      }

      return data;
    });
}
