import { Attribute } from "src/types";
import api, { getErrorMessage } from "./api";
import { BaseResponse } from "./types";

export async function fetchAll(): Promise<
  BaseResponse & { data: Attribute[] }
> {
  try {
    const attributes = await api.fetchAttributes();

    return {
      success: true,
      data: attributes,
      message: "The attributes fetch was successful",
    };
  } catch (err) {
    return {
      success: false,
      data: [],
      message: getErrorMessage(err),
    };
  }
}

export async function create(
  newAttribute: Attribute
): Promise<BaseResponse & { data: Attribute | null }> {
  try {
    const createdAttr = await api.createAttribute(newAttribute);

    return {
      success: true,
      data: createdAttr,
      message: "The attribute has been created successfully",
    };
  } catch (err) {
    return {
      success: false,
      data: null,
      message: getErrorMessage(err),
    };
  }
}

export async function update(
  id: number,
  attribute: Attribute
): Promise<BaseResponse & { data: Attribute | null }> {
  try {
    const updatedAttr = await api.updateAttribute(id, attribute);

    return {
      success: true,
      data: updatedAttr,
      message: "The attribute has been updated successfully",
    };
  } catch (err) {
    return {
      success: false,
      data: null,
      message: getErrorMessage(err),
    };
  }
}

export async function del(
  id: number
): Promise<BaseResponse & { data: boolean }> {
  try {
    const deleted = await api.deleteAttribute(id);

    return {
      success: true,
      data: deleted,
      message: "The attribute has been deleted successfully",
    };
  } catch (err) {
    return {
      success: false,
      data: false,
      message: getErrorMessage(err),
    };
  }
}
