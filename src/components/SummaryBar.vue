<template>
  <ul class="summary">
    <li class="summary__item">
      <span class="summary__item-description">Total</span> {{ total }}
    </li>
    <li class="summary__item">
      <span class="summary__item-description">Completed</span> {{ completed }}
    </li>
    <li class="summary__item">
      <span class="summary__item-description">Not Completed</span>
      {{ notCompleted }}
    </li>
  </ul>
</template>

<script>
export default {
  name: "SummaryBar",
  props: {
    total: {
      type: Number,
      required: true
    },
    notCompleted: {
      type: Number,
      required: true
    },
    completed: {
      type: Number,
      required: true
    },
    fresh: {
      type: Number,
      required: true
    }
  }
};
</script>

<style scoped lang="scss">
.summary {
  margin: 0;
  background-color: $color-positive;
  padding: 2em 0;
  display: inline-flex;
  width: auto;
  box-shadow: 2px 2px 2px 0 rgba($color-negative, 0.05);
  margin-bottom: 1.75em;
}
.summary__item {
  padding: 0 1em;
  font-size: 2em;
  color: $color-grey;
}
.summary__item-description {
  font-size: 0.5em;
  color: $color-muted;
  display: block;
  line-height: 150%;
}
</style>
