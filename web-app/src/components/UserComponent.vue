<template>
  <n-card title="User Publications Details" size="huge">
    <n-descriptions label-placement="top" title="User Details">
      <n-descriptions-item>
        <template #label> User Name </template>
        {{ firstNameData }} {{ lastNameData }}
      </n-descriptions-item>
      <n-descriptions-item label="Email"> {{ emailData }} </n-descriptions-item>
    </n-descriptions>
  </n-card>
</template>

<script>
import { defineComponent, toRefs, onMounted } from 'vue';

export default defineComponent({
  props: {
    firstName: {
      type: String,
      default: '',
    },
    lastName: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const firstNameRef = toRefs(props).firstName;
    const lastNameRef = toRefs(props).lastName;
    const emailRef = toRefs(props).email;

    onMounted(() => {
      firstNameRef.value = props.firstName;
      lastNameRef.value = props.lastName;
      emailRef.value = props.email;
    });

    return {
      firstNameData: firstNameRef,
      lastNameData: lastNameRef,
      emailData: emailRef,
    };
  },
});
</script>
