<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
            <button><i class="pi pi-user text-[1.5rem] hover:cursor-pointer text-black group-hover:text-orange-400 transition-colors duration-300"></i></button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56 z-50">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="profileAuthenticated">Profile</DropdownMenuItem>
      <DropdownMenuItem>My Clubs</DropdownMenuItem>
      <DropdownMenuItem>My Events</DropdownMenuItem>
      <DropdownMenuItem>Notifications</DropdownMenuItem>
      <DropdownMenuItem>Settings</DropdownMenuItem>
      <DropdownMenuItem>Support / Help / FAQ</DropdownMenuItem>
      <!-- <DropdownMenuItem>Subscriptions></DropdownMenuItem> -->
      <DropdownMenuItem @click="logOut">Log Out</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { useAuth } from '../composables/useAuth';
import router from '../router';
import { computed, onBeforeMount } from 'vue'

const auth = useAuth();
const { isAuthenticated } = auth;

const logOut = () => {
  auth.logout(router);
}

const profileAuthenticated = () => {
  if(isAuthenticated.value == false) {
    return router.push('/login');
  }
}


</script>
