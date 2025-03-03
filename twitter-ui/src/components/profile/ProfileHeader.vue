<script setup lang="ts">
import { ref, computed } from "vue";
import dayjs from "dayjs";
import { RouterLink } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import type { User } from "@/models/User";
import Button from "../common/Button.vue";
import Icon from "../icons/Icon.vue";
import Link from "@/components/common/Link.vue";
import Image from "../common/Image.vue";
import Modal from "../common/Modal.vue";
import ProfileEditor from "../ProfileEditor.vue";
import FollowButton from "./FollowButton.vue";

interface ProfileHeaderProps {
  user: User;
}

const props = defineProps<ProfileHeaderProps>();
const authStore = useAuthStore();
const showProfileEditor = ref<boolean>(false);
const showFollowButton = ref<boolean>(true);

const birthDate = computed(() =>
  dayjs(props.user.birthDate).format("MMM D, YYYY")
);

const joinDate = computed(() => dayjs(props.user.joinDate).format("MMMM YYYY"));

function closeProfileEditor() {
  showProfileEditor.value = false;
}

function formatLink(link: string): string {
  return link.replace(/^https?:\/\//, "");
}

function onFollow() {
  showFollowButton.value = false;
}
</script>

<template>
  <Image class="profile__banner-image" :src="user.bannerImage" />
  <section class="profile__content">
    <Image class="profile__profile-image" :src="user.profileImage" />
    <div class="profile__edit-profile">
      <Modal v-model="showProfileEditor" @on-close="closeProfileEditor">
        <template v-slot:activator="{ onClick }">
          <div class="edit-profile-activator">
            <Button
              variant="outline"
              v-if="user.id == authStore.user?.id"
              @click="onClick"
            >
              Edit profile
            </Button>
          </div>
        </template>
        <ProfileEditor @onClose="closeProfileEditor" />
      </Modal>
      <FollowButton
        v-if="
          user.id !== authStore.user?.id &&
          !user.isFollowing &&
          showFollowButton
        "
        :userId="user.id"
        @onFollow="onFollow"
      />
    </div>
    <div class="profile__name">
      <h3>{{ user.name }}</h3>
      <p>@{{ user.username }}</p>
    </div>
    <div class="py-3">
      <p>{{ user.bio }}</p>
    </div>
    <div class="profile__info mb-2">
      <span v-if="user.location">
        <Icon variant="location" />
        {{ user.location }}
      </span>
      <span v-if="user.website">
        <Icon variant="chain" />
        <Link text :href="authStore.user?.website" target="_blank">
          {{ formatLink(user.website) }}
        </Link>
      </span>
      <span v-if="user.birthDate">
        <Icon variant="balloon" />
        Born {{ birthDate }}
      </span>
      <span>
        <Icon variant="calendar" />
        Joined {{ joinDate }}
      </span>
    </div>
    <div class="profile__following">
      <RouterLink :to="`${user.username}/following`">
        <strong>{{ user.totalFollowing }}</strong>
        Following
      </RouterLink>
      <RouterLink :to="`${user.username}/followers`">
        <strong>{{ user.totalFollowers }}</strong>
        Followers
      </RouterLink>
    </div>
  </section>
</template>

<style scoped lang="scss">
.profile {
  &__banner-image {
    // width: 40rem;
    height: 15rem;
    z-index: 1;
  }

  &__info {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
    font-size: 0.9rem;

    span {
      display: flex;
      align-items: center;
      gap: 0.15rem;
      height: 1.2rem;
      color: $gray-300;
      fill: $gray-300;
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
    z-index: 1;
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

    a {
      &:hover {
        text-decoration: underline;
      }
    }
  }
}

.edit-profile-activator {
  height: 2rem;
}
</style>
