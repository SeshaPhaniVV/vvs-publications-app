<template>
  <div class="top-nav">
    <n-button tertiary @click="handleClick">
      Home
      <template #icon>
        <n-icon><BackIcon /> </n-icon>
      </template>
    </n-button>
  </div>

  <n-card content-style="padding: 0;">
    <n-tabs type="line" size="large" :tabs-padding="20" pane-style="padding: 20px;">
      <n-tab-pane name="User Details">
        <UserComponent :first-name="firstName" :last-name="lastName" :email="email"></UserComponent>
        <n-space class="buttons">
          <n-button strong secondary type="tertiary" @click="showDeleteModal = true"> Delete </n-button>
          <n-button tertiary type="primary" @click="showModal = true"> Update </n-button>
        </n-space>
      </n-tab-pane>
      <n-tab-pane name="Publication Details">
        <DataTable :user-id="userData.id"></DataTable>
      </n-tab-pane>
    </n-tabs>
  </n-card>

  <n-modal
    v-model:show="showDeleteModal"
    preset="dialog"
    title="Deleing user will delete publication details as well"
    positive-text="OK"
    negative-text="Cancel"
    @positive-click="handleDelete(userData.id)"
    @negative-click="cancelCallback(userData.id)"
  />

  <n-modal
    v-model:show="showModal"
    preset="dialog"
    title="Update the user details"
    positive-text="Submit"
    negative-text="Cancel"
    @positive-click="handleUpdate(userData.id, { firstName, lastName, email })"
    @negative-click="cancelCallback(userData.id)"
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
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { toast } from 'vue3-toastify';
import UserPublicationService from '@/services/UserPublicationService';
import DataTable from '../components/DataTable.vue';
import UserComponent from '../components/UserComponent.vue';
import router from '@/router';

async function query(id) {
  try {
    const { data } = await UserPublicationService.getUserPublications(id);
    console.log({ data });
    if (data.user === null) {
      toast.error('User is not present');
      router.push({ path: `/users` });
    }
    return data;
  } catch (err) {
    toast.error('User is not present');
    router.push({ path: `/users` });
  }
}

function handleClick() {
  router.push({ path: `/users` });
}

export default defineComponent({
  components: {
    UserComponent,
    DataTable,
  },
  setup() {
    const showModalRef = ref(false);
    const showDeleteModalRef = ref(false);
    const firstNameRef = ref('');
    const lastNameRef = ref('');
    const emailRef = ref('');

    const route = useRoute();
    const userDataRef = ref([]);
    const publicationsDataRef = ref([]);

    async function handleUpdate(id, data) {
      try {
        await UserPublicationService.update(id, data);
        await updateUser(id);
        toast.success('User updated succcesfully!');
      } catch (err) {
        toast.success('User updation failed!');
        console.log({ err });
      }
    }

    async function handleDelete(id) {
      await UserPublicationService.delete(id);
      toast.error('User Deleted Successfully');
      router.push({ path: `/users` });
    }

    async function cancelCallback(id) {
      await updateUser(id);
      showModalRef.value = false;
      showDeleteModalRef.value = false;
    }

    async function updateUser(id) {
      const data = await query(id);
      const { user, publications } = data;
      userDataRef.value = user;
      publicationsDataRef.value = publications;
      firstNameRef.value = user.firstName;
      lastNameRef.value = user.lastName;
      emailRef.value = user.email;
    }

    onMounted(() => {
      const { id } = route.params;
      updateUser(id);
    });

    return {
      userData: userDataRef,
      publicationsData: publicationsDataRef,
      handleClick,
      handleUpdate,
      handleDelete,
      cancelCallback,
      showModal: showModalRef,
      showDeleteModal: showDeleteModalRef,
      firstName: firstNameRef,
      lastName: lastNameRef,
      email: emailRef,
    };
  },
});
</script>

<style scoped>
.create-button {
  margin-bottom: 10px;
  justify-content: flex-end;
}
.buttons {
  margin: 10px;
  justify-content: flex-end !important;
}
.top-nav {
  margin: 10px;
  justify-content: flex-end !important;
}
</style>
