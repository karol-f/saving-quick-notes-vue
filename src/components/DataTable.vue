<template>
  <div class="data-table-wrapper">
    <table class="data-table">
      <thead>
        <tr>
          <th
            v-if="selectable"
            class="data-table__header data-table__header-selectable"
          >
            <input
              type="checkbox"
              class="data-table__action-checkbox data-table__action-checkbox--select-all"
              :checked="selectingState.isSelectAll"
              @click="onActionSelectAll"
            />
          </th>
          <slot
            v-for="(column, index) in columns"
            :name="`header-${column.key}`"
            :column="column"
          >
            <th
              :class="[
                'data-table__header',
                `data-table__header--${column.key}`
              ]"
              :key="column.key + index"
              @click="onSort(column.key)"
            >
              <div class="data-table__title">{{ column.text }}</div>
              <div
                :class="[
                  'data-table__sort-wrapper',
                  {
                    'data-table__sort-wrapper--active':
                      sortingState.sort === column.key
                  }
                ]"
              >
                <span
                  :class="[
                    {
                      'data-table__sort--asc': sortingState.sortDirection,
                      'data-table__sort--desc': !sortingState.sortDirection
                    }
                  ]"
                  >&#8227;</span
                >
              </div>
            </th>
          </slot>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in sortingState.itemsSorted"
          :key="index"
          class="data-table__row-wrapper"
        >
          <td
            v-if="selectable"
            class="data-table__row data-table__row-selectable"
          >
            <input
              type="checkbox"
              :value="row[selectable]"
              class="data-table__action-checkbox"
              v-model="selectingState.selectionModel"
            />
          </td>
          <template v-for="column in columns">
            <slot :name="column.key" :row="row" :column="column">
              <td
                :class="['data-table__row', `data-table__row--${column.key}`]"
                :key="column.key + index + index"
              >
                {{ row[column.key] }}
              </td>
            </slot>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { reactive, computed, watch } from "@vue/composition-api";
import orderBy from "lodash/orderBy";

function useSorting({ props, emit }) {
  const localState = reactive({
    itemsSorted: computed(() =>
      orderBy(
        props.items,
        localState.sort,
        localState.sortDirection ? "asc" : "desc"
      )
    ),
    sort: "id",
    sortDirection: true
  });

  const onSort = function(key) {
    if (localState.sort === key) {
      localState.sortDirection = !localState.sortDirection;
    } else {
      localState.sortDirection = true;
    }

    localState.sort = key;

    emit("sort", key);
  };

  return {
    sortingState: localState,
    onSort
  };
}

function useSelecting({ sortingState, props, emit }) {
  const localState = reactive({
    selectionModel: [],
    isSelectAll: computed(
      () =>
        sortingState.itemsSorted.length > 0 &&
        localState.selectionModel.length === sortingState.itemsSorted.length
    )
  });

  watch(
    () => localState.selectionModel,
    selectionModel => {
      emit("update:selected", [...selectionModel]);
    }
  );

  const onActionSelectAll = function() {
    localState.isSelectAll
      ? (localState.selectionModel = [])
      : (localState.selectionModel = sortingState.itemsSorted.map(
          item => item[props.selectable]
        ));
  };

  const onActionDeselectAll = function() {
    localState.selectionModel = [];
  };

  return {
    selectingState: localState,
    onActionSelectAll,
    onActionDeselectAll
  };
}

export default {
  name: "DataTable",
  props: {
    columns: {
      type: Array,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    selectable: {
      type: String,
      default: ""
    }
  },
  setup(props, { emit }) {
    const { sortingState, onSort } = useSorting({ props, emit });
    const {
      selectingState,
      onActionSelectAll,
      onActionDeselectAll
    } = useSelecting({
      sortingState,
      props,
      emit
    });

    watch(() => props.items, () => onActionDeselectAll());

    return {
      sortingState,
      onSort,
      selectingState,
      onActionSelectAll
    };
  }
};
</script>

<style scoped lang="scss">
.data-table-wrapper {
  display: block;
  width: 100%;
  overflow-x: auto;
  position: relative;
}
.data-table {
  width: 100%;
}
.data-table__header {
  user-select: none;
  cursor: pointer;
  white-space: nowrap;
  min-width: 1em;
  background-color: $color-grey;
  line-height: 1.6em;
  color: $color-positive;
  font-size: 0.8em;
  padding: 7px 15px;

  &.data-table__header-selectable {
    padding: 7px;
    text-align: center;
  }
}
.data-table__title {
  float: left;
}
.data-table__sort-wrapper {
  display: flex;
  justify-content: flex-end;
  line-height: 1.6em;
}

.data-table__sort--desc,
.data-table__sort--asc {
  display: inline-block;
  color: darken($color-positive, 30%);
  font-size: 1.8em;

  .data-table__sort-wrapper--active & {
    color: $color-positive;
  }
}
.data-table__sort--asc {
  transform: rotate(-90deg);
}
.data-table__sort--desc {
  transform: rotate(90deg);
}
.data-table__row-wrapper {
  background-color: $color-positive;
}
.data-table__row {
  padding: 10px 15px;
  color: $color-grey;
}
.data-table__row-selectable {
  text-align: center;
  padding: 7px;
}
.data-table__action-checkbox {
  cursor: pointer;
}
</style>
