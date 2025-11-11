import { z } from "zod";

// Define Enums (matching your Prisma schema logic)
export const BranchEnum = z.enum(["CSE", "IOT", "AIML", "AIDS", "CSDS", "CSBS", "ME", "CE", "EX", "EE", "ECE", "OTHER"]);
export const YearEnum = z.enum(["FIRST", "SECOND", "THIRD", "FOURTH"]);
export const RoleEnum = z.enum(["CORE_TEAM", "VOLUNTEER"]);
export const HoursEnum = z.enum(["1-2", "3-5", "5-10", "10+"]);

export const recruitmentSchema = z.object({
    // Section 1: Basic Details
    fullName: z
        .string()
        .min(2, { message: "Full name must be at least 2 characters" })
        .max(100),

    email: z
        .string()
        .email({ message: "Please enter a valid email address" }),

    phoneNumber: z
        .string()
        .regex(/^[0-9]{10}$/, { message: "Phone number must be a valid 10-digit number" }),

    branch: BranchEnum,

    year: YearEnum,

    // Section 2: Domain & Skills
    domains: z
        .array(z.string())
        .min(1, { message: "Please select at least one area of interest" }),

    skills: z
        .string()
        .min(5, { message: "Please list your skills/tools" }),

    roleType: RoleEnum,

    experience: z.string().optional(),

    portfolioLink: z
        .string()
        .url({ message: "Please enter a valid URL" })
        .optional()
        .or(z.literal("")), // Allows empty string if user doesn't fill it

    resumeUrl: z
        .string()
        .url({ message: "Resume URL is invalid" })
        .optional()
        .or(z.literal("")),

    // Section 3: Availability
    hoursPerWeek: HoursEnum,

    reasonToJoin: z
        .string()
        .min(50, { message: "Please write at least a few sentences about why you want to join." })
        .max(2000, { message: "Text is too long." })
        // Custom validation for word count (approximate)
        .refine((val) => val.trim().split(/\s+/).length >= 10, {
            message: "Please provide a more detailed answer (min 10 words).",
        }),

    takeResponsibility: z.boolean(),

    // Section 4: Final Confirmation
    confirmedInfo: z
        .boolean()
        .refine((val) => val === true, {
            message: "You must confirm that the information is correct"
        }),

    dataConsent: z
        .boolean()
        .refine((val) => val === true, {
            message: "You must consent to data processing to apply"
        }),
});

export type RecruitmentFormData = z.infer<typeof recruitmentSchema>;