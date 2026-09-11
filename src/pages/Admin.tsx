import { useState, useEffect } from 'react';
import axios from 'axios';

// Backend URL - use local for development, production for deployed site
const API_BASE_URL = "https://thebreakpoint-backend.onrender.com"; // Production
// const API_BASE_URL = "http://localhost:5001"; // Local development
const API_URL = `${API_BASE_URL}/api`;

interface ContactSubmission {
    _id: string;
    name: string;
    email: string;
    contact: string;
    subject: string;
    message?: string;
    createdAt: string;
}

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [contacts, setContacts] = useState<ContactSubmission[]>([]);
    const [loadingContacts, setLoadingContacts] = useState(false);

    // Check if already authenticated on mount
    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            verifyToken(token);
        }
    }, []);

    const verifyToken = async (token: string) => {
        try {
            const response = await axios.get(`${API_URL}/admin/verify`, {
                headers: { 'x-auth-token': token }
            });
            if (response.data.success) {
                setIsAuthenticated(true);
                fetchContacts(token);
            } else {
                localStorage.removeItem('adminToken');
            }
        } catch (err) {
            localStorage.removeItem('adminToken');
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post(`${API_URL}/admin/login`, {
                password
            });

            if (response.data.success) {
                localStorage.setItem('adminToken', response.data.token);
                setIsAuthenticated(true);
                setPassword('');
                fetchContacts(response.data.token);
            }
        } catch (err: any) {
            setError(err.response?.data?.msg || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const fetchContacts = async (token: string) => {
        setLoadingContacts(true);
        try {
            const response = await axios.get(`${API_URL}/admin/contacts`, {
                headers: { 'x-auth-token': token }
            });

            if (response.data.success) {
                setContacts(response.data.data);
            }
        } catch (err: any) {
            setError('Failed to fetch contact submissions');
            console.error('Error fetching contacts:', err);
        } finally {
            setLoadingContacts(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        setIsAuthenticated(false);
        setContacts([]);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-ink-950 px-4">
                <div className="w-full max-w-md">
                    {/* Login Card */}
                    <div className="surface surface-hi bg-ink-900/70 backdrop-blur-xl p-8">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-ice-300/10 text-ice-300 border hairline rounded-full mb-4">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h1 className="text-3xl font-medium tracking-[-0.02em] text-mist-50 mb-2">Admin Panel</h1>
                            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-mist-700">Enter password to access dashboard</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div>
                                <label htmlFor="password" className="block font-mono text-[10px] uppercase tracking-[0.18em] text-mist-500 mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3.5 bg-ink-950/60 border hairline rounded-xl text-mist-50 placeholder-mist-700 outline-none focus:border-ice-300/50 focus:ring-2 focus:ring-ice-300/15 transition-all"
                                    placeholder="Enter admin password"
                                    required
                                />
                            </div>

                            {error && (
                                <div className="bg-red-500/10 border border-red-500/40 rounded-xl p-3 text-red-300 text-sm">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-ice-300 text-ink-950 font-medium rounded-full hover:bg-ice-200 focus:outline-none focus:ring-2 focus:ring-ice-300/60 focus:ring-offset-2 focus:ring-offset-ink-950 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Authenticating...' : 'Login'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-ink-950 pt-28 pb-16 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        {/* <h1 className="text-4xl font-bold text-white mb-2">Contact Submissions</h1> */}
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-mist-700">
                            {contacts.length} {contacts.length === 1 ? 'submission' : 'submissions'} total
                        </p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="px-6 py-3 border hairline bg-ink-900/70 hover:border-ice-300/40 hover:bg-ice-300/[0.06] text-mist-50 text-sm font-medium rounded-full transition-all flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                    </button>
                </div>

                {/* Loading State */}
                {loadingContacts ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-ice-300"></div>
                    </div>
                ) : contacts.length === 0 ? (
                    <div className="surface bg-ink-900/70 backdrop-blur-xl p-12 text-center">
                        <svg className="w-14 h-14 text-mist-700 mx-auto mb-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <h3 className="text-xl font-medium tracking-[-0.01em] text-mist-50 mb-2">No submissions yet</h3>
                        <p className="text-[15px] text-mist-500">Contact form submissions will appear here</p>
                    </div>
                ) : (
                    <div className="surface bg-ink-900/70 backdrop-blur-xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-ink-800/60 border-b hairline">
                                        <th className="px-6 py-4 text-left font-mono text-[10px] font-normal text-mist-500 uppercase tracking-[0.18em]">
                                            Name
                                        </th>
                                        <th className="px-6 py-4 text-left font-mono text-[10px] font-normal text-mist-500 uppercase tracking-[0.18em]">
                                            Email
                                        </th>
                                        <th className="px-6 py-4 text-left font-mono text-[10px] font-normal text-mist-500 uppercase tracking-[0.18em]">
                                            Contact
                                        </th>
                                        <th className="px-6 py-4 text-left font-mono text-[10px] font-normal text-mist-500 uppercase tracking-[0.18em]">
                                            Subject
                                        </th>
                                        <th className="px-6 py-4 text-left font-mono text-[10px] font-normal text-mist-500 uppercase tracking-[0.18em]">
                                            Message
                                        </th>
                                        <th className="px-6 py-4 text-left font-mono text-[10px] font-normal text-mist-500 uppercase tracking-[0.18em]">
                                            Date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[color:var(--line)]">
                                    {contacts.map((contact) => (
                                        <tr key={contact._id} className="hover:bg-ice-300/[0.03] transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-mist-50">{contact.name}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-mist-300/85">{contact.email}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-mist-300/85">{contact.contact}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-mist-300/85 max-w-xs truncate">{contact.subject}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-mist-500 max-w-md truncate">
                                                    {contact.message || <span className="italic text-mist-700">No message</span>}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-mist-500">{formatDate(contact.createdAt)}</div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;
