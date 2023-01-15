<script lang="ts">
  import Router, { push } from "svelte-spa-router";
  import LoginScreen from "./LoginScreen.svelte";
  import UserScreen from "./UserScreen.svelte";
  import ChatOverviewScreen from "./ChatOverviewScreen.svelte";
  import ChatScreen from "./ChatScreen.svelte";

  const routes = {
    "/": LoginScreen,
    "/user": UserScreen,
    "/chats": ChatOverviewScreen,
    "/chats/:id": ChatScreen
  };
</script>

<Router {routes} />

