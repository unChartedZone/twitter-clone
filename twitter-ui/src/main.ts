import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "./styles/main.scss";

import Button from "@/components/common/Button.vue";
import Icon from "@/components/common/Icon.vue";
import Link from "@/components/common/Link.vue";
import Menu from "@/components/common/Menu.vue";
import Textfield from "@/components/common/Textfield.vue";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.component("Button", Button);
app.component("Icon", Icon);
app.component("Link", Link);
app.component("Menu", Menu);
app.component("Textfield", Textfield);

app.mount("#app");
