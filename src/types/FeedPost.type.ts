import { User } from "./User.type";
import {Content} from "./Content.type";
import {Interactions} from "./Interactions.types";

export type FeedPostData = {
  id: number;
  createdTime: Date;
  author: User;
  content: Content;
  interactions: Interactions
};
