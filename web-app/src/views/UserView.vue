<template>
  <table-lite
    :is-loading="table.isLoading"
    :columns="table.columns"
    :rows="table.rows"
    :total="table.totalRecordCount"
    :sortable="table.sortable"
    :messages="table.messages"
    @do-search="doSearch"
    @is-finished="table.isLoading = false"
  ></table-lite>
  <div v-if="!table.isLoading">
    <n-data-table :columns="nativeUIColumns" :data="table.rows" default-expand-all />
  </div>
</template>

<script>
import { h, defineComponent, reactive } from 'vue';
import { NTag } from 'naive-ui';
import UserService from '@/services/UserService';
import TableLite from '../components/TableLite.vue';

export default defineComponent({
  name: 'App',
  components: { TableLite },
  setup() {
    const createColumns = () => {
      return [
        {
          type: 'selection',
        },
        {
          type: 'expand',
          expandable: () => true,
          renderExpand: (rowData) => {
            // TODO get api
            UserService.getUserPublications(rowData.id).then((response) => {
              return JSON.stringify(response.data);
            });
          },
        },
        {
          title: 'Id',
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
      ];
    };

    // Table config
    const table = reactive({
      isLoading: false,
      columns: [
        {
          label: 'ID',
          field: 'id',
          title: 'ID',
          key: 'id',
          width: '3%',
          sortable: true,
          isKey: true,
        },
        {
          label: 'FirstName',
          field: 'firstName',
          title: 'FirstName',
          key: 'firstName',
          width: '10%',
          sortable: true,
        },
        {
          label: 'LastName',
          field: 'lastName',
          title: 'LastName',
          key: 'lastName',
          width: '10%',
          sortable: true,
        },
        {
          label: 'Email',
          field: 'email',
          title: 'Email',
          key: 'email',
          width: '15%',
          sortable: true,
        },
      ],
      rows: [],
      totalRecordCount: 0,
      sortable: {
        order: 'id',
        sort: 'asc',
      },
    });

    /**
     * Search Event
     */
    const doSearch = () => {
      table.isLoading = true;
      UserService.getAll().then((response) => {
        console.log({ response });
        table.rows = response.data;
        table.isLoading = false;
        table.totalRecordCount = response.data.length;
      });
    };

    // First get data
    doSearch();

    return {
      table,
      doSearch,
      nativeUIColumns: createColumns(),
    };
  },
});
</script>
