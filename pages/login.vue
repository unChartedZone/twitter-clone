<template>
  <main class="bg-black text-white min-h-screen">
    <div class="w-96 mx-auto space-y-6 py-6">
      <img class="h-16" src="~/assets/svg/bird.svg" alt="Twitter Bird Icon" />
      <h1 class="text-4xl font-bold">Log in to Twitter</h1>
      <v-textfield label="Phone, email, or username" />
      <v-textfield label="Password" type="password" />
      <v-button block>Log in</v-button>
    </div>
  </main>
</template>
