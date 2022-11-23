<script lang=ts>
    import { enhance } from "$app/forms";
</script>

<form method="POST" use:enhance>
    <input type="text" name="username">
    <input type="text" name="handle">
    <input type="text" name="password">
    <button type="submit">Sign up</button>
</form>