<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, RouterView } from "vue-router";
import dayjs from "dayjs";
import { useAuthStore } from "@/stores/auth";
import ProfileEditor from "@/components/ProfileEditor.vue";
import { fetchUserByUsername } from "@/api/endpoints";
import type { BaseUser } from "@/models/User";
import type { LoadingState } from "@/types/LoadingState";
import Image from "@/components/common/Image.vue";

const authStore = useAuthStore();
const route = useRoute();
const currentUser = ref<BaseUser | undefined>();
const iconSize = 1.2;
const loading = ref<LoadingState>("idle");

const showProfileEditor = ref<boolean>(false);

const birthDate = computed(() =>
  dayjs(currentUser.value?.birthDate).format("MMM D, YYYY")
);

const joinDate = computed(() =>
  dayjs(currentUser.value?.joinDate).format("MMMM YYYY")
);

// Watch for route change and refresh profile user
watch(
  () => route.params.username,
  async (value, _oldValue) => {
    await fetchUserProfile();
  }
);

onMounted(async () => {
  await fetchUserProfile();
});

async function fetchUserProfile() {
  loading.value = "idle";
  try {
    currentUser.value = await fetchUserByUsername(route.params.username[0]);
    loading.value = "resolved";
  } catch (e) {
    loading.value = "rejected";
  }
}

function closeProfileEditor() {
  showProfileEditor.value = false;
}

function formatLink(link: string): string {
  return link.replace(/^https?:\/\//, "");
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
          <h2>{{ currentUser?.name }}</h2>
          <span>3 tweets</span>
        </div>
      </div>
    </header>
    <Image
      class="profile__banner-image"
      :src="currentUser?.bannerImage ?? '/images/default-banner.avif'"
    />
    <section class="profile__content">
      <Image
        class="profile__profile-image"
        :src="currentUser?.profileImage ?? '/images/default-pfp.png'"
      />
      <div class="profile__edit-profile">
        <Modal v-model="showProfileEditor" @on-close="closeProfileEditor">
          <template v-slot:activator="{ onClick }">
            <div class="edit-profile-activator">
              <Button
                v-if="currentUser?.id == authStore.user?.id"
                @click="onClick"
                outline
                :size="1"
              >
                Edit profile
              </Button>
            </div>
          </template>
          <ProfileEditor @onClose="closeProfileEditor" />
        </Modal>
      </div>
      <div class="profile__name">
        <h3>{{ currentUser?.name }}</h3>
        <p>@{{ currentUser?.username }}</p>
      </div>
      <div class="profile__info">
        <span v-if="currentUser?.location">
          <Icon name="location" :size="iconSize" />
          {{ currentUser?.location }}
        </span>
        <span v-if="currentUser?.website">
          <Icon name="chain" :size="iconSize" />
          <Link text :href="authStore.user?.website" target="_blank">
            {{ formatLink(currentUser?.website) }}
          </Link>
        </span>
        <span v-if="currentUser?.birthDate">
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
          <strong>{{ currentUser?.totalFollowing }}</strong>
          Following
        </span>
        <span>
          <strong>{{ currentUser?.totalFollowers }}</strong>
          Followers
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
    position: relative;
    width: 40rem;

    & > div {
      backdrop-filter: blur(12px);
      width: inherit;
      position: fixed;
      z-index: 25;
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
    width: 40rem;
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

.edit-profile-activator {
  height: 2rem;
}
</style>
