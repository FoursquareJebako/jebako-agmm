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