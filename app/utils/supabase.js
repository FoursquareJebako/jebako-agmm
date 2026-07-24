export const fetchUser = async (pass) => {
  const client = useSupabaseClient();
  try {
    const { data, error } = await client
      .from("members")
      .select(` *, voteRecord:voters ( candidates, timestamp )`)
      .eq("id", pass)
      .single();

    if (error && error.message.includes("Failed to fetch")) {
      return { success: false, type: "network" };
    }

    if (!data) {
      return { success: false, type: "password" };
    }

    // console.log("Fetched user data:", data);
    return { success: true, data, status: 200 };
  } catch (error) {
    console.error("Network error while fetching user:", error);
    return { success: false, type: "network" };
  }
};

export const isDemoVote = (voter) => {
  const user = useState("user");
  setTimeout(() => {
    let voteRecord = { candidates: voter.candidates, timestamp: voter.timestamp };
    user.value.voteRecord = voteRecord;
    localStorage.setItem("vote2026", JSON.stringify(voteRecord));
    console.log("Demo user has voted:", user.value);
  }, 2000);
};

export const isRealVote = async (voter) => {
  const user = useState("user");
  const client = useSupabaseClient();
  const { error: voterErr } = await client.from("voters").insert(voter);
  if (voterErr) {
    return { success: false, error: voterErr };
  } else {
    user.value.voteRecord = { candidates: voter.candidates, timestamp: voter.timestamp };
    return { success: true };
  }
};
