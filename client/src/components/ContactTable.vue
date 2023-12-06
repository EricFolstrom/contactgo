<template>
    <div class="table-container">
        <div class="top-action-container" style="margin-bottom: 16px">
            <div class="top-delete-action">
                <a-popconfirm title="Vous êtes sûr de vouloir supprimer?" @confirm="start" ok-text="Oui"
                    cancel-text="Non">
                    <a-button v-if="hasSelected" type="primary" :disabled="!hasSelected"
                        :loading="!normalizedState.finishedLoading">
                        Supprimer
                    </a-button>
                </a-popconfirm>
                <span style="margin-left: 8px">
                    <template v-if="hasSelected">
                        {{ `${normalizedState.selectedRowKeys.length} contact${normalizedState.selectedRowKeys.length > 1 ?
                            "s" : ""}
                                                selectioné${normalizedState.selectedRowKeys.length > 1 ? "s" : ""}` }}
                    </template>
                </span>
            </div>

            <div class="top-create-action">
                <router-link :to="{ name: 'create' }">
                    <a-button type="primary">
                        Créer
                    </a-button>
                </router-link>
            </div>
        </div>
        <a-table bordered :data-source="normalizedData" :columns="columns" size="large"
            :row-selection="{ selectedRowKeys: normalizedState.selectedRowKeys, onChange: onSelectChange }"
            :pagination="pagination" @change="handleTableChange" :custom-row="customRow">
            <template #bodyCell="{ column, text, record }">
                <template v-if="column.dataIndex === 'edit'">
                    <router-link :to="{ name: 'edit', params: { contactId: record.key } }">
                        <EditOutlined />
                    </router-link>
                </template>
                <template v-if="column.dataIndex === 'delete'">
                    <a-popconfirm title="Vous êtes sûr de vouloir supprimer?" @confirm="onDelete(record.key)" ok-text="Oui"
                        cancel-text="Non">
                        <DeleteOutlined :style="{ fontSize: '16px', color: 'red' }" />
                    </a-popconfirm>
                </template>
            </template>
        </a-table>
    </div>
</template>
<script lang="ts" setup>
import { computed, reactive, ref } from 'vue';
import type { TableProps } from 'ant-design-vue';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import { useRouter, useRoute } from 'vue-router'
import axios from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();

const router = useRouter()
const emit = defineEmits(['navigate', 'relaod'])
const props = defineProps(['contacts', 'contactPageSize', 'currentPage', 'totalContacts', 'finishedLoading'])

type Key = string | number;

interface DataType {
    key: Key;
    nom: string;
    prenom: string;
    telephone: string;
    email: string;
}

const columns = [
    {
        title: 'Nom',
        dataIndex: 'nom',
    },
    {
        title: 'Prenom',
        dataIndex: 'prenom',
    },
    {
        title: 'Téléphone',
        dataIndex: 'telephone',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        width: '35%',
    },
    {
        title: 'Modifier',
        dataIndex: 'edit',
    }, {
        title: 'Supprimer',
        dataIndex: 'delete',
    },
];


const normalizedData = computed(() => {
    const data: DataType[] = [];
    for (const contact of props.contacts) {
        data.push({
            key: contact._id,
            nom: contact.nom,
            prenom: contact.prenom,
            telephone: contact.telephone,
            email: contact.email
        });
    }
    return data;
})



const normalizedState = computed(() => {
    const state = reactive<{
        selectedRowKeys: Key[];
        finishedLoading: boolean;
    }>({
        selectedRowKeys: [], // Check here to configure the default column
        finishedLoading: props.finishedLoading,
    });

    return state;
})

const current = ref(props.currentPage);
const total = ref(props.totalContacts);
const pageSize = ref(props.contactPageSize);

const pagination = computed(() => ({
    total: props.totalContacts < total.value ? props.totalContacts : total.value,
    current: current.value,
    pageSize: pageSize.value,
}));

const hasSelected = computed(() => normalizedState.value.selectedRowKeys.length > 0);

const start = () => {
    normalizedState.value.finishedLoading = true;
    // ajax request after empty completing
    handleDelete(normalizedState.value.selectedRowKeys)
};

async function handleDelete(keys: string | Array<string> | Key[]) {

    const contactIds = typeof keys == "string" ? [keys] : keys
    const removedItemsNumber = typeof keys == "string" ? 1 : keys.length

    const response = await axios.delete("/contacts", { data: { contactIds: contactIds } });

    if (response.data.statusCode == 200) {
        toast.success("Contact supprimé avec succès", {
            timeout: 2000
        });

        normalizedState.value.finishedLoading = true;
        normalizedState.value.selectedRowKeys = [];

        emit("relaod");
        total.value -= removedItemsNumber;
    } else {
        toast.error("Une erreur s'est produite", {
            timeout: 3000
        });
    }

}

const onSelectChange = (selectedRowKeys: Key[]) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    normalizedState.value.selectedRowKeys = selectedRowKeys;
};

const onDelete = async (key: any) => {
    handleDelete(key)
}

const edit = (key: any) => {

}

const handleTableChange: TableProps['onChange'] = (
    pag,
    filters: any,
    sorter: any,
) => {

    current.value = pag?.current || current.value
    pageSize.value = pag?.pageSize || pageSize.value

    emit("navigate", pag)
};

const customRow = (record: any) => {
    console.log(record)
    return {
        onClick: (event: any) => {
            if (event.target.nodeName == "TD") {
                router.push({
                    name: 'show',
                    params: {
                        contactId: record.key
                    }
                })
            }
        },
    };
}


</script>

<style>
.top-action-container {
    min-height: 55px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.table-container table {
    width: 887px;
    border: 0.1px solid #c6c6c6;
}

@media screen and (max-width: 900px) {
    .table-container table {
        width: 100%;
        border: 0.1px solid #c6c6c6;
    }

    .table-container{
        overflow: scroll;
        width: 100vw;
    }
}
</style>
  
  