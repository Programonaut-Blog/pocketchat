<script lang="ts">
  import type { ChatsResponse } from "../types/pocketbase-types";
  export let chat: ChatsResponse;

  function getChatUserNames () {
    let users = chat.expand.users;
    return users.map((user) => user.email).join(", ");
  }

  const chatUserNames = getChatUserNames();
</script>

<div class="p-4 bg-gray-100 shadow rounded mb-2">
    <h2 class="text-large font-semibold">Chat with: {chatUserNames}</h2>
</div>
