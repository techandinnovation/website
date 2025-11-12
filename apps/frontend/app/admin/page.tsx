'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
// We can import the type from the schema file
import { RecruitmentFormData } from '../../../backend/src/utils/zodSchema';

// Use the full type from Prisma if available, or extend the form data type
// This ensures we get fields like 'id' and 'createdAt'
type Application = RecruitmentFormData & {
    id: string;
    createdAt: string;
    experience: string | null;
    portfolioLink: string | null;
    resumeUrl: string | null;
};

// --- NEW: Dashboard Content Component ---
// I've moved all your existing dashboard logic into this component.
// It will only be rendered *after* successful authentication.
const AdminDashboardContent = () => {
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedApp, setSelectedApp] = useState<Application | null>(null);

    useEffect(() => {
        const fetchApplications = async () => {
            setLoading(true);
            setError(null);
            try {
                // This is the new endpoint we created
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/recruitment/data`);
                setApplications(response.data);
            } catch (err) {
                console.error("Failed to fetch applications:", err);
                setError("Failed to load applications. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
                <p className="text-xl animate-pulse">Loading Applications...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
                <p className="text-xl text-red-400">{error}</p>
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-gray-900 text-gray-200 p-4 sm:p-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-blue-400 mb-6">Admin Dashboard</h1>
                    <h2 className="text-xl text-gray-300 mb-4">
                        Total Applications: {applications.length}
                    </h2>

                    {/* --- Responsive Container --- */}
                    <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden">

                        {/* --- Desktop Table (Hidden on Mobile) --- */}
                        <table className="min-w-full divide-y divide-gray-700 hidden md:table">
                            <thead className="bg-gray-700/50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Applicant</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Contact</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Role</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Branch/Year</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                                    <th scope="col" className="relative px-6 py-3"><span className="sr-only">Details</span></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {applications.map((app) => (
                                    <tr key={app.id} className="hover:bg-gray-700/50 transition">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-white">{app.fullName}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-300">{app.email}</div>
                                            <div className="text-sm text-gray-400">{app.phoneNumber}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${app.roleType === 'CORE_TEAM' ? 'bg-blue-800 text-blue-200' : 'bg-green-800 text-green-200'
                                                }`}>
                                                {app.roleType.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                            <div>{app.branch}</div>
                                            <div className="text-gray-400">{app.year}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                            {new Date(app.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button onClick={() => setSelectedApp(app)} className="text-blue-400 hover:text-blue-300">
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* --- Mobile Card List (Hidden on Desktop) --- */}
                        <div className="block md:hidden divide-y divide-gray-700">
                            {applications.map((app) => (
                                <div key={app.id} className="p-4 hover:bg-gray-700/50" onClick={() => setSelectedApp(app)}>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-lg font-medium text-white">{app.fullName}</span>
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${app.roleType === 'CORE_TEAM' ? 'bg-blue-800 text-blue-200' : 'bg-green-800 text-green-200'
                                            }`}>
                                            {app.roleType.replace('_', ' ')}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-300">{app.email}</p>
                                    <div className="flex justify-between text-sm text-gray-400 mt-1">
                                        <span>{app.branch} / {app.year}</span>
                                        <span>{new Date(app.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>

            {/* --- Details Modal --- */}
            {selectedApp && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                    onClick={() => setSelectedApp(null)}
                >
                    <div
                        className="w-full max-w-lg bg-gray-800 rounded-lg shadow-xl border border-gray-700 max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center p-4 border-b border-gray-700">
                            <h3 className="text-xl font-semibold text-white">{selectedApp.fullName}</h3>
                            <button onClick={() => setSelectedApp(null)} className="text-gray-400 hover:text-white">
                                &times;
                            </button>
                        </div>

                        <div className="p-6 space-y-4 text-sm">
                            <InfoRow label="Email" value={selectedApp.email} />
                            <InfoRow label="Phone" value={selectedApp.phoneNumber} />
                            <InfoRow label="Branch" value={selectedApp.branch} />
                            <InfoRow label="Year" value={selectedApp.year} />
                            <InfoRow label="Role" value={selectedApp.roleType.replace("_", " ")} />
                            <InfoRow label="Hours/Week" value={selectedApp.hoursPerWeek} />

                            <div className="pt-2">
                                <h4 className="font-semibold text-gray-300 mb-1">Domains</h4>
                                <div className="flex flex-wrap gap-2">
                                    {selectedApp.domains.map((domain) => (
                                        <span key={domain} className="px-2 py-0.5 bg-gray-700 text-gray-200 rounded text-xs">
                                            {domain}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {selectedApp.domainOther && (
                                <div>
                                    <InfoRow label="Domain - Other" value={selectedApp.domainOther} />
                                </div>
                            )}

                            <InfoRow label="Skills" value={selectedApp.skills} isBlock />

                            {selectedApp.skillsOther && (
                                <div>
                                    <InfoRow label="Skills - Other" value={selectedApp.skillsOther} />
                                </div>
                            )}

                            <InfoRow label="Reason to Join" value={selectedApp.reasonToJoin} isBlock />

                            {selectedApp.experience && <InfoRow label="Experience" value={selectedApp.experience} isBlock />}

                            {selectedApp.portfolioLink && <InfoRow label="Portfolio" value={selectedApp.portfolioLink} isLink />}

                            {selectedApp.resumeUrl && <InfoRow label="Resume" value={selectedApp.resumeUrl} isLink />}

                            <div className="pt-2 border-t border-gray-700 text-gray-400">
                                <p>Applied on: {new Date(selectedApp.createdAt).toLocaleString()}</p>
                                <p>Consented to data use: {selectedApp.dataConsent ? "Yes" : "No"}</p>
                                <p>Confirmed info correct: {selectedApp.confirmedInfo ? "Yes" : "No"}</p>
                                <p>Will take responsibility: {selectedApp.takeResponsibility ? "Yes" : "No"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

// --- NEW: Main Component with Login Logic ---
export default function AdminDashboard() {
    // This state controls whether to show the login form or the dashboard
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // State for the login form itself
    const [adminName, setAdminName] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState<string | null>(null);
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoggingIn(true);
        setLoginError(null);

        try {
            // Call the new login endpoint
            await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/login`, { adminName, password });

            // If successful, set authenticated state to true
            setIsAuthenticated(true);

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setLoginError(error.response.data.error || "An unknown error occurred.");
            } else {
                setLoginError("Failed to connect to the server.");
            }
            setIsLoggingIn(false);
        }
        // We don't set isLoggingIn to false on success, as the component will unmount
    };

    // If NOT authenticated, show the login form
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <form
                        onSubmit={handleLogin}
                        className="bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700 space-y-6"
                    >
                        <h1 className="text-2xl font-bold text-center text-blue-400">
                            Tech & Innovation Admin Login
                        </h1>

                        <div>
                            <label
                                htmlFor="adminName"
                                className="block text-sm font-medium text-gray-300 mb-1"
                            >
                                Admin Name
                            </label>
                            <input
                                id="adminName"
                                type="text"
                                value={adminName}
                                onChange={(e) => setAdminName(e.target.value)}
                                required
                                className="w-full p-3 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:ring-blue-500 outline-none transition"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-300 mb-1"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full p-3 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:ring-blue-500 outline-none transition"
                            />
                        </div>

                        {loginError && (
                            <p className="text-sm text-red-400 text-center">{loginError}</p>
                        )}

                        <button
                            type="submit"
                            disabled={isLoggingIn}
                            className="w-full p-3 bg-blue-600 hover:bg-blue-500 rounded-md font-semibold transition shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoggingIn ? 'Logging In...' : 'Login'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // If authenticated, show the main dashboard content
    return <AdminDashboardContent />;
}

// Helper component for the modal
const InfoRow = ({ label, value, isBlock = false, isLink = false }: { label: string, value: string, isBlock?: boolean, isLink?: boolean }) => (
    <div className={isBlock ? '' : 'grid grid-cols-3 gap-2'}>
        <dt className="font-medium text-gray-400 col-span-1">{label}</dt>
        <dd className="text-gray-200 col-span-2">
            {isLink ? (
                <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline break-all">{value}</a>
            ) : (
                <p className="whitespace-pre-wrap wrap-break-word">{value}</p>
            )}
        </dd>
    </div>
);