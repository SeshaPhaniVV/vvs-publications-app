<template>
  <n-card title="User Publications Details">
    <n-data-table
      ref="publicatons-table"
      remote
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
import { defineComponent, ref, onMounted } from 'vue';
import UserService from '@/services/UserService';

const columns = [
  {
    title: 'Id',
    key: 'id',
    render: (_, index) => {
      return `${index + 1}`;
    },
  },
  {
    title: 'Title',
    key: 'title',
  },
  {
    title: 'Year',
    key: 'year',
  },
];

function query(id) {
  return UserService.getUserPublications(id);
}

export default defineComponent({
  props: {
    userId: {
      type: Number,
      default: 1,
    },
  },
  setup(props) {
    const dataRef = ref([]);
    const loadingRef = ref(true);
    const columnsRef = ref(columns);

    onMounted(() => {
      query(props.userId).then((data) => {
        dataRef.value = data.data.publications;
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
