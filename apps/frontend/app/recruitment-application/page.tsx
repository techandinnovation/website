"use client"

import type React from "react"

import { useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { recruitmentSchema, type RecruitmentFormData } from "../../../backend/src/utils/zodSchema"
import axios from "axios"
import { Capsule } from "@/components/Capsule"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

// Base props for all form controls
type BaseFormProps = {
    label?: string
    name: keyof RecruitmentFormData
    error?: string
    register: any
    helperText?: string
}

type AsInput = {
    as?: "input"
} & React.InputHTMLAttributes<HTMLInputElement>

type AsSelect = {
    as: "select"
    children: React.ReactNode
} & React.SelectHTMLAttributes<HTMLSelectElement>

type FormInputProps = BaseFormProps & (AsInput | AsSelect)

const FormInput: React.FC<FormInputProps> = ({
    label,
    name,
    error,
    register,
    as: Component = "input",
    children,
    helperText,
    ...props
}) => {
    const className = `w-full p-3 bg-gray-700/40 backdrop-blur-sm rounded-lg border ${error ? "border-red-500/60" : "border-white/20"
        } focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 outline-none transition-all duration-300`

    return (
        <div>
            {label && (
                <label htmlFor={name} className="block text-sm font-semibold text-gray-200 mb-2">
                    {label}
                </label>
            )}

            {Component === "input" && (
                <motion.input
                    whileFocus={{ scale: 1.02, transition: { duration: 0.2 } }}
                    id={name}
                    {...register(name)}
                    {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
                    className={className}
                />
            )}

            {Component === "select" && (
                <motion.select
                    whileFocus={{ scale: 1.02, transition: { duration: 0.2 } }}
                    id={name}
                    {...register(name)}
                    {...(props as React.SelectHTMLAttributes<HTMLSelectElement>)}
                    className={className}
                >
                    {children}
                </motion.select>
            )}

            {helperText && !error && <p className="mt-1 text-sm text-gray-400">{helperText}</p>}
            {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
        </div>
    )
}

type FormTextareaProps = BaseFormProps & { rows?: number } & React.TextareaHTMLAttributes<HTMLTextAreaElement>

const FormTextarea: React.FC<FormTextareaProps> = ({
    label,
    name,
    error,
    register,
    rows = 4,
    helperText,
    ...props
}) => (
    <div>
        {label && (
            <label htmlFor={name} className="block text-sm font-semibold text-gray-200 mb-2">
                {label}
            </label>
        )}
        <motion.textarea
            whileFocus={{ scale: 1.02, transition: { duration: 0.2 } }}
            id={name}
            rows={rows}
            {...register(name)}
            {...props}
            className={`w-full p-3 bg-gray-700/40 backdrop-blur-sm rounded-lg border ${error ? "border-red-500/60" : "border-white/20"} focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 outline-none transition-all duration-300`}
        />
        {helperText && !error && <p className="mt-1 text-sm text-gray-400">{helperText}</p>}
        {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
)

const DOMAIN_OPTIONS = [
    "Video Editing",
    "Designing",
    "Web Dev",
    "AI/ML",
    "Public Speaking",
    "Content Writing",
    "Marketing",
    "Event Management",
]

const stepFields: (keyof RecruitmentFormData)[][] = [
    ["fullName", "email", "phoneNumber", "branch", "year"],
    ["domains", "skills", "roleType", "experience", "portfolioLink", "resumeUrl"],
    ["hoursPerWeek", "reasonToJoin", "takeResponsibility"],
    ["confirmedInfo", "dataConsent"],
]

const AnimatedBlob = () => (
    <motion.div
        className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -top-40 -right-40"
        animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
        }}
        transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
        }}
    />
)

