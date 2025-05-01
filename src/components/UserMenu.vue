<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
            <button><i class="pi pi-user text-[1.5rem] hover:cursor-pointer text-black group-hover:text-orange-400 transition-colors duration-300"></i></button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56 z-50">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuItem>Billing</DropdownMenuItem>
      <DropdownMenuItem>Team</DropdownMenuItem>
      <DropdownMenuItem>Subscription</DropdownMenuItem>
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
</script>
