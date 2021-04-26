export const getScores = async () => {
  const response = await fetch("http://birdapi.medialabs.at/");
  if (response.status !== 200) {
    throw new Error("cannot get scores");
  }

  const data = await response.json();
  return data;
};
