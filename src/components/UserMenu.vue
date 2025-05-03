<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
            <button><i class="pi pi-user text-[1.5rem] hover:cursor-pointer text-black group-hover:text-orange-400 transition-colors duration-300"></i></button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56 z-50">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="profileAuthenticated" class="hover:cursor-pointer">Profile</DropdownMenuItem>
      <DropdownMenuItem class="hover:cursor-pointer">My Clubs</DropdownMenuItem>
      <DropdownMenuItem class="hover:cursor-pointer">My Events</DropdownMenuItem>
      <DropdownMenuItem class="hover:cursor-pointer">Notifications</DropdownMenuItem>
      <DropdownMenuItem class="hover:cursor-pointer">Settings</DropdownMenuItem>
      <DropdownMenuItem class="hover:cursor-pointer">Support / Help / FAQ</DropdownMenuItem>
      <DropdownMenuItem class="hover:cursor-pointer">Subscriptions></DropdownMenuItem>
      <DropdownMenuItem @click="logOut" class="hover:cursor-pointer">Log Out</DropdownMenuItem>
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
