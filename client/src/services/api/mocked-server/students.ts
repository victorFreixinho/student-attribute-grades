import mock from "./mock.json";
import { Student, Attribute } from "src/types";

export async function fetchStudents(): Promise<Student[]> {
  return mock["students"] || [];
}

export async function fetchStudentAttributes(id: number): Promise<Attribute[]> {
  return mock["students"].find((s) => s.id === id)?.attributes || [];
}

export async function createStudent(newStudent: Student): Promise<Student> {
  const allStudents = await fetchStudents();

  const id =
    allStudents?.length && allStudents[allStudents.length - 1].id
      ? allStudents[allStudents.length - 1].id + 1
      : 0;

  mock["students"].push({ ...newStudent, id });
  return { ...newStudent, id };
}

export async function updateStudent(
  id: number,
  student: Student
): Promise<Student> {
  const allStudents = await fetchStudents();
  const idx = allStudents.findIndex((s) => s.id === id);
  if (idx === -1) throw new Error("Student not found");

  mock["students"][idx] = { ...student, id };
  return { ...student, id };
}

export async function deleteStudent(id: number): Promise<boolean> {
  const allStudents = await fetchStudents();
  const idx = allStudents.findIndex((s) => s.id === id);
  if (idx === -1) throw new Error("Student not found");

  mock["students"].splice(idx, 1);
  return true;
}
