<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { RouterView } from "vue-router";
import dayjs from "dayjs";
import { useAuthStore } from "@/stores/auth";
import { useProfileStore } from "@/stores/profile";
import ProfileEditor from "@/components/ProfileEditor.vue";

const authStore = useAuthStore();
const profileStore = useProfileStore();
const iconSize = 1.2;

const showProfileEditor = ref<boolean>(false);

const birthDate = computed(() =>
  dayjs(authStore.user?.birthDate).format("MMM D, YYYY")
);

const joinDate = computed(() =>
  dayjs(authStore.user?.joinDate).format("MMMM YYYY")
);

onMounted(async () => {
  await profileStore.loadProfileTweets();
});

function closeProfileEditor() {
  showProfileEditor.value = false;
}
</script>

<template>
  <main class="profile">
    <header class="profile__header">
      <div>
        <Link @click="$router.go(-1)" icon>
          <Icon name="left-arrow" />
        </Link>
        <div>
          <h2>{{ authStore.user?.name }}</h2>
          <span>3 tweets</span>
        </div>
      </div>
    </header>
    <img
      class="profile__banner-image"
      :src="authStore.user?.bannerImage"
      alt=""
    />
    <section class="profile__content">
      <img
        class="profile__profile-image"
        :src="authStore.user?.profileImage"
        alt=""
      />
      <div class="profile__edit-profile">
        <Modal v-model="showProfileEditor" @on-close="closeProfileEditor">
          <template v-slot:activator="{ onClick }">
            <Button @click="onClick" outline>Edit profile</Button>
          </template>
          <ProfileEditor @onClose="closeProfileEditor" />
        </Modal>
      </div>
      <div class="profile__name">
        <h3>{{ authStore.user?.name }}</h3>
        <p>@{{ authStore.user?.username }}</p>
      </div>
      <div class="profile__info">
        <span>
          <Icon name="location" :size="iconSize" />
          {{ authStore.user?.location }}
        </span>
        <span>
          <Icon name="chain" :size="iconSize" />
          <Link text :href="authStore.user?.website" target="_blank">{{
            authStore.user?.website?.replace(/^https?:\/\//, "")
          }}</Link>
        </span>
        <span>
          <Icon name="balloon" :size="iconSize" />
          Born {{ birthDate }}
        </span>
        <span>
          <Icon name="calendar" :size="iconSize" />
          Joined {{ joinDate }}
        </span>
      </div>
      <div class="profile__following">
        <span>
          <strong>{{ authStore.user?.totalFollowing }}</strong> Following
        </span>
        <span>
          <strong>{{ authStore.user?.totalFollowers }}</strong> Followers
        </span>
      </div>
    </section>
    <section>
      <TabRow>
        <TabHeader :to="{ name: 'profile' }">Tweets</TabHeader>
        <TabHeader :to="{ name: 'replies' }">Replies</TabHeader>
        <TabHeader :to="{ name: 'media' }">Media</TabHeader>
        <TabHeader :to="{ name: 'likes' }">Likes</TabHeader>
      </TabRow>
      <RouterView />
    </section>
  </main>
</template>

<style scoped lang="scss">
.profile {
  margin: 3.5rem 0 0 0;

  &__header {
    width: 40rem;
    & > div {
      backdrop-filter: blur(12px);
      width: inherit;
      position: fixed;
      z-index: 50;
      top: 0;
      display: flex;
      align-items: center;
      gap: 2rem;
      background-color: rgba($white, 0.85);
    }

    h2 {
      font-size: 1.3rem;
      font-weight: 700;
      line-height: 1.75rem;
    }

    svg {
      height: 1.35rem;
    }

    span {
      font-size: 0.9rem;
    }
  }

  &__banner-image {
    width: 100%;
    height: 15rem;
    object-fit: cover;
  }

  &__info {
    display: flex;
    gap: 0.5rem;
    font-size: 0.9rem;

    span {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }
  }

  &__content {
    padding: 0 1rem 1rem;
    position: relative;
  }

  &__profile-image {
    width: 133px;
    height: 133px;
    object-fit: cover;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 1rem;
    border: 3px solid $white;
    transform: translateY(-60%);
  }

  &__edit-profile {
    display: flex;
    justify-content: end;
    padding: 0.5rem 0 2.5rem;
  }

  &__following {
    display: flex;
    gap: 0.5rem;
    font-size: 0.9rem;
  }
}
</style>
