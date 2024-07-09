import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "./styles/main.scss";

import Button from "@/components/common/Button.vue";
import Card from "@/components/common/Card.vue";
import CardHeader from "./components/common/card/CardHeader.vue";
import FileInput from "./components/common/FileInput.vue";
import Icon from "@/components/common/Icon.vue";
import Link from "@/components/common/Link.vue";
import List from "@/components/common/List.vue";
import ListItem from "@/components/common/ListItem.vue";
import Menu from "@/components/common/Menu.vue";
import Modal from "@/components/common/Modal.vue";
import Select from "./components/common/Select.vue";
import TabHeader from "@/components/common/tab/TabHeader.vue";
import TabRow from "@/components/common/tab/TabRow.vue";
import Tabs from "@/components/common/tab/Tabs.vue";
import Textarea from "./components/common/Textarea.vue";
import Textfield from "@/components/common/Textfield.vue";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.component("Button", Button);
app.component("Card", Card);
app.component("CardHeader", CardHeader);
app.component("FileInput", FileInput);
app.component("Icon", Icon);
app.component("Link", Link);
app.component("List", List);
app.component("ListItem", ListItem);
app.component("Menu", Menu);
app.component("Modal", Modal);
app.component("Select", Select);
app.component("TabHeader", TabHeader);
app.component("TabRow", TabRow);
app.component("Tabs", Tabs);
app.component("Textarea", Textarea);
app.component("Textfield", Textfield);

app.mount("#app");
