<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Icon } from '@iconify/vue'
import { useColorMode } from '@vueuse/core'

const mode = useColorMode({
  selector: 'html', // or 'body' if you prefer
  attribute: 'class',
  modes: {
    light: 'light',
    dark: 'dark',
    auto: 'auto',
  },
})

console.log(mode.value)
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline" class="relative rounded-full w-10 h-10 text-[hsl(var(--muted-foreground))] hover:cursor-pointer">
        <Icon icon="radix-icons:moon" class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-[hsl(var(--foreground))]" />
        <Icon icon="radix-icons:sun" class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-[hsl(var(--foreground))]" />
        <span class="sr-only">Toggle theme</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="text-[hsl(var(--muted-foreground))]">
      <DropdownMenuItem @click="mode = 'light'" class="text-[hsl(var(--secondary-foreground))] hover:cursor-pointer">
        Light
      </DropdownMenuItem>
      <DropdownMenuItem @click="mode = 'dark'" class="text-[hsl(var(--secondary-foreground))] hover:cursor-pointer">
        Dark
      </DropdownMenuItem>
      <DropdownMenuItem @click="mode = 'auto'" class="text-[hsl(var(--secondary-foreground))] hover:cursor-pointer">
        System
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
