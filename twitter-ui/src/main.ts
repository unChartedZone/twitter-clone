import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "./styles/main.scss";

import Button from "@/components/common/Button.vue";
import Icon from "@/components/common/Icon.vue";
import Link from "@/components/common/Link.vue";
import List from "@/components/common/List.vue";
import ListItem from "@/components/common/ListItem.vue";
import Menu from "@/components/common/Menu.vue";
import TabHeader from "@/components/common/TabHeader.vue";
import Tabs from "@/components/common/Tabs.vue";
import Textfield from "@/components/common/Textfield.vue";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.component("Button", Button);
app.component("Icon", Icon);
app.component("Link", Link);
app.component("List", List);
app.component("ListItem", ListItem);
app.component("Menu", Menu);
app.component("TabHeader", TabHeader);
app.component("Tabs", Tabs);
app.component("Textfield", Textfield);

app.mount("#app");
