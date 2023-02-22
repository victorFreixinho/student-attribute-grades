import mock from "./mock.json";
import { Attribute } from "src/types";

export async function fetchAttributes(): Promise<Attribute[]> {
  return mock["attributes"] || [];
}

export async function createAttribute(
  newAttribute: Attribute
): Promise<Attribute> {
  const allAttributes = await fetchAttributes();

  const id =
    allAttributes?.length && allAttributes[allAttributes.length - 1].id
      ? allAttributes[allAttributes.length - 1].id + 1
      : 0;

  mock["attributes"].push({ ...newAttribute, id });
  return { ...newAttribute, id };
}

export async function updateAttribute(
  id: number,
  attribute: Attribute
): Promise<Attribute> {
  const allAttributes = await fetchAttributes();
  const idx = allAttributes.findIndex((s) => s.id === id);
  if (idx === -1) throw new Error("Attribute not found");

  mock["attributes"][idx] = { ...attribute, id };
  return { ...attribute, id };
}

export async function deleteAttribute(id: number): Promise<boolean> {
  const allAttributes = await fetchAttributes();
  const idx = allAttributes.findIndex((s) => s.id === id);
  if (idx === -1) throw new Error("Attribute not found");

  mock["attributes"].splice(idx, 1);
  return true;
}
