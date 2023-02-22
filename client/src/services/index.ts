import * as students from "./students";
import * as attributes from "./attributes";
import { Tabs } from "src/types";

const api = {
  [Tabs.STUDENTS]: students,
  [Tabs.ATTRIBUTES]: attributes,
};

export default api;
