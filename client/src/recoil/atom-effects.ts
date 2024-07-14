/* eslint-disable @typescript-eslint/no-explicit-any */
import { DefaultValue } from "recoil";
import { unStringfy } from "../typs/interfaces";

interface ITypes {
  onSet: any;
  setSelf: any;
  node: any;
}

export const localPersistEffect = ({ onSet, setSelf, node }: ITypes) => {
  const storedItems = localStorage.getItem(node.key);

  if (storedItems != null) {
    setSelf(unStringfy(storedItems));
  }

  onSet((newItems: any) => {
    if (newItems instanceof DefaultValue) {
      localStorage.removeItem(node.key);
    } else {
      localStorage.setItem(node.key, JSON.stringify(newItems));
    }
  });
};
