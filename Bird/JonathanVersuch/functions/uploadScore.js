export const uploadScore = async (score, player) => {
  const data = { score: `${score}`, player: `${player}` };

  //localhost:8080 als proxyserver... Starten mit  "node node_modules/cors-anywhere/server.js"
  const response = fetch("http://localhost:8080/http://birdapi.medialabs.at/", {
    method: "PUT",

    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => console.log("Success: ", data))
    .catch((error) => {
      console.log("Error:", error);
    });
};
