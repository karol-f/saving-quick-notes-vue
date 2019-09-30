import Vue from "vue";
import Vuex from "vuex";
import * as types from "./types";
import { loadNotes, saveNotes } from "../api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    statuses: ["New", "Completed", "Not completed"],
    notes: []
  },
  getters: {
    notesNew(state) {
      return state.notes.filter(note => note.status === "New");
    },
    notesCompleted(state) {
      return state.notes.filter(note => note.status === "Completed");
    },
    notesNotCompleted(state) {
      return state.notes.filter(note => note.status === "Not completed");
    }
  },
  mutations: {
    [types.LOAD_NOTES](state, payload) {
      state.notes = payload;
    },
    [types.ADD_NOTE](state, payload) {
      const maxId = state.notes.length
        ? state.notes.reduce(
            (output, item) => (output.id > item.id ? output.id : item.id),
            { id: 0 }
          )
        : 0;
      state.notes.push({ id: maxId + 1, status: "New", ...payload });
      return saveNotes(state.notes);
    },
    [types.DELETE_NOTES](state, idList = []) {
      state.notes = state.notes.filter(note => !idList.includes(note.id));
      return saveNotes(state.notes);
    },
    [types.UPDATE_NOTE](state, note) {
      const foundNoteIndex = state.notes.findIndex(
        stateNote => stateNote.id === note.id
      );
      if (foundNoteIndex > -1) {
        state.notes.splice(foundNoteIndex, 1, note);
        return saveNotes(state.notes);
      }
    }
  },
  actions: {
    loadNotes({ commit }) {
      return loadNotes().then(notes => commit(types.LOAD_NOTES, notes));
    }
  }
});
