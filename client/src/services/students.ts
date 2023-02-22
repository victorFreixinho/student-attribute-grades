import api, { getErrorMessage } from "./api";
import { Student } from "src/types";
import { BaseResponse } from "./types";

export async function fetchAll() {
  try {
    const students = await api.fetchStudents();

    return {
      success: true,
      data: students,
      message: "Students fetch was successful.",
    };
  } catch (err) {
    return {
      success: false,
      data: [],
      message: getErrorMessage(err),
    };
  }
}

export async function fetchStudentAttributes(id: number) {
  try {
    const studentAttributes = await api.fetchStudentAttributes(id);

    return {
      success: true,
      data: studentAttributes,
      message: "Student attributes fetch was successful.",
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
  newStudent: Student
): Promise<BaseResponse & { data: Student | null }> {
  try {
    const createdStudent = await api.createStudent(newStudent);
    return {
      success: true,
      data: createdStudent,
      message: "The student has been created successfully",
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
  student: Student
): Promise<BaseResponse & { data: Student | null }> {
  try {
    const updatedStudent = await api.updateStudent(id, student);
    return {
      success: true,
      data: updatedStudent,
      message: "The student has been updated successfully",
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
    const deleted = await api.deleteStudent(id);

    return {
      success: true,
      data: deleted,
      message: "The student has been deleted successfully",
    };
  } catch (err) {
    return {
      success: false,
      data: false,
      message: getErrorMessage(err),
    };
  }
}
