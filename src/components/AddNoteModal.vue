<template>
  <div class="modal-backdrop">
    <div class="modal" v-click-outside="onModalClose">
      <h3 class="modal__header">News</h3>

      <p>
        <input
          v-model="form.model.title"
          type="text"
          placeholder="Add Title"
          class="modal-form__title form-input"
        />
      </p>
      <p>
        <textarea
          v-model="form.model.content"
          rows="4"
          placeholder="Add Note"
          class="modal-form__content form-input"
        ></textarea>
      </p>
      <p class="modal__form-error" v-if="form.formError">
        {{ form.formError }}
      </p>

      <button
        type="button"
        class="button button modal-button__close"
        @click="onModalSave"
      >
        Save
      </button>
      <button
        type="button"
        class="button button--text modal-button__close"
        @click="onModalClose"
      >
        Cancel
      </button>
    </div>
  </div>
</template>

<script>
import { reactive } from "@vue/composition-api";
import { useRouter } from "@/hooks/router";

function useModalForm() {
  const localState = reactive({
    model: {
      title: "",
      content: ""
    },
    formError: null
  });

  return {
    form: localState
  };
}

function useModalActions({ form, emit }) {
  const router = useRouter();

  const onModalClose = function() {
    router.push({ name: "Home" });
  };

  const onModalSave = function() {
    const hasValues = Object.values(form.model).every(model => !!model);

    if (hasValues) {
      form.formError = null;
      emit("submit", form.model);
      onModalClose();
    } else {
      form.formError = "Fields shouldn't be empty";
    }
  };

  return {
    onModalClose,
    onModalSave
  };
}

export default {
  name: "AddNote",
  setup(props, { emit }) {
    const { form } = useModalForm();
    const { onModalClose, onModalSave } = useModalActions({
      form,
      emit
    });

    return {
      form,
      onModalClose,
      onModalSave
    };
  }
};
</script>

<style scoped lang="scss">
.button {
  margin-right: 0.5em;
}
.form-input {
  margin-bottom: 1.75em;
}
.modal__form-error {
  color: $color-warning;
  margin-bottom: 1.75em;
  text-align: center;
}
</style>
