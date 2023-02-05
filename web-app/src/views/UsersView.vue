<template>
  <n-card title="Users Page">
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
</template>

<script>
import { NButton } from 'naive-ui';
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
    const dataRef = ref([]);
    const loadingRef = ref(true);
    const columnsRef = ref(columns);

    onMounted(() => {
      query().then((data) => {
        dataRef.value = data.data;
        loadingRef.value = false;
      });
    });

    return {
      data: dataRef,
      columns: columnsRef,
      loading: loadingRef,
      rowKey(rowData) {
        return rowData.column1;
      },
    };
  },
});
</script>
