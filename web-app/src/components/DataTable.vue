<template>
  <n-card title="User Publications Details">
    <n-space>
      <n-button type="primary" class="create-button" @click="showModal = true">
        Create
        <template #icon>
          <n-icon><CreateIcon /> </n-icon>
        </template>
      </n-button>
      <n-button
        v-if="selectedRows.length > 0"
        strong
        secondary
        type="error"
        class="create-button"
        @click="showBulkDeleteModal = true"
      >
        Bulk Delete
        <template #icon>
          <n-icon><DeleteIcon /> </n-icon>
        </template>
      </n-button>
    </n-space>
    <n-data-table
      ref="publicatons-table"
      remote
      :columns="columns"
      :data="data"
      :cascade="false"
      :loading="loading"
      :row-key="rowKey"
      @update:checked-row-keys="handleCheck"
    />
  </n-card>
  <n-modal
    v-model:show="showBulkDeleteModal"
    preset="dialog"
    title="Are you sure?"
    positive-text="OK"
    negative-text="Cancel"
    @positive-click="handleBulkDelete(selectedRows)"
    @negative-click="cancelCallback(userData.id)"
  />
  <n-modal
    v-model:show="showModal"
    preset="dialog"
    title="Update the publication details"
    positive-text="Submit"
    negative-text="Cancel"
    @positive-click="updatePublication(curId, { title, year })"
    @negative-click="cancelCallback(curId)"
  >
    <n-space vertical>
      <span> Title: </span>
      <n-input v-model:value="title" type="text" placeholder="Title" />
      <span> Year: </span>
      <n-input v-model:value="year" type="text" placeholder="Year" />
    </n-space>
  </n-modal>
</template>

<script>
import { defineComponent, ref, h, onMounted } from 'vue';
import { NButton } from 'naive-ui';
import { toast } from 'vue3-toastify';
import UserPublicationService from '@/services/UserPublicationService';

function query(id) {
  return UserPublicationService.getUserPublications(id);
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
    const showModalRef = ref(false);
    const showBulkDeleteModalRef = ref(false);
    const titleRef = ref('');
    const yearRef = ref();
    const curIdRef = ref();
    const rowsRef = ref([]);

    async function updateUser(userId) {
      const { data } = await query(userId);
      dataRef.value = data.publications;
      loadingRef.value = false;
    }

    function handleCheck(rowKeys) {
      console.log({ rowKeys });
      rowsRef.value = [...rowKeys];
    }

    async function deletePublication(row) {
      await UserPublicationService.deletePublication(row.id);
      loadingRef.value = true;
      await updateUser(props.userId);
      toast.error('Publication Deleted Successfully');
    }

    async function cancelCallback() {
      curIdRef.value = null;
      titleRef.value = '';
      yearRef.value = null;
      showBulkDeleteModalRef.value = false;
      await updateUser(props.userId);
    }

    async function handleBulkDelete(rows) {
      await UserPublicationService.bulkDeletePublications(rows);
      toast.error(`Successfully deleted ${rows.length} publications`);
      rowsRef.value = [];
      showBulkDeleteModalRef.value = false;
      await updateUser(props.userId);
    }

    function showUpdateModal(row) {
      showModalRef.value = true;
      curIdRef.value = row.id;
      titleRef.value = row.title;
      yearRef.value = row.year;
    }

    async function updatePublication(id, data) {
      if (!id) {
        await UserPublicationService.createPublication(props.userId, data);
      } else {
        await UserPublicationService.updatePublication(id, data);
      }
      loadingRef.value = true;
      curIdRef.value = null;
      titleRef.value = '';
      yearRef.value = null;
      await updateUser(props.userId);
      toast.success('Publication Updated Successfully');
    }

    const columns = [
      {
        type: 'selection',
        fixed: 'left',
        options: ['all'],
      },
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
      {
        title: 'Delete',
        key: 'actions',
        render(row) {
          return h(
            NButton,
            {
              size: 'small',
              onClick: () => deletePublication(row),
            },
            { default: () => 'Delete' },
          );
        },
      },
      {
        title: 'Edit',
        key: 'actions',
        render(row) {
          return h(
            NButton,
            {
              size: 'small',
              onClick: () => showUpdateModal(row),
            },
            { default: () => 'Update' },
          );
        },
      },
    ];

    const columnsRef = ref(columns);

    onMounted(() => {
      query(props.userId).then((data) => {
        dataRef.value = data.data.publications;
        loadingRef.value = false;
      });
    });

    return {
      data: dataRef,
      showModal: showModalRef,
      showBulkDeleteModal: showBulkDeleteModalRef,
      title: titleRef,
      year: yearRef,
      curId: curIdRef,
      columns: columnsRef,
      loading: loadingRef,
      selectedRows: rowsRef,
      updatePublication,
      cancelCallback,
      handleBulkDelete,
      handleCheck,
      rowKey(rowData) {
        return rowData.id;
      },
    };
  },
});
</script>

<style scoped>
.create-button {
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-end;
}
</style>
