<template>
    <div style="text-align: center;">Aucun contact</div>
    <div class="top-create-action">
        <router-link :to="{ name: 'create' }">
            <a-button type="primary">
                Créer
            </a-button>
        </router-link>
    </div>
</template>


<script lang="ts">
export default {
    name: "empty-contact-list",
    data() {
        return {}
    }
}
</script>

<style scoped>

button {
    width: 200px;
    margin-top: 31px;
    padding: 12px;
    height: 44px;
}

</style>