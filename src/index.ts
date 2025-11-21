import { deepDiff } from "./deepDiff";

const oldData = {
  name: "Vanshika",
  address: {
    city: "Araria",
    pin: 854311
  },
  skills: ["film", "editing"]
};

const newData = {
  name: "Vanshika Kumari",
  address: {
    city: "Araria",
    pin: 854312
  },
  skills: ["film", "editing", "direction"]
};

console.log("Changes:", deepDiff(oldData, newData));
