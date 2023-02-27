import { User } from "./User.type";
import {Content} from "./Content.type";
import {Interactions} from "./Interactions.types";

export type FeedPostData = {
  id: string;
  createdTime: Date;
  author: User;
  content: Content;
  interactions: Interactions
};
