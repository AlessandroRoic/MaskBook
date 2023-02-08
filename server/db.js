const { faker } = require("@faker-js/faker");

const db = {
  feedPost: [],
};

const generateFeedPosts = (id) => ({
  id,
  createdTime: faker.date.past(),
  author: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    profilePhotoUrl: faker.internet.avatar(),
  },
  content: {
    description: faker.lorem.text(),
    ...(id % 3 === 0 && { imageSrc: faker.image.animals(null, null, true) }),
  },
  interactions: {
    reactions: faker.datatype.number(10000),
    comments: faker.datatype.number(10000),
    shares: faker.datatype.number(10000),
  },
});

const forEachGen = (n, func) => {
  const generatedResult = [];
  const hasParams = func && func.length > 0;
  for (let i = 0; i < n; i++) {
    if (hasParams) {
      generatedResult.push(func(i));
      continue;
    }
    generatedResult.push(func);
  }
  return generatedResult;
};

(() => {
  db.feedPost = forEachGen(100, generateFeedPosts);
})();

module.exports = db;
