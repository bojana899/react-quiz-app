export const generateQuestions = (countries) => {
  const questions = [];

  const getUniqueOptions = (correctAnswer, incorrectOptions) => {
    const allOptions = [correctAnswer, ...incorrectOptions];
    const uniqueOptions = [...new Set(allOptions)];

    while (uniqueOptions.length < 4) {
      const randomOption =
        incorrectOptions[Math.floor(Math.random() * incorrectOptions.length)];
      if (!uniqueOptions.includes(randomOption)) {
        uniqueOptions.push(randomOption);
      }
    }

    return shuffle(uniqueOptions).slice(0, 4);
  };

  countries.forEach((country) => {
    if (country.continent) {
      const options = getUniqueOptions(country.continent.name, [
        "Asia",
        "Africa",
        "Europe",
        "America",
      ]);
      questions.push({
        type: "continent",
        question: `Which continent is ${country.name} in?`,
        options,
        answer: country.continent.name,
      });
    }

    if (country.languages.length > 0) {
      const randomLanguage = country.languages[0].name;
      const options = getUniqueOptions(randomLanguage, [
        "English",
        "Spanish",
        "French",
        "German",
      ]);
      questions.push({
        type: "language",
        question: `What is the official language of ${country.name}?`,
        options,
        answer: randomLanguage,
      });
    }
  });

  return shuffle(questions).slice(0, 10);
};

const shuffle = (array) => array.sort(() => Math.random() - 0.5);
