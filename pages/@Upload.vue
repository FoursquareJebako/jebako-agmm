<template>
  <button @click="null">Import Members</button>
</template>

<!-- components/ImportMembers.vue -->
<script setup>
import members from "~/public/members.json";
import { collection, doc, writeBatch } from "firebase/firestore";
import { useFirebaseApp } from 'vuefire'
import { getFirestore } from "firebase/firestore";


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(useFirebaseApp());
const importMembers = async () => {
  try {
    const batch = writeBatch(db);
    const membersCol = collection(db, "members");

    members.forEach((member) => {
      const docRef = doc(membersCol);
      batch.set(docRef, {
        name: member.name,
        id: member.id,
        sex: member.sex,
        address: member.address,
        phone: member.phone,
        email: '',
        hasVoted: false,
        vote: {},
      });
    });

    await batch.commit();
    alert(`${members.length} members imported successfully`);
  } catch (err) {
    console.error(err);
    alert("Failed to import");
  }
};
</script>
