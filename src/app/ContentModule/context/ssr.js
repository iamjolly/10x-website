/* istanbul ignore file */
import PageData from "app/json/content/page/index.json";
import ProjectData from "app/json/content/project/index.json";

const types = {
  page: PageData,
  project: ProjectData,
};

export const getAllByContentType = async (props) => {
  return types[props.type];
};

export const getContentTypeByName = async (props) => {
  const { type, name } = props;
  const data = types[type];
  const item = data.find((d) => d.name === name) || {};
  if (!item.name) {
    throw new Error("Not Found");
  }
  return item;
};
