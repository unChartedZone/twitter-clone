<template>
  <aside class="h-screen py-4 pr-8">
    <TwitterLogo class="h-8 mb-4 fill-current" />
    <ul class="space-y-2 my-2">
      <li class="list__item">
        <a href="#" class="flex items-center">
          <HomeIcon class="w-6 mr-2" />
          Home
        </a>
      </li>
      <li class="list__item">
        <a href="#" class="flex items-center">
          <PoundIcon class="w-6 mr-2" />
          Explore
        </a>
      </li>
      <li class="list__item">
        <a href="#" class="flex items-center">
          <BellIcon class="w-6 mr-2" />
          Notifications
        </a>
      </li>
      <li class="list__item">
        <a href="#" class="flex items-center">
          <MessageIcon class="w-6 mr-2" />
          Messages
        </a>
      </li>
      <li class="list__item">
        <a href="#" class="flex items-center">
          <BookmarkIcon class="w-6 mr-2" />
          Bookmarks
        </a>
      </li>
      <li class="list__item">
        <a href="#" class="flex items-center">
          <ListIcon class="w-6 mr-2" />
          Lists
        </a>
      </li>
      <li class="list__item">
        <a href="#" class="flex items-center">
          <PersonIcon class="w-6 mr-2" />
          Profile
        </a>
      </li>
      <li class="list__item">
        <a href="#" class="flex items-center">
          <MoreIcon class="w-6 mr-2" />
          More
        </a>
      </li>
    </ul>
    <v-button block>Tweet</v-button>
    <div class="flex justify-between">
      <div class="h-14 w-14 bg-red-600 rounded-full"></div>
      <div>
        <h3>Christian Valdez</h3>
        <p>@unchartedzones</p>
      </div>
      <EllipsisIcon class="w-4" />
    </div>
  </aside>
</template>

<script lang="ts">
import Vue from 'vue';

import TwitterLogo from '@/assets/svg/bird.svg';
import HomeIcon from '@/assets/svg/home.svg';
import PoundIcon from '@/assets/svg/pound.svg';
import BellIcon from '@/assets/svg/bell.svg';
import MessageIcon from '@/assets/svg/message.svg';
import BookmarkIcon from '@/assets/svg/bookmark.svg';
import ListIcon from '@/assets/svg/list.svg';
import PersonIcon from '@/assets/svg/person.svg';
import MoreIcon from '@/assets/svg/more.svg';
import EllipsisIcon from '@/assets/svg/ellipsis.svg';

export default Vue.extend({
  components: {
    TwitterLogo,
    HomeIcon,
    PoundIcon,
    BellIcon,
    MessageIcon,
    BookmarkIcon,
    ListIcon,
    PersonIcon,
    MoreIcon,
    EllipsisIcon,
  },
});
</script>

<style lang="scss" scoped>
.list__item {
  @apply text-xl;
  @apply py-1;

  a {
    @apply px-3;
    @apply py-2;
    @apply rounded-full;
    @apply cursor-pointer;
    &:hover {
      @apply bg-gray-200;
    }
  }
}
</style>
