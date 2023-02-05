<template>
  <n-card title="User Publications Details" size="huge">
    <n-descriptions label-placement="top" title="User Details">
      <n-descriptions-item>
        <template #label> User Name </template>
        {{ userDetails.firstName }} {{ userDetails.lastName }}
      </n-descriptions-item>
      <n-descriptions-item label="Email"> {{ userDetails.email }} </n-descriptions-item>
    </n-descriptions>
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
    const userDataRef = ref([]);
    const loadingRef = ref(true);
    const columnsRef = ref(columns);

    onMounted(() => {
      query(props.userId).then((data) => {
        userDataRef.value = data.data.user;
        dataRef.value = data.data.publications;
        loadingRef.value = false;
      });
    });

    return {
      userDetails: userDataRef,
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
