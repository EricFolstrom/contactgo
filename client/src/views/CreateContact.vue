<template>
    <div class="create-container">
        <div class="top-create-container" style="margin-bottom: 16px">
            <div class="top-create-action">
                <router-link :to="{ name: 'home' }">
                    <a-button type="primary">
                        Retour
                    </a-button>
                </router-link>
            </div>
        </div>

        <div class="form-container">
            <a-form ref="formRef" :model="formState" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-form-item class="from-item" ref="nom" label="Nom" name="nom">
                    <a-input v-model:value="formState.nom" />
                </a-form-item>
                <a-form-item class="from-item" ref="prenom" label="Prenom" name="prenom">
                    <a-input v-model:value="formState.prenom" />
                </a-form-item>
                <a-form-item class="from-item" ref="telephone" label="Téléphone" name="telephone">
                    <a-input v-model:value="formState.telephone" />
                </a-form-item>
                <a-form-item class="from-item" ref="email" label="Email" name="email">
                    <a-input v-model:value="formState.email" />
                </a-form-item>
                <a-form-item class="from-footer" :wrapper-col="{ span: 14, offset: 18 }">
                    <a-button style="margin-left: 10px" type="primary" @click="onSubmit">Créer</a-button>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>


<script setup lang="ts">
import { reactive, ref, toRaw } from 'vue';
import type { UnwrapRef } from 'vue';
import type { Rule } from 'ant-design-vue/es/form';
import axios from "axios";
import { useToast } from "vue-toastification";
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()

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

const toast = useToast();

const validateEmail = async (_rule: Rule, value: string) => {
    const re =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (value === '') {
        return Promise.reject('Veuillez saisir le Email');
    } else if (!value.match(re)?.length) {
        return Promise.reject("Email invalid!");
    } else {
        return Promise.resolve();
    }
};

const rules: Record<string, Rule[]> = {
    nom: [
        { required: true, message: 'Veuillez saisir le Nom', trigger: 'change' },
        { min: 2, message: "La longueur doit être d'au moins 2 caractères", trigger: 'blur' },
    ],
    prenom: [
        { required: true, message: 'Veuillez saisir le Prénom', trigger: 'change' },
        { min: 2, message: "La longueur doit être d'au moins 2 caractères", trigger: 'blur' },
    ],
    telephone: [
        { required: true, message: 'Veuillez saisir le Téléphone', trigger: 'change' },
        { min: 8, message: "La longueur doit être d'au moins 8 caractères", trigger: 'blur' },
    ],
    email: [
        // { required: true, message: 'Veuillez saisir le Email', trigger: 'change' },
        { required: true, validator: validateEmail, trigger: 'blur' },
    ],
};

const onSubmit = () => {
    formRef.value
        .validate()
        .then(async () => {
            console.log('values', formState, toRaw(formState));
            const contact = toRaw(formState);

            const res = await axios.post("/contacts", { ...contact })
            console.log(res)
            if(res.data.statusCode == 200){
                toast.success("Contact créé avec succès", {
                    timeout: 2000
                });
                resetForm();
            }else if(res.data.error?.indexOf("email already exists") !== -1){
                toast.error("l'email existe déjà", {
                    timeout: 3000
                });
            }
        })
        .catch((error: any) => {
            console.log('error', error);
        });
};
const resetForm = () => {
    formRef.value.resetFields();
};
</script>

<style>
.create-container {
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

@media screen and (max-width: 900px) {

    div.create-container{
        overflow: scroll;
        width: 100vw;
    }
    div.form-container, div.from-item > div{
        width: 100%;
    }

    div.form-container{
        padding: 33px 11px;
    }

    .from-footer > div > div{
        margin: 0;
    }
}


</style>