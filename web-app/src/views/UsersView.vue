<template>
  <n-card title="Users Page">
    <n-button type="primary" class="create-button" @click="showModal = true">
      Create
      <template #icon>
        <n-icon><CreateIcon /> </n-icon>
      </template>
    </n-button>
    <n-data-table
      ref="table"
      remote
      :single-line="false"
      :columns="columns"
      :data="data"
      :cascade="false"
      :loading="loading"
      :row-key="rowKey"
      allow-checking-not-loaded
    />
  </n-card>

  <n-modal
    v-model:show="showModal"
    preset="dialog"
    title="Create User"
    positive-text="Submit"
    negative-text="Cancel"
    @positive-click="handleCreate({ firstName, lastName, email })"
    @negative-click="cancelCallback()"
  >
    <n-space vertical>
      <span> First Name: </span>
      <n-input v-model:value="firstName" type="text" placeholder="First name" />
      <span> Last Name: </span>
      <n-input v-model:value="lastName" type="text" placeholder="Last name" />
      <span> Email: </span>
      <n-input v-model:value="email" type="text" placeholder="Email" />
    </n-space>
  </n-modal>
</template>

<script>
import { NButton } from 'naive-ui';
import { toast } from 'vue3-toastify';
import { defineComponent, h, ref, onMounted } from 'vue';
import UserPublicationService from '@/services/UserPublicationService';
import DataTable from '../components/DataTable.vue';
import router from '@/router';

const columns = [
  {
    type: 'expand',
    expandable: () => true,
    renderExpand: (rowData) => {
      return h(DataTable, { userId: rowData.id });
    },
  },
  {
    title: '#',
    key: 'id',
    render: (_, index) => {
      return `${index + 1}`;
    },
  },
  {
    title: 'First Name',
    key: 'firstName',
  },
  {
    title: 'Last Name',
    key: 'lastName',
  },
  {
    title: 'Email',
    key: 'email',
  },
  {
    title: 'Action',
    key: 'actions',
    render(row) {
      return h(
        NButton,
        {
          size: 'small',
          onClick: () => goToUserPage(row),
        },
        { default: () => 'View' },
      );
    },
  },
];

function goToUserPage(row) {
  router.push({ path: `/users/${row.id}` });
}

function query() {
  return UserPublicationService.getAll();
}

export default defineComponent({
  setup() {
    const showModalRef = ref(false);
    const dataRef = ref([]);
    const loadingRef = ref(true);
    const columnsRef = ref(columns);
    const firstNameRef = ref('');
    const lastNameRef = ref('');
    const emailRef = ref('');

    onMounted(async () => {
      await refreshData();
    });

    async function refreshData() {
      const { data } = await query();
      dataRef.value = data;
      loadingRef.value = false;
    }

    async function handleCreate(data) {
      await UserPublicationService.create(data);
      toast.success('User Created Successfully');
      await refreshData();
    }

    async function cancelCallback() {
      await refreshData();
      firstNameRef.value = '';
      lastNameRef.value = '';
      emailRef.value = '';
      showModalRef.value = false;
    }

    return {
      firstName: firstNameRef,
      lastName: lastNameRef,
      email: emailRef,
      showModal: showModalRef,
      data: dataRef,
      columns: columnsRef,
      loading: loadingRef,
      cancelCallback,
      handleCreate,
      rowKey(rowData) {
        return rowData.column1;
      },
    };
  },
});
</script>

<style scoped>
.create-button {
  margin-bottom: 10px !important;
}
</style>
