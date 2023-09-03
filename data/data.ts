export const dd_orders = [
  {
    id: 1,
    name: {
      first: "Mario",
      last: "Rossi",
    },
    total: 4.0,
    status: "Processing",
    items: [
      [4, "Mattonella", 1],
      [3, "Bomba crema", 2],
      [2, "Acqua naturale", 1],
    ],
  },
  {
    id: 2,
    name: {
      first: "Lorenzo",
      last: "Pascale",
    },
    total: 1.5,
    status: "Processing",
    items: [[3, "Bomba crema", 2]],
  },
  {
    id: 3,
    name: {
      first: "Giuseppe",
      last: "Giacchini",
    },
    total: 7.0,
    status: "Completed",
    items: [
      [3, "Bomba crema", 3],
      [4, "Mattonella", 2],
      [2, "Acqua naturale", 2],
      [5, "Pizzetta rossa", 1],
      [6, "Cotoletta", 1],
    ],
  },
  {
    id: 4,
    name: {
      first: "Silvia",
      last: "Scafetta",
    },
    total: 1.5,
    status: "Completed",
    items: [
      [3, "Bomba crema", 2],
      [2, "Acqua naturale", 2],
    ],
  },
  {
    id: 5,
    name: {
      first: "Adolf",
      last: "Pasqualini",
    },
    total: 8.5,
    status: "Completed",
    items: [
      [3, "Bomba crema", 5],
      [2, "Acqua naturale", 4],
      [4, "Mattonella", 3],
      [5, "Pizzetta rossa", 1],
      [6, "Cotoletta", 3],
    ],
  },
];

export const dd_items = [
  {
    id: 1,
    name: "Acqua frizzante",
    price: 0.5,
    amount: 50,
  },
  {
    id: 2,
    name: "Acqua naturale",
    price: 0.5,
    amount: 70,
  },
  {
    id: 3,
    name: "Bomba crema",
    price: 1.0,
    amount: 20,
  },
  {
    id: 4,
    name: "Mattonella",
    price: 1.0,
    amount: 15,
  },
  {
    id: 5,
    name: "Pizzetta rossa",
    price: 1.5,
    amount: 13,
  },
  {
    id: 6,
    name: "Cotoletta",
    price: 3.0,
    amount: 26,
  },
];
