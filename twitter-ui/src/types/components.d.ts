import Button from "@/components/common/Button.vue";
import Card from "@/components/common/Card.vue";
import CardHeader from "@/components/common/card/CardHeader.vue";
import FileInput from "@/components/common/FileInput.vue";
import Icon from "@/components/common/Icon.vue";
import Link from "@/components/common/Link.vue";
import List from "@/components/common/List.vue";
import ListItem from "@/components/common/ListItem.vue";
import Menu from "@/components/common/Menu.vue";
import Modal from "@/components/common/Modal.vue";
import Select from "@/components/common/Select.vue";
import TabHeader from "@/components/common/tab/TabHeader.vue";
import TabRow from "@/components/common/tab/TabRow.vue";
import Tabs from "@/components/common/tab/Tabs.vue";
import Textarea from "@/components/common/Textarea.vue";
import Textfield from "@/components/common/Textfield.vue";

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    Button: typeof Button;
    Card: typeof Card;
    CardHeader: typeof CardHeader;
    FileInput: typeof FileInput;
    Icon: typeof Icon;
    Link: typeof Link;
    List: typeof List;
    ListItem: typeof ListItem;
    Menu: typeof Menu;
    Modal: typeof Modal;
    Select: typeof Select;
    Textfield: typeof Textfield;
    Textarea: typeof Textarea;
    TabHeader: typeof TabHeader;
    TabRow: typeof TabRow;
    Tabs: typeof Tabs;
  }
}
