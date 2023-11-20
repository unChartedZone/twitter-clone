import type Media from "./Media";

export default interface Tweet {
  id: string;
  text: string;
  medium: Media[];
}
