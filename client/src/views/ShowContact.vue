<template>
    <div class="show-container">
        <div class="top-show-container" style="margin-bottom: 16px">
            <div class="top-create-action">
                <router-link :to="{ name: 'home' }">
                    <a-button type="primary">
                        Retour
                    </a-button>
                </router-link>
            </div>
        </div>

        <div class="form-container">
            <a-form ref="formRef" :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-form-item class="from-item" ref="nom" label="Nom" name="nom">
                    <a-input disabled="true" v-model:value="formState.nom" />
                </a-form-item> 
                <a-form-item class="from-item" ref="prenom" label="Prenom" name="prenom">
                    <a-input disabled="true" v-model:value="formState.prenom" />
                </a-form-item>
                <a-form-item class="from-item" ref="telephone" label="Téléphone" name="telephone">
                    <a-input disabled="true" v-model:value="formState.telephone" />
                </a-form-item>
                <a-form-item class="from-item" ref="email" label="Email" name="email">
                    <a-input disabled="true" v-model:value="formState.email" />
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>


<script setup lang="ts">
import { onMounted, reactive, ref, toRaw } from 'vue';
import type { UnwrapRef } from 'vue';
import axios from "axios";
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

interface FormState {
    nom: string;
    prenom: string;
    telephone: string;
    email: string;
}
const formRef = ref();
const labelCol = { span: 5 };
const wrapperCol = { span: 13 };
const formState: UnwrapRef<FormState> = reactive({
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
});

onMounted(async () => {
    const res = await axios.get("/contacts/" + route.params.contactId, )
    const contact = res.data
    if (res.data.statusCode == 200) {
        formState.nom = contact.data.nom
        formState.prenom = contact.data.prenom
        formState.email = contact.data.email
        formState.telephone = contact.data.telephone
        
    } else if (res.data.error?.indexOf("email already exists") !== -1) {
        
    }
})
</script>

<style scoped>
.show-container {
    width: 1007px;
    margin: auto;
    padding: 22px;
    margin-top: 22px;
}

.form-container {
    border: 0.1px solid #c6c6c6;
    width: 614px;
    margin: auto;
    padding: 33px 2px;
}

.from-item>div {
    display: flex;
    justify-content: center;
    width: 600px;
    margin: auto;
}

.from-item label {
    width: 100%;
}

.from-item input[disabled] {
    color: black;
    cursor: pointer;
}

</style>