const adventurer = {
  name: 'Alice',
  cat: {
    name: {
      actual: 'selina',
      pet: 'kitty',
    },
  },
  dog: {},
};

// if (adventurer.cat.name) {
//   const catName = adventurer.cat.name;
//   console.log(catName);
// }

console.log(adventurer.cat.name.pet);
console.log(adventurer?.dog?.name?.actual);
