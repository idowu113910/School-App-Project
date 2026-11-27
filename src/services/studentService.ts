export interface StudentVerificationRequest {
  schoolName: string;
  matricNumber: string;
  dateOfBirth: string;
}

export interface StudentRecord {
  fullName: string;
  matricNumber: string;
  department: string | null;
  faculty: string | null;
  level: string | null;
}

export type StudentVerificationResult =
  | { status: "not_configured" }
  | { status: "not_found" }
  | { status: "verified"; student: StudentRecord };

export interface StudentVerificationService {
  verifyStudent(
    request: StudentVerificationRequest,
  ): Promise<StudentVerificationResult>;
}

export const studentService: StudentVerificationService = {
  async verifyStudent(request) {
    if (
      !request.schoolName.trim() ||
      !request.matricNumber.trim() ||
      !request.dateOfBirth
    ) {
      throw new Error("School, matric number, and date of birth are required.");
    }

    // Verification must be performed by a trusted server, never by querying the private registry from the browser.
    return { status: "not_configured" };
  },
};
