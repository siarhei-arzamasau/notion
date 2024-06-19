import { nanoid } from "nanoid";
import { Page } from "./types";

export const createPage = () => {
  const slug = nanoid();
  const id = nanoid();

  const page: Page = {
    title: "Untitled",
    id,
    slug,
    nodes: [],
    cover: "dl.png",
  };

  return page;
};
