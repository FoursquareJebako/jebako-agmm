<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const config = useRuntimeConfig()
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: config.public.apikey,
  authDomain: config.public.authdomain,
  databaseURL: config.public.databaseurl,
  projectId: config.public.projectid,
  storageBucket: config.public.storagebucket,
  messagingSenderId: config.public.messagingsenderid,
  appId: config.public.appid,
  measurementId: config.public.measurementid
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
</script>