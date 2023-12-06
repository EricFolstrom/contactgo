<template>
    <div class="contact-list-container">
        <div v-if="loading" class="loader">
            <a-spin size="large" />
        </div>
        <div v-else-if="contacts.length !== 0">
            <ContactTable 
                :contacts="contacts" 
                :totalContacts="totalContacts" 
                :currentPage="currentPage" 
                :contactPageSize="contactPageSize" 
                :finishedLoading="finishedLoading" 
                @navigate="handleNavigate"
                @relaod="loadContacts"
            />
        </div>
        <div v-else>
            <EmptyContactList />
        </div>
    </div>
</template>


<script lang="ts">
import axios from "axios";
import { Button } from 'ant-design-vue';
import ContactTable from "@/components/ContactTable.vue";
import EmptyContactList from "@/components/EmptyContactList.vue";
import { useToast } from "vue-toastification";

const toast = useToast();

export default {
    name: "contact-lits",
    data() {
        return {
            contacts: [],
            loading: true,
            totalContacts: 0,
            currentPage: 1,
            contactPageSize: 2,
            finishedLoading: false
        }
    },
    components: {Button, ContactTable, EmptyContactList},
    methods: {
        async loadContacts (page : number){
            const response = await axios.get("/contacts", {params: { limit: 2, page }});
            const contacts = response.data;
            this.contacts = contacts.data?.contacts || []
            this.finishedLoading = true;
            this.loading = false;
            this.totalContacts = contacts.data?.contacts?.totalPages;
            this.currentPage = contacts.data?.contacts?.totalPages;

        },
        async handleNavigate(pag: {pageSize: number, current: number}){
            
            await this.loadContacts(pag.current)
        },
    },
    async created() {
        const response = await axios.get("/contacts", {params: { limit: 2, page: 1  }});
        const contacts = response.data;

        console.log(contacts.data)

        this.loading = false;
        this.finishedLoading = true;
        this.totalContacts = contacts.data?.contactCount;
        this.currentPage = contacts.data?.currentPage;
        this.contactPageSize = 2;
        this.contacts = contacts.data?.contacts || []
    },
    mounted(){
        import("flowbite");
    }
}
</script>

<style>
    .contact-list-container{
        display: flex;
        justify-content: center;
        padding-top: 39px;
    }
</style>