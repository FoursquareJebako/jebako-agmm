export const candidates = ref([
  {
    image: './img/idowu.jpeg',
    name: 'Daddy Abiodun Idowu',
    selected: false,
    votes: 0
  },
  {
    image: './img/taiwo.jpeg',
    name: 'Mummy Taiwo Kehinde',
    selected: false,
    votes: 0
  },
  {
    image: './img/sola.jpeg',
    name: 'Dcn. Sola Adeniyi',
    selected: false,
    votes: 0
  },
  {
    image: './img/damilare.jpeg',
    name: 'Bro. Damilare Lawal',
    selected: false,
    votes: 0
  },
  {
    image: './img/abimbola.jpeg',
    name: 'Sis. Abimbola Dada',
    selected: false,
    votes: 0
  },
]);

export const setDemoUser = (id) => {
  clearNuxtState("user");
  let localVote = localStorage.getItem("vote2026");
  if (localVote === null) {
    localStorage.setItem("vote2026", false);
  }
  useState("user", () => {
    return {
      name: "Demo Account",
      phone: "08123456789",
      sex: "M",
      id,
      address: "24 Oluwalogbon Street",
      voteRecord: JSON.parse(localVote),
    };
  });
};

export const setRealUser = (data) => {
  clearNuxtState("user");
  useState("user", () => {
    return data;
  });
};

export const clearVoterStore = () => {
  candidates.value.forEach((candidate) => {
    candidate.selected = false;
    candidate.votes = 0;
  });
}