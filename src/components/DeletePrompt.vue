<template>
  <div class="delete-prompt__wrapper">
    <div v-if="value" class="delete-prompt">
      <p class="delete-prompt__title">
        <span class="delete-prompt__title-icon">&#9888;</span> Do you want to
        delete this news?
      </p>
      <div>
        <button
          type="button"
          class="button button--text delete-prompt__button--cancel"
          @click.prevent="$emit('cancel')"
        >
          No
        </button>
        <button
          type="button"
          class="button delete-prompt__button--delete"
          @click.prevent="$emit('delete')"
        >
          Yes
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DeletePrompt",
  props: {
    value: {
      type: Boolean,
      required: true
    }
  }
};
</script>

<style scoped lang="scss">
.delete-prompt__wrapper {
  position: fixed;
  width: 100%;
  bottom: 1em;
  left: 0;
  right: 0;
  text-align: center;
  padding: 0 0.5em;

  @media only screen and (min-width: 1024px) {
    padding: 0 4em;
    bottom: 4em;
  }
}
.delete-prompt {
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  width: auto;
  background: $color-warning;
  color: $color-positive;
  padding: 8px;
  border-radius: 5px;
  min-width: 100%;

  @media only screen and (min-width: 1024px) {
    min-width: 800px;
  }
}
.delete-prompt__title {
  margin-right: 2em;
  padding-left: 0.5em;
}
.delete-prompt__title-icon {
  margin-right: 0.5em;
}
.button {
  font-size: 0.8em;
  background-color: $color-positive;
  border-color: $color-positive;
  color: $color-warning;
  padding: 4px 10px;
  margin: 5px;

  @media only screen and (min-width: 1024px) {
    margin-left: 8px;
    padding: 8px 36px;
  }

  &:hover {
    background-color: $color-positive;
  }
}
.button--text {
  background-color: transparent;
  color: $color-positive;

  &:hover {
    background-color: transparent;
  }
}
</style>