export default function RecruitmentForm() {
    const [step, setStep] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [apiError, setApiError] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        trigger,
        watch,
        setValue,
        formState: { errors },
    } = useForm<RecruitmentFormData>({
        resolver: zodResolver(recruitmentSchema),
        mode: "onBlur",
        defaultValues: {
            branch: "CSE",
            year: "FIRST",
            roleType: "VOLUNTEER",
            hoursPerWeek: "3-5",
            domains: [],
            takeResponsibility: false,
            confirmedInfo: false,
            dataConsent: false,
        },
    })

    const watchedDomains = watch("domains")

    const handleDomainChange = (domain: string) => {
        const currentDomains = watchedDomains || []
        const newDomains = currentDomains.includes(domain)
            ? currentDomains.filter((d) => d !== domain)
            : [...currentDomains, domain]
        setValue("domains", newDomains, { shouldValidate: true, shouldDirty: true })
    }

    const handleNext = async () => {
        const fieldsToValidate = stepFields[step - 1]
        const isValid = await trigger(fieldsToValidate)

        if (isValid) {
            if (step < 4) {
                setStep((prev) => prev + 1)
            }
        }
    }

    const handleBack = () => {
        setStep((prev) => prev - 1)
    }

    const onSubmit: SubmitHandler<RecruitmentFormData> = async (data) => {
        setIsSubmitting(true)
        setApiError(null)

        console.log("Submitting:", data)

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/recruitment/submit`, data)
            setStep(5)
        } catch (error) {
            console.error("Submission Error:", error)
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    setApiError(error.response.data.error || "An unknown server error occurred.")
                } else if (error.request) {
                    setApiError("Could not connect to the server. Please check your network.")
                } else {
                    setApiError("An unexpected error occurred while sending your application.")
                }
            } else {
                setApiError("An unexpected error occurred.")
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen relative bg-linear-to-br from-[#0a0e27] via-[#0e0e1e] to-[#0a0a15] text-white flex flex-col items-center justify-center p-4 selection:bg-blue-400 selection:text-gray-900 overflow-hidden">
            <AnimatedBlob />
            <motion.div
                className="absolute w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl bottom-0 -left-40"
                animate={{
                    x: [0, -30, 0],
                    y: [0, -50, 0],
                }}
                transition={{
                    duration: 10,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
            />

            <motion.div className="mb-8 relative z-10">
                <Link href="/">
                    <Capsule text="HOME" variant="cap1" />
                </Link>
            </motion.div>

            <motion.div
                className="w-full max-w-2xl bg-gray-900/40 backdrop-blur-xl p-8 sm:p-10 rounded-2xl shadow-2xl border border-white/20 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {step === 5 ? (
                    <motion.div
                        className="text-center py-16"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="mb-6"
                        >
                            <div className="w-20 h-20 mx-auto bg-green-500/20 rounded-full flex items-center justify-center border border-green-400/40">
                                <span className="text-4xl">✓</span>
                            </div>
                        </motion.div>
                        <h1 className="text-4xl font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
                            Application Submitted!
                        </h1>
                        <p className="text-gray-300 text-lg mb-2">Thank you for applying to Tech and Innovation Club.</p>
                        <p className="text-gray-400">We will review your application and get back to you soon.</p>
                    </motion.div>
                ) : (
                    <>
                        <motion.div
                            className="mb-8"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <h1 className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent mb-3 text-center">
                                Tech & Innovation Recruitment
                            </h1>
                            <div className="flex gap-2 mb-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <motion.div
                                        key={i}
                                        className={`h-2 flex-1 rounded-full transition-all ${i <= step ? "bg-linear-to-r from-blue-500 to-cyan-400" : "bg-gray-700/50"}`}
                                        layoutId={`progress-${i}`}
                                        initial={false}
                                        animate={{ width: i <= step ? "100%" : "100%" }}
                                        transition={{ duration: 0.4 }}
                                    />
                                ))}
                            </div>
                            <p className="text-gray-300 text-sm font-medium">Step {step} of 4</p>
                        </motion.div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <AnimatePresence mode="wait">
                                {step === 1 && (
                                    <motion.div
                                        key="step-1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-6"
                                    >
                                        <h2 className="text-2xl font-bold text-gray-100 flex items-center gap-2">
                                            <span className="w-8 h-8 bg-linear-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center text-sm font-bold">
                                                1
                                            </span>
                                            Basic Details
                                        </h2>
                                        <FormInput
                                            name="fullName"
                                            placeholder="Full Name"
                                            register={register}
                                            error={errors.fullName?.message}
                                        />
                                        <FormInput
                                            name="email"
                                            type="email"
                                            placeholder="Official Email ID"
                                            register={register}
                                            error={errors.email?.message}
                                        />
                                        <FormInput
                                            name="phoneNumber"
                                            type="tel"
                                            placeholder="10-Digit Phone Number"
                                            register={register}
                                            error={errors.phoneNumber?.message}
                                        />
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <FormInput
                                                as="select"
                                                label="Branch / Department"
                                                name="branch"
                                                register={register}
                                                error={errors.branch?.message}
                                            >
                                                <option value="CSE">Computer Science (CSE)</option>
                                                <option value="IOT">IoT</option>
                                                <option value="AIML">AI & ML</option>
                                                <option value="AIDS">AI & DS</option>
                                                <option value="CSDS">CS (Data Science)</option>
                                                <option value="CSBS">CS (Business Systems)</option>
                                                <option value="ME">Mechanical (ME)</option>
                                                <option value="CE">Civil (CE)</option>
                                                <option value="EX">Electronics (EX)</option>
                                                <option value="EE">Electrical (EE)</option>
                                                <option value="ECE">Electronics & Comm. (ECE)</option>
                                                <option value="OTHER">Other</option>
                                            </FormInput>

                                            <FormInput
                                                as="select"
                                                label="Year / Semester"
                                                name="year"
                                                register={register}
                                                error={errors.year?.message}
                                            >
                                                <option value="FIRST">1st Year</option>
                                                <option value="SECOND">2nd Year</option>
                                                <option value="THIRD">3rd Year</option>
                                                <option value="FOURTH">4th Year</option>
                                            </FormInput>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div
                                        key="step-2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-6"
                                    >
                                        <h2 className="text-2xl font-bold text-gray-100 flex items-center gap-2">
                                            <span className="w-8 h-8 bg-linear-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center text-sm font-bold">
                                                2
                                            </span>
                                            Domain & Skills
                                        </h2>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-200 mb-3">
                                                Area of Interest (Select all that apply)
                                            </label>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                {DOMAIN_OPTIONS.map((domain) => (
                                                    <motion.div
                                                        key={domain}
                                                        className={`flex items-center space-x-3 p-4 rounded-xl cursor-pointer transition-all border ${watchedDomains?.includes(domain)
                                                                ? "bg-blue-500/30 border-blue-400/60 shadow-lg shadow-blue-500/20"
                                                                : "bg-gray-800/40 border-white/10 hover:bg-gray-800/60 hover:border-white/20"
                                                            }`}
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => handleDomainChange(domain)}
                                                    >
                                                        <motion.div
                                                            className={`w-5 h-5 rounded border-2 shrink-0 flex items-center justify-center transition-all ${watchedDomains?.includes(domain) ? "bg-blue-500 border-blue-400" : "border-gray-500"}`}
                                                            initial={false}
                                                            animate={watchedDomains?.includes(domain) ? { scale: [1, 1.2, 1] } : {}}
                                                            transition={{ duration: 0.3 }}
                                                        >
                                                            {watchedDomains?.includes(domain) && (
                                                                <span className="text-white text-xs font-bold">✓</span>
                                                            )}
                                                        </motion.div>
                                                        <span className="text-sm font-medium">{domain}</span>
                                                    </motion.div>
                                                ))}
                                            </div>
                                            {errors.domains && <p className="mt-2 text-sm text-red-400">{errors.domains.message}</p>}
                                        </div>

                                        <FormTextarea
                                            name="skills"
                                            placeholder="List your skills, tools, and software (e.g., Figma, React, Python, Premiere Pro...)"
                                            register={register}
                                            error={errors.skills?.message}
                                        />

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-200 mb-3">Role Applying For</label>
                                            <div className="flex gap-4">
                                                {["CORE_TEAM", "VOLUNTEER"].map((role) => (
                                                    <motion.label
                                                        key={role}
                                                        className="flex-1 flex items-center space-x-3 p-4 bg-gray-800/40 border border-white/10 rounded-xl cursor-pointer hover:bg-gray-800/60 transition-all"
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                    >
                                                        <input type="radio" {...register("roleType")} value={role} className="w-5 h-5" />
                                                        <span className="capitalize font-medium">{role.replace("_", " ").toLowerCase()}</span>
                                                    </motion.label>
                                                ))}
                                            </div>
                                            {errors.roleType && <p className="mt-2 text-sm text-red-400">{errors.roleType.message}</p>}
                                        </div>

                                        <FormInput
                                            name="portfolioLink"
                                            placeholder="Portfolio / LinkedIn / GitHub Link (Optional)"
                                            register={register}
                                            error={errors.portfolioLink?.message}
                                        />

                                        <FormInput
                                            name="resumeUrl"
                                            placeholder="Resume URL (e.g., from Google Drive) (Optional)"
                                            register={register}
                                            error={errors.resumeUrl?.message}
                                            helperText="Please ensure the link is public/accessible."
                                        />
                                    </motion.div>
                                )}

                                {step === 3 && (
                                    <motion.div
                                        key="step-3"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-6"
                                    >
                                        <h2 className="text-2xl font-bold text-gray-100 flex items-center gap-2">
                                            <span className="w-8 h-8 bg-linear-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center text-sm font-bold">
                                                3
                                            </span>
                                            Availability & Commitment
                                        </h2>

                                        <FormInput
                                            as="select"
                                            label="Available hours per week"
                                            name="hoursPerWeek"
                                            register={register}
                                            error={errors.hoursPerWeek?.message}
                                        >
                                            <option value="1-2">1-2 Hours</option>
                                            <option value="3-5">3-5 Hours</option>
                                            <option value="5-10">5-10 Hours</option>
                                            <option value="10+">10+ Hours</option>
                                        </FormInput>

                                        <FormTextarea
                                            name="reasonToJoin"
                                            label="Why do you want to join the Tech & Innovation Club?"
                                            placeholder="What motivates you? What do you hope to learn or contribute? (Min 50 characters)"
                                            register={register}
                                            error={errors.reasonToJoin?.message}
                                            rows={5}
                                        />

                                        <motion.div
                                            className="flex items-start space-x-4 p-4 bg-gray-800/40 border border-white/10 rounded-xl cursor-pointer hover:bg-gray-800/60 transition-all"
                                            whileHover={{ scale: 1.01 }}
                                            onClick={() => {
                                                setValue("takeResponsibility", !watch("takeResponsibility"), { shouldValidate: true })
                                            }}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={watch("takeResponsibility")}
                                                readOnly
                                                className="w-5 h-5 mt-1 text-blue-500 rounded cursor-pointer"
                                            />
                                            <span className="text-gray-200">
                                                I am willing to take responsibility for events/projects and contribute actively.
                                            </span>
                                        </motion.div>
                                        {errors.takeResponsibility && (
                                            <p className="mt-2 text-sm text-red-400">{errors.takeResponsibility.message}</p>
                                        )}
                                    </motion.div>
                                )}

                                {step === 4 && (
                                    <motion.div
                                        key="step-4"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-6"
                                    >
                                        <h2 className="text-2xl font-bold text-gray-100 flex items-center gap-2">
                                            <span className="w-8 h-8 bg-linear-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center text-sm font-bold">
                                                4
                                            </span>
                                            Final Confirmation
                                        </h2>

                                        <motion.div
                                            className="bg-linear-to-br from-blue-500/10 to-cyan-500/10 p-6 rounded-xl border border-blue-400/30"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 }}
                                        >
                                            <h3 className="font-semibold text-gray-100 mb-4">Please review your details</h3>
                                            <ul className="text-sm text-gray-300 space-y-3">
                                                <li>
                                                    <strong className="text-blue-300">Name:</strong> {watch("fullName") || "..."}
                                                </li>
                                                <li>
                                                    <strong className="text-blue-300">Email:</strong> {watch("email") || "..."}
                                                </li>
                                                <li>
                                                    <strong className="text-blue-300">Role:</strong>{" "}
                                                    {watch("roleType")?.replace("_", " ").toLowerCase() || "..."}
                                                </li>
                                            </ul>
                                        </motion.div>

                                        <motion.div
                                            className="flex items-start space-x-4 p-4 bg-gray-800/40 border border-white/10 rounded-xl cursor-pointer hover:bg-gray-800/60 transition-all"
                                            whileHover={{ scale: 1.01 }}
                                            onClick={() => {
                                                setValue("confirmedInfo", !watch("confirmedInfo"), { shouldValidate: true })
                                            }}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={watch("confirmedInfo")}
                                                readOnly
                                                className="w-5 h-5 mt-1 text-blue-500 rounded cursor-pointer"
                                            />
                                            <span className="text-gray-200">
                                                I confirm that all information provided is correct and accurate to the best of my knowledge.
                                            </span>
                                        </motion.div>
                                        {errors.confirmedInfo && (
                                            <p className="mt-2 text-sm text-red-400">{errors.confirmedInfo.message}</p>
                                        )}

                                        <motion.div
                                            className="flex items-start space-x-4 p-4 bg-gray-800/40 border border-white/10 rounded-xl cursor-pointer hover:bg-gray-800/60 transition-all"
                                            whileHover={{ scale: 1.01 }}
                                            onClick={() => {
                                                setValue("dataConsent", !watch("dataConsent"), { shouldValidate: true })
                                            }}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={watch("dataConsent")}
                                                readOnly
                                                className="w-5 h-5 mt-1 text-blue-500 rounded cursor-pointer"
                                            />
                                            <span className="text-gray-200">
                                                I consent to the TechAndInnovation Club storing and using this information for selection and
                                                communication purposes.
                                            </span>
                                        </motion.div>
                                        {errors.dataConsent && <p className="mt-2 text-sm text-red-400">{errors.dataConsent.message}</p>}

                                        {apiError && (
                                            <motion.div
                                                className="p-4 bg-red-500/20 border border-red-400/60 text-red-300 rounded-xl text-sm"
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                            >
                                                <strong>Submission Failed:</strong> {apiError}
                                            </motion.div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <motion.div
                                className="flex justify-between items-center mt-10 pt-6 border-t border-white/10"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <motion.button
                                    type="button"
                                    onClick={handleBack}
                                    className={`px-8 py-3 bg-gray-700/50 hover:bg-gray-700 border border-white/10 rounded-lg font-semibold transition-all backdrop-blur-sm ${step === 1 ? "opacity-0 invisible" : "opacity-100 visible"}`}
                                    whileHover={{ scale: 1.05, backgroundColor: "rgba(107, 114, 128, 0.7)" }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    ← Back
                                </motion.button>

                                {step < 4 ? (
                                    <motion.button
                                        type="button"
                                        onClick={handleNext}
                                        className="ml-auto px-4 md:px-8 py-3 bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-lg font-bold transition-all shadow-lg shadow-blue-500/30"
                                        whileHover={{ scale: 1.08, boxShadow: "0 0 20px rgba(59, 130, 246, 0.6)" }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Next Step →
                                    </motion.button>
                                ) : (
                                    <motion.button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="ml-auto px-10 py-3 bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-bold transition-all shadow-lg shadow-green-500/30"
                                        whileHover={!isSubmitting ? { scale: 1.08, boxShadow: "0 0 20px rgba(34, 197, 94, 0.6)" } : {}}
                                        whileTap={!isSubmitting ? { scale: 0.95 } : {}}
                                    >
                                        {isSubmitting ? "Submitting..." : "Submit Application"}
                                    </motion.button>
                                )}
                            </motion.div>
                        </form>
                    </>
                )}
            </motion.div>
        </div>
    )
}
