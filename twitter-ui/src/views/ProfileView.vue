<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { useProfileStore } from "@/stores/profile";
import ProfileEditor from "@/components/ProfileEditor.vue";

const authStore = useAuthStore();
const profileStore = useProfileStore();

onMounted(async () => {
  await profileStore.loadProfileTweets();
});
</script>

<template>
  <header class="top-header">
    <h2>{{ authStore.user?.name }}</h2>
    <span>3 tweets</span>
  </header>
  <main class="profile">
    <section class="profile__banner-image"></section>
    <section>
      <img
        class="profile__profile-image"
        :src="authStore.user?.profileImage"
        alt=""
      />
      <div class="profile__edit-profile">
        <ProfileEditor />
      </div>
      <div>
        <h3>{{ authStore.user?.name }}</h3>
        <p>@{{ authStore.user?.username }}</p>
      </div>
      <div>
        <span>San Diego, CA</span>
        <span>
          <a href="https://chrisvaldez.dev">chrisvaldez.dev</a>
        </span>
        <span>Joined November 2013</span>
      </div>
      <div>
        <span>335 Following</span>
        <span>30 Followers</span>
      </div>
    </section>
    <section>
      <ul>
        <li v-for="tweet in profileStore.tweets">
          <img
            v-for="media in tweet.medium"
            :src="media.url"
            :alt="media.description"
            style="widht: 100px; height: 100px"
          />
          <p>{{ tweet.text }}</p>
        </li>
      </ul>
    </section>
  </main>
</template>

<style scoped lang="scss">
.top-header {
  position: fixed;
  top: 0;

  span {
    font-size: 0.9rem;
  }
}

.profile {
  margin: 4rem 0 0 0;

  &__banner-image {
  }

  &__profile-image {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
}
</style>
