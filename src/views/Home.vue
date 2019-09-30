<template>
  <div class="home">
    <summary-bar
      :total="summary.notesTotal"
      :not-completed="summary.notesNotCompleted"
      :completed="summary.notesCompleted"
      :fresh="summary.notesNew"
    />

    <data-table
      :columns="dataTable.columns"
      :items="dataTable.items"
      :selected.sync="dataTable.selected"
      selectable="id"
    >
      <template v-slot:status="{ row }">
        <td v-if="dataTable.selected.includes(row.id)" class="data-table__row">
          <select
            :value="row.status"
            @input="e => onStatusUpdate({ ...row, status: e.target.value })"
            class="form-input"
          >
            <option v-for="status in dataTable.statuses" :key="status">{{
              status
            }}</option>
          </select>
        </td>
        <td v-else class="data-table__row">{{ row.status }}</td>
      </template>
    </data-table>

    <div class="data-table-actions">
      <button
        type="button"
        class="button data-table-actions__add"
        @click.prevent="onAddNote"
      >
        Add
      </button>
    </div>

    <delete-prompt
      v-model="actions.isDeletePromptVisible"
      @delete="onDeleteNote(dataTable.selected)"
      @cancel="onCancelDeleteNote"
    ></delete-prompt>

    <router-view name="AddNote" @submit="onAddNoteSubmit" />
  </div>
</template>

<script>
import { useStore } from "@/hooks/store";
import { useRouter } from "@/hooks/router";
import SummaryBar from "@/components/SummaryBar";
import DataTable from "@/components/DataTable";
import DeletePrompt from "@/components/DeletePrompt";

import { reactive, computed, watch } from "@vue/composition-api";

function useSummary() {
  const { getters, state } = useStore();
  const localState = reactive({
    notesTotal: computed(() => state.notes.length),
    notesNew: computed(() => getters.notesNew.length),
    notesCompleted: computed(() => getters.notesCompleted.length),
    notesNotCompleted: computed(() => getters.notesNotCompleted.length)
  });

  return {
    summary: localState
  };
}
function useDataTable() {
  const { state } = useStore();
  const localState = reactive({
    columns: [
      { key: "id", text: "ID" },
      { key: "title", text: "Title" },
      { key: "content", text: "Content" },
      { key: "status", text: "Status" }
    ],
    items: computed(() => state.notes),
    statuses: computed(() => state.statuses),
    selected: []
  });

  return {
    dataTable: localState
  };
}
function useNotesActions(dataTable) {
  const router = useRouter();
  const { commit } = useStore();
  const localState = reactive({
    isDeletePromptVisible: false
  });

  watch(
    () => dataTable.selected,
    () => (localState.isDeletePromptVisible = !!dataTable.selected.length)
  );

  const onAddNote = function() {
    router.push({ name: "AddNote" });
  };

  const onAddNoteSubmit = function(model) {
    commit("ADD_NOTE", model);
  };

  const onStatusUpdate = function(note) {
    commit("UPDATE_NOTE", note);
  };

  const onDeleteNote = function(idList) {
    commit("DELETE_NOTES", idList);
  };

  const onCancelDeleteNote = function() {
    localState.isDeletePromptVisible = false;
  };

  return {
    actions: localState,
    onAddNote,
    onAddNoteSubmit,
    onStatusUpdate,
    onDeleteNote,
    onCancelDeleteNote
  };
}

export default {
  name: "Home",
  components: {
    SummaryBar,
    DataTable,
    DeletePrompt
  },
  setup() {
    const { dispatch } = useStore();
    dispatch("loadNotes");

    const { summary } = useSummary();
    const { dataTable } = useDataTable();
    const {
      actions,
      onAddNote,
      onAddNoteSubmit,
      onStatusUpdate,
      onDeleteNote,
      onCancelDeleteNote
    } = useNotesActions(dataTable);

    return {
      summary,
      dataTable,
      actions,
      onAddNote,
      onAddNoteSubmit,
      onStatusUpdate,
      onDeleteNote,
      onCancelDeleteNote
    };
  }
};
</script>

<style scoped lang="scss">
.data-table-wrapper {
  margin-bottom: 1.25em;
}
.summary {
  margin-bottom: 1.75em;
}
/deep/ .data-table {
  min-width: 600px;
}
/deep/ .data-table__row--id {
  color: $color-brand;
}
/deep/ .data-table__header--id {
  min-width: 4em;
  padding-right: 0.5em;
}

.data-table-actions {
  text-align: right;
}
</style>
