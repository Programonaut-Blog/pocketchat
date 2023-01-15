<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import ChatCard from "./components/ChatCard.svelte";
    import { currentUser, pocketbase, errorMessage } from "./lib/pocketbase";
  import type { ChatsResponse, UsersResponse } from "./types/pocketbase-types";

    let newUserEmail = "";

    let allChats: ChatsResponse[] = [];

function getChatWithUsers() {
    return pocketbase.collection('chats').getFullList<ChatsResponse>(200 ,{
        sort: 'created',
        expand: 'users',
        filter: `users ~ '${$currentUser.id}'`,
    });
}

onMount(async () => {
    allChats = await getChatWithUsers();

    pocketbase.collection('chats').subscribe('*', async (e) => {
        allChats = await getChatWithUsers();
    });
})

async function createChatWithUser() {
    try {
        const otherUser = await pocketbase.collection('users').getFirstListItem<UsersResponse>(`email = '${newUserEmail}'`);

        await pocketbase.collection('chats').create({
            users: [$currentUser.id, otherUser.id]
        });
    }
    catch (e) {
        errorMessage(e);
    }
}

onDestroy(() => {
    pocketbase.collection('chats').unsubscribe('*');
})
</script>

<div class="p-8">
    {#each allChats as chat}
        <a href="#/chats/{chat.id}">
            <ChatCard {chat} />
        </a>
    {/each}
    <div class="p-4 bg-gray-100 shadow rounded">
        <input type="email" bind:value={newUserEmail}/>
        <button class="bg-gray-200 rounded p-2 hover:bg-gray-300" on:click={createChatWithUser}>Create chat</button>
    </div>
</div>