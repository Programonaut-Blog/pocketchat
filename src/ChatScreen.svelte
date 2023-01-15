<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import MessageCard from "./components/MessageCard.svelte";
  import { currentUser, pocketbase, errorMessage } from "./lib/pocketbase";
  import type { MessagesResponse } from "./types/pocketbase-types";

  export let params: { id: string } = { id: "" };
  let chatId = params.id;

  let allMessages: MessagesResponse[] = [];
  let newMessage: string = "";

  function getAllMessages() {
    return pocketbase.collection("messages").getFullList<MessagesResponse>(200, {
      sort: "created",
      filter: `chat_id = '${chatId}'`,
    });
  }

  onMount(async () => {
     allMessages = await getAllMessages();

    pocketbase.collection("messages").subscribe("*", async (e) => {
      allMessages = await getAllMessages();
    });
  });

  async function sendMessage() {
    try {
      await pocketbase.collection("messages").create({
        chat_id: chatId,
        author_id: $currentUser.id,
        content: newMessage,
      });
    } catch (e) {
      errorMessage(e);
    }
  }

  onDestroy(() => {
    pocketbase.collection("messages").unsubscribe("*");
  });
</script>

<div class="flex flex-col space-y-1 p-2">
  {#each allMessages as message}
    <MessageCard own={message.author_id === $currentUser.id}>
      {message.content}
    </MessageCard>
  {/each}
</div>

<div class="absolute bottom-0 flex w-full space-x-4">
  <input bind:value={newMessage} type="text" placeholder="Message" class="flex-1" />
  <button on:click={sendMessage} class="bg-gray-200 rounded p-2 hover:bg-gray-300">Send</button>
</div>
