import PocketBase from 'pocketbase';
import { writable } from 'svelte/store';

export const pocketbase = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);

export const currentUser = writable(pocketbase.authStore.model);

pocketbase.authStore.onChange(() => {
    currentUser.set(pocketbase.authStore.model);
});
