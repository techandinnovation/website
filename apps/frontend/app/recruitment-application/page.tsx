'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { recruitmentSchema, RecruitmentFormData } from '../../../backend/src/utils/zodSchema'; // Adjust path as needed
import axios from 'axios'; // <-- Import axios
import { Capsule } from '@/components/Capsule';
import Link from 'next/link';


// Base props for all form controls
type BaseFormProps = {
    label?: string;
    name: keyof RecruitmentFormData;
    error?: string;
    register: any; // from useForm
    helperText?: string; // <-- FIX: Added optional helperText
};

// --- Polymorphic FormInput (FIXED) ---
// This component can now correctly render as 'input' or 'select'

// 1. Define types for 'as' prop variations
type AsInput = {
    as?: 'input';
} & React.InputHTMLAttributes<HTMLInputElement>;

type AsSelect = {
    as: 'select';
    children: React.ReactNode; // Select must have <option> children
} & React.SelectHTMLAttributes<HTMLSelectElement>;

// 2. Combine types for the final FormInputProps
type FormInputProps = BaseFormProps & (AsInput | AsSelect);

// 3. Implement the polymorphic component
const FormInput: React.FC<FormInputProps> = ({
    label,
    name,
    error,
    register,
    as: Component = 'input', // Default to 'input' if 'as' prop is not provided
    children,
    helperText, // <-- FIX: Destructure helperText
    ...props
}) => {
    const className = `w-full p-3 bg-gray-700 rounded border ${error ? 'border-red-500' : 'border-gray-600'
        } focus:border-blue-500 focus:ring-blue-500 outline-none transition`;

    return (
        <div>
            {label && <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>}

            {/* --- FIX: Conditionally render based on 'Component' variable --- */}
            {Component === 'input' && (
                <input
                    id={name}
                    {...register(name)}
                    {...(props as React.InputHTMLAttributes<HTMLInputElement>)} // Spread remaining props
                    className={className}
                // No 'children' prop is passed, fixing the error
                />
            )}

            {Component === 'select' && (
                <select
                    id={name}
                    {...register(name)}
                    {...(props as React.SelectHTMLAttributes<HTMLSelectElement>)} // Spread remaining props
                    className={className}
                >
                    {children} {/* 'children' prop is valid and passed here */}
                </select>
            )}
            {/* --- END FIX --- */}

            {/* --- FIX: Render helperText if it exists and there's no error --- */}
            {helperText && !error && (
                <p className="mt-1 text-sm text-gray-400">{helperText}</p>
            )}
            {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
        </div>
    );
};

// --- Reusable Textarea Field ---
// (Updated types for correctness)
type FormTextareaProps = BaseFormProps & { rows?: number } & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const FormTextarea: React.FC<FormTextareaProps> = ({ label, name, error, register, rows = 4, helperText, ...props }) => ( // <-- FIX: Destructure helperText
    <div>
        {label && <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>}
        <textarea
            id={name}
            rows={rows}
            {...register(name)}
            {...props}
            className={`w-full p-3 bg-gray-700 rounded border ${error ? 'border-red-500' : 'border-gray-600'} focus:border-blue-500 focus:ring-blue-500 outline-none transition`}
        />
        {/* --- FIX: Render helperText if it exists and there's no error --- */}
        {helperText && !error && (
            <p className="mt-1 text-sm text-gray-400">{helperText}</p>
        )}
        {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
);

// --- Constants ---
const DOMAIN_OPTIONS = ["Video Editing", "Designing", "Web Dev", "AI/ML", "Public Speaking", "Content Writing", "Marketing", "Event Management"];

// Define which fields belong to which step for validation
const stepFields: (keyof RecruitmentFormData)[][] = [
    // Step 1
    ['fullName', 'email', 'phoneNumber', 'branch', 'year'],
    // Step 2
    ['domains', 'skills', 'roleType', 'experience', 'portfolioLink', 'resumeUrl'],
    // Step 3
    ['hoursPerWeek', 'reasonToJoin', 'takeResponsibility'],
    // Step 4
    ['confirmedInfo', 'dataConsent']
];


// --- Main Form Component ---
export default function RecruitmentForm() {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        trigger, // Function to manually trigger validation
        watch,   // Function to watch field values
        setValue,// Function to set field values
        formState: { errors },
    } = useForm<RecruitmentFormData>({
        resolver: zodResolver(recruitmentSchema),
        mode: "onBlur", // Validate when user leaves a field
        defaultValues: {
            // Set sensible defaults
            branch: 'CSE', // Default branch
            year: 'FIRST',
            roleType: 'VOLUNTEER',
            hoursPerWeek: '3-5',
            domains: [],
            takeResponsibility: false,
            confirmedInfo: false,
            dataConsent: false,
        }
    });

    // Watch domains to update checkboxes
    const watchedDomains = watch('domains');

    // Manually handle domain checkbox changes
    const handleDomainChange = (domain: string) => {
        const currentDomains = watchedDomains || [];
        const newDomains = currentDomains.includes(domain)
            ? currentDomains.filter(d => d !== domain)
            : [...currentDomains, domain];
        setValue('domains', newDomains, { shouldValidate: true, shouldDirty: true });
    };

    // --- Navigation Logic ---
    const handleNext = async () => {
        // Trigger validation for *only* the fields in the current step
        const fieldsToValidate = stepFields[step - 1];
        const isValid = await trigger(fieldsToValidate);

        if (isValid) {
            if (step < 4) {
                setStep(prev => prev + 1);
            }
        }
    };

    const handleBack = () => {
        setStep(prev => prev - 1);
    };

    // --- Submission Logic ---
    const onSubmit: SubmitHandler<RecruitmentFormData> = async (data) => {
        setIsSubmitting(true);
        setApiError(null);

        // This 'data' is fully validated by Zod
        console.log("Submitting:", data);

        // --- FIX: Use axios for the request ---
        try {
            // Replace with your actual API endpoint. axios stringifies data automatically.
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/recruitment/submit`, data);

            // If request is successful (status 2xx), axios resolves
            setStep(5); // Move to a "Thank You" step

        } catch (error) {
            console.error("Submission Error:", error);
            // Handle axios errors
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    // The server responded with a status code (4xx, 5xx)
                    // Use the error message from our backend controller
                    setApiError(error.response.data.error || "An unknown server error occurred.");
                } else if (error.request) {
                    // The request was made but no response was received
                    setApiError("Could not connect to the server. Please check your network.");
                } else {
                    // Something else happened in setting up the request
                    setApiError("An unexpected error occurred while sending your application.");
                }
            } else {
                // Handle non-axios errors
                setApiError("An unexpected error occurred.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex-col bg-[#0e0e0e] text-white flex items-center justify-center p-4 selection:bg-blue-500 selection:text-white">
            <div className='mb-5'>
                <Link href="/">
                    <Capsule text='HOME' variant='cap1'/>
                </Link>
            </div>
            <div className="w-full max-w-2xl bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-700">

                {/* --- Thank You State --- */}
                {step === 5 ? (
                    <div className="text-center py-12 animate-in fade-in duration-500">
                        <h1 className="text-3xl font-bold text-green-400 mb-4">Application Submitted!</h1>
                        <p className="text-gray-300 text-lg">Thank you for applying to Tech and Innovation Club.</p>
                        <p className="text-gray-400 mt-2">We will review your application and get back to you soon.</p>
                    </div>
                ) : (
                    <>
                        {/* --- Progress Bar --- */}
                        <div className="mb-6">
                            <h1 className="text-2xl sm:text-3xl font-bold text-blue-400 mb-2 text-center">Tech & Innovation Recruitment</h1>
                            <div className="flex gap-2 mb-2">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= step ? 'bg-blue-500' : 'bg-gray-600'} transition-all duration-300`} />
                                ))}
                            </div>
                            <p className="text-gray-400 text-sm font-medium">Step {step} of 4</p>
                        </div>

                        {/* --- Form --- */}
                        {/* handleSubmit wraps our onSubmit, only calling it if validation passes */}
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                            {/* --- STEP 1: BASIC DETAILS --- */}
                            {step === 1 && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                                    <h2 className="text-xl font-semibold text-gray-200">1. Basic Details</h2>
                                    <FormInput name="fullName" placeholder="Full Name" register={register} error={errors.fullName?.message} />
                                    <FormInput name="email" type="email" placeholder="Official Email ID" register={register} error={errors.email?.message} />
                                    <FormInput name="phoneNumber" type="tel" placeholder="10-Digit Phone Number" register={register} error={errors.phoneNumber?.message} />
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                        {/* --- UPDATED BRANCH LIST --- */}
                                        <FormInput as="select" label="Branch / Department" name="branch" register={register} error={errors.branch?.message}>
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

                                        <FormInput as="select" label="Year / Semester" name="year" register={register} error={errors.year?.message}>
                                            <option value="FIRST">1st Year</option>
                                            <option value="SECOND">2nd Year</option>
                                            <option value="THIRD">3rd Year</option>
                                            <option value="FOURTH">4th Year</option>
                                        </FormInput>
                                    </div>
                                </div>
                            )}

                            {/* --- STEP 2: DOMAIN & SKILLS --- */}
                            {step === 2 && (
                                <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                                    <h2 className="text-xl font-semibold text-gray-200">2. Domain & Skills</h2>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Area of Interest (Select all that apply)</label>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                            {DOMAIN_OPTIONS.map(domain => (
                                                <label key={domain} className={`flex items-center space-x-2 p-3 rounded-lg cursor-pointer transition ${watchedDomains?.includes(domain) ? 'bg-blue-600 ring-2 ring-blue-400' : 'bg-gray-700 hover:bg-gray-600'}`}>
                                                    <input type="checkbox"
                                                        checked={watchedDomains?.includes(domain)}
                                                        onChange={() => handleDomainChange(domain)}
                                                        className="hidden" // We hide the box and style the label
                                                    />
                                                    <span className="text-sm font-medium">{domain}</span>
                                                </label>
                                            ))}
                                        </div>
                                        {errors.domains && <p className="mt-2 text-sm text-red-400">{errors.domains.message}</p>}
                                    </div>

                                    <FormTextarea name="skills" placeholder="List your skills, tools, and software (e.g., Figma, React, Python, Premiere Pro...)" register={register} error={errors.skills?.message} />

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Role Applying For</label>
                                        <div className="flex gap-4">
                                            {['CORE_TEAM', 'VOLUNTEER'].map(role => (
                                                <label key={role} className="flex items-center space-x-2 p-3 bg-gray-700 rounded-lg flex-1 cursor-pointer hover:bg-gray-600">
                                                    <input type="radio" {...register('roleType')} value={role} className="w-4 h-4 text-blue-500 bg-gray-800 border-gray-600 focus:ring-blue-600 ring-offset-gray-800" />
                                                    <span className="capitalize">{role.replace('_', ' ').toLowerCase()}</span>
                                                </label>
                                            ))}
                                        </div>
                                        {errors.roleType && <p className="mt-2 text-sm text-red-400">{errors.roleType.message}</p>}
                                    </div>

                                    <FormInput name="portfolioLink" placeholder="Portfolio / LinkedIn / GitHub Link (Optional)" register={register} error={errors.portfolioLink?.message} />

                                    {/* Note: File upload needs separate state/logic to upload to S3/Cloudinary and get a URL */}
                                    <FormInput name="resumeUrl" placeholder="Resume URL (e.g., from Google Drive) (Optional)" register={register} error={errors.resumeUrl?.message}
                                        helperText="Please ensure the link is public/accessible."
                                    />
                                    {/* --- FIX: Removed redundant <p> tag that is now handled by helperText --- */}
                                </div>
                            )}

                            {/* --- STEP 3: AVAILABILITY --- */}
                            {step === 3 && (
                                <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                                    <h2 className="text-xl font-semibold text-gray-200">3. Availability & Commitment</h2>

                                    <FormInput as="select" label="Available hours per week" name="hoursPerWeek" register={register} error={errors.hoursPerWeek?.message}>
                                        <option value="1-2">1-2 Hours</option>
                                        <option value="3-5">3-5 Hours</option>
                                        <option value="5-10">5-10 Hours</option>
                                        <option value="10+">10+ Hours</option>
                                    </FormInput>

                                    <FormTextarea name="reasonToJoin" label="Why do you want to join the Tech & Innovation Club?" placeholder="What motivates you? What do you hope to learn or contribute? (Min 50 characters)" register={register} error={errors.reasonToJoin?.message} rows={5} />

                                    <div>
                                        <label className="flex items-start space-x-3 p-3 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600">
                                            <input type="checkbox" {...register('takeResponsibility')} className="w-5 h-5 mt-0.5 text-blue-500 bg-gray-800 border-gray-600 rounded focus:ring-blue-600 ring-offset-gray-800" />
                                            <span>I am willing to take responsibility for events/projects and contribute actively.</span>
                                        </label>
                                        {errors.takeResponsibility && <p className="mt-2 text-sm text-red-400">{errors.takeResponsibility.message}</p>}
                                    </div>
                                </div>
                            )}

                            {/* --- STEP 4: CONFIRMATION --- */}
                            {step === 4 && (
                                <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                                    <h2 className="text-xl font-semibold text-gray-200">4. Final Confirmation</h2>

                                    <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                                        <h3 className="font-semibold text-gray-200 mb-2">Please review your details.</h3>
                                        <ul className="text-sm text-gray-300 space-y-1">
                                            <li><strong>Name:</strong> {watch('fullName') || '...'}</li>
                                            <li><strong>Email:</strong> {watch('email') || '...'}</li>
                                            <li><strong>Role:</strong> {watch('roleType')?.replace('_', ' ').toLowerCase() || '...'}</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <label className="flex items-start space-x-3 p-3 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600">
                                            <input type="checkbox" {...register('confirmedInfo')} className="w-5 h-5 mt-0.5 text-blue-500 bg-gray-800 border-gray-600 rounded focus:ring-blue-600 ring-offset-gray-800" />
                                            <span>I confirm that all information provided is correct and accurate to the best of my knowledge.</span>
                                        </label>
                                        {errors.confirmedInfo && <p className="mt-2 text-sm text-red-400">{errors.confirmedInfo.message}</p>}
                                    </div>

                                    <div>
                                        <label className="flex items-start space-x-3 p-3 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600">
                                            <input type="checkbox" {...register('dataConsent')} className="w-5 h-5 mt-0.5 text-blue-500 bg-gray-800 border-gray-600 rounded focus:ring-blue-600 ring-offset-gray-800" />
                                            <span>I consent to the TechAndInnovation Club storing and using this information for selection and communication purposes.</span>
                                        </label>
                                        {errors.dataConsent && <p className="mt-2 text-sm text-red-400">{errors.dataConsent.message}</p>}
                                    </div>

                                    {apiError && (
                                        <div className="p-3 bg-red-800/50 border border-red-700 text-red-300 rounded-lg text-sm">
                                            <strong>Submission Failed:</strong> {apiError}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* --- NAVIGATION BUTTONS --- */}
                            <div className="flex justify-between items-center mt-8 pt-5 border-t border-gray-700">
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className={`px-6 py-2 bg-gray-600 hover:bg-gray-500 rounded-md font-semibold transition ${step === 1 ? 'opacity-0 invisible' : 'opacity-100 visible'}`}
                                >
                                    Back
                                </button>

                                {step < 4 ? (
                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        className="ml-auto px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-md font-semibold transition shadow-lg shadow-blue-500/20"
                                    >
                                        Next Step &rarr;
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="ml-auto px-8 py-2 bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-md font-bold transition shadow-lg shadow-green-500/20"
                                    >
                                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                                    </button>
                                )}
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}