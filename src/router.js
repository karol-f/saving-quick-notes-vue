import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home";
import AddNoteModal from "./components/AddNoteModal";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      children: [
        {
          path: "add",
          name: "AddNote",
          components: {
            AddNote: AddNoteModal
          },
          props: true
        }
      ]
    }
  ]
});
