import { ref } from "vue";

declare module "*.json.ref" {
  const content: Ref<any>;
  export default content;
}

declare module "*.ref" {
  const content: Ref<string>;
  export default content;
}
