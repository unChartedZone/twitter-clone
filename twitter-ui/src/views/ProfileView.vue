<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRoute, RouterView, RouterLink } from "vue-router";
import dayjs from "dayjs";
import { useAuthStore } from "@/stores/auth";
import { useUserProfile } from "@/hooks/useUserProfile";
import ProfileHeader from "@/components/profile/ProfileHeader.vue";
import ProfileEditor from "@/components/ProfileEditor.vue";
import LoadingIcon from "@/components/common/LoadingIcon.vue";
import Image from "@/components/common/Image.vue";

const authStore = useAuthStore();
const route = useRoute();
const iconSize = 1.2;
const {
  currentUser,
  fetchUserProfile,
  loading: profileLoading,
} = useUserProfile(route.params.username[0]);

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
    await fetchUserProfile(value[0]);
  }
);

function closeProfileEditor() {
  showProfileEditor.value = false;
}

function formatLink(link: string): string {
  return link.replace(/^https?:\/\//, "");
}
</script>

<template>
  <main class="profile">
    <div v-if="profileLoading === 'idle'">
      <LoadingIcon />
    </div>
    <div v-else>
      <ProfileHeader
        :name="currentUser?.name"
        :totalTweets="currentUser?.totalTweets"
      />
      <Image class="profile__banner-image" :src="currentUser?.bannerImage" />
      <section class="profile__content">
        <Image
          class="profile__profile-image"
          :src="currentUser?.profileImage"
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
        <div class="profile__name mb-2">
          <h3>{{ currentUser?.name }}</h3>
          <p>@{{ currentUser?.username }}</p>
        </div>
        <div class="profile__info mb-2">
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
          <RouterLink :to="`${currentUser?.username}/following`">
            <strong>{{ currentUser?.totalFollowing }}</strong>
            Following
          </RouterLink>
          <RouterLink :to="`${currentUser?.username}/followers`">
            <strong>{{ currentUser?.totalFollowers }}</strong>
            Followers
          </RouterLink>
        </div>
      </section>
    </div>
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

  &__banner-image {
    width: 40rem;
    height: 15rem;
    z-index: 1;
  }

  &__info {
    display: flex;
    gap: 0.45rem;
    font-size: 0.9rem;

    span {
      display: flex;
      align-items: center;
      gap: 0.15rem;
      height: 1.2rem;
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
    z-index: 20;
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
