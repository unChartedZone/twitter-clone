import Button from "@/components/common/Button.vue";
import Card from "@/components/common/Card.vue";
import Icon from "@/components/common/Icon.vue";
import Link from "@/components/common/Link.vue";
import List from "@/components/common/List.vue";
import ListItem from "@/components/common/ListItem.vue";
import Menu from "@/components/common/Menu.vue";
import Modal from "@/components/common/Modal.vue";
import TabHeader from "@/components/common/TabHeader.vue";
import Tabs from "@/components/common/Tabs.vue";
import Textarea from "@/components/common/Textarea.vue";
import Textfield from "@/components/common/Textfield.vue";

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    Button: typeof Button;
    Card: typeof Card;
    Icon: typeof Icon;
    Link: typeof Link;
    List: typeof List;
    ListItem: typeof ListItem;
    Menu: typeof Menu;
    Modal: typeof Modal;
    Tabs: typeof Tabs;
    Textfield: typeof Textfield;
    Textarea: typeof Textarea;
    TabHeader: typeof TabHeader;
  }
}
