'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Coins, Shirt, Bus, Home, Save, Loader2, Plus, Trash2, CheckCircle2, Calendar, CreditCard, Clock, MapPin, FileText, Scissors, ShoppingBag, AlertCircle, ShieldCheck, MessageSquare, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EditableText } from '@/components/admin/EditableText';
import { DeletableWrapper } from '@/components/admin/deletable-wrapper';
import { getPageContent, savePageContent } from '@/app/actions/settings';
import { toast } from 'sonner';


// Define interfaces for state to avoid implicit any errors
interface PolicyState {
    title: string;
    description: string;
    eligibility: {
        age: string[];
        priorities: string[];
    };
    documents: string[];
}

interface FeeItem { name: string; amount: string; }
interface FeeState {
    title: string;
    description: string;
    admission: { title: string; items: FeeItem[] };
    monthly: { title: string; items: FeeItem[] };
    bankDetails: { accountName: string; bankName: string; accountNumber: string };
    scholarships: string[];
    notes: string[];
}

interface UniformState {
    title: string;
    description: string;
    regular: { days: string; items: string[] };
    sports: { days: string; items: string[] };
    grooming: { hair: string; accessories: string; nails: string; hygiene: string };
    vendor: { name: string; address: string; phone: string };
    policyNote: string;
}

interface TransportZone { name: string; stops: string; fee: string; }
interface TransportState {
    title: string;
    description: string;
    zones: TransportZone[];
    rules: string[];
    safetyFeatures: { title: string; desc: string; icon: string }[];
    contact: { name: string; phone: string; hours: string };
}

interface BoardingFeature { title: string; desc: string; }
interface BoardingSchedule { time: string; activity: string; }
interface BoardingMenu { type: string; items: string; }
interface BoardingState {
    title: string;
    description: string;
    features: BoardingFeature[];
    schedule: BoardingSchedule[];
    menu: BoardingMenu[];
    visitation: string;
}

interface InquiryState {
    hero: { title: string; subtitle: string };
    whyChoose: string[];
}

const defaultInquiry: InquiryState = {
    hero: {
        title: 'Start Your Journey',
        subtitle: 'We\'d love to hear from you. Fill out the inquiry form below, and our admissions team will get back to you shortly.'
    },
    whyChoose: [
        'Experienced & Caring Faculty',
        'Safe & Spacious Environment',
        'Modern Teaching Methodology',
        'Focus on Moral Values',
        'Extensive ECA Programs'
    ]
};

const defaultPolicy: PolicyState = {
    title: 'Admission Policy',
    description: 'Our admission process is designed to be fair, transparent, and inclusive, ensuring every child fits perfectly into the Sankalpa Vatika family.',
    eligibility: {
        age: [
            'Nursery: 3+ Years by Baisakh 1st',
            'LKG: 4+ Years',
            'UKG: 5+ Years',
            'Grade 1: 6+ Years'
        ],
        priorities: [
            'Siblings of current students',
            'Children of school staff',
            'Local residents within 2km radius',
            'Transfer cases (Government/Bank employees)'
        ]
    },
    documents: [
        'Birth Certificate (Original + Copy)',
        'Recent Passport Size Photos (4 pcs)',
        'Previous School Transfer Certificate (TC)',
        'Last Grade Marksheet/Report Card',
        'Citizenship Copy of Parents/Guardians',
        'Medical Record (if specific needs)'
    ]
};

const defaultFee: FeeState = {
    title: 'Fee Structure',
    description: 'Transparent and affordable quality education. We believe in providing value for every rupee spent on your child\'s future.',
    admission: {
        title: 'Admission Fees',
        items: [
            { name: 'Admission Fee', amount: 'Rs. X,XXX' },
            { name: 'Security Deposit', amount: 'Rs. X,XXX (Refundable)' },
            { name: 'Prospectus & Form', amount: 'Rs. XXX' },
        ]
    },
    monthly: {
        title: 'Annual & Monthly Charges',
        items: [
            { name: 'Annual Charge', amount: 'Rs. X,XXX / Year' },
            { name: 'Tuition Fee (Nursery - UKG)', amount: 'Rs. X,XXX / Month' },
            { name: 'Tuition Fee (Grade 1 - 5)', amount: 'Rs. X,XXX / Month' },
            { name: 'Tuition Fee (Grade 6 - 8)', amount: 'Rs. X,XXX / Month' },
            { name: 'Tuition Fee (Grade 9 - 10)', amount: 'Rs. X,XXX / Month' },
        ]
    },
    bankDetails: {
        accountName: 'Sankalpa Vatika School',
        bankName: 'NIC Asia Bank, Lahan Branch',
        accountNumber: '1234567890XXX'
    },
    scholarships: [
        'Merit-based scholarships for class toppers.',
        'Sibling discount (15% for the younger child).',
        'Need-based financial aid for deserving students.'
    ],
    notes: [
        'Fees must be paid by the 10th of every Nepali month.',
        'Late fee will be charged after the due date.',
        'Annual charges cover stationery, medical, and exam fees.',
        'Transportation & Food fees are separate.'
    ]
};

const defaultUniform: UniformState = {
    title: 'School Uniform',
    description: 'A symbol of unity, discipline, and pride. Wearing the school uniform fosters a sense of belonging and equality among our students.',
    regular: {
        days: 'Sunday - Tuesday - Thursday',
        items: [
            'White shirt with school logo',
            'Navy blue trousers',
            'Black leather shoes',
            'Navy blue socks',
            'School tie & belt'
        ]
    },
    sports: {
        days: 'Monday - Wednesday - Friday',
        items: [
            'House T-Shirt (Red/Green/Yellow/Blue)',
            'White trousers or track pants with house stripes',
            'White canvas shoes with white socks',
            'School Tracksuit set (Winter)'
        ]
    },
    grooming: {
        hair: 'Boys must keep hair short and neat. Girls with long hair must braid it with red ribbons. No fancy haircuts or coloring allowed.',
        accessories: 'Minimal jewelry (small studs for girls). Watches allowed for Grade 6+. Smartwatches are prohibited.',
        nails: 'Nails must be trimmed short and kept clean. Nail polish is strictky prohibited.',
        hygiene: 'Uniforms must be washed and ironed. Shoes must be polished daily.'
    },
    vendor: {
        name: 'Sankalpa Stationaries',
        address: 'Main Road, Lahan',
        phone: '033-XXXXXX'
    },
    policyNote: 'Students without proper uniform may be sent home. Please ensure compliance from Day 1.'
};

const defaultTransport: TransportState = {
    title: 'School Transport',
    description: 'Connecting students from Lahan and surrounding areas with a safe, punctual, and comfortable daily commute.',
    zones: [
        { name: 'Zone A', stops: 'Lahan Bazaar, Hospital Chowk, Campus Road', fee: 'Rs. XXX' },
        { name: 'Zone B', stops: 'Bastipur, Matiyarwa, Gramin Chowk', fee: 'Rs. XXX' },
        { name: 'Zone C', stops: 'Dhangadhi, Golbazar (Main Highway only)', fee: 'Rs. XXX' },
        { name: 'Zone D', stops: 'Bariyarpatti, Siraha Road', fee: 'Rs. XXX' }
    ],
    rules: [
        'Students must be at the pickup point 5 minutes early.',
        'Standing on the footboard is strictly prohibited.',
        'Eating or littering inside the bus is not allowed.',
        'Bullying or loud noise is strictly monitored.',
        'Students must not put hands or head out of the window.'
    ],
    safetyFeatures: [
        { title: 'Safety First', desc: 'Every bus is equipped with GPS tracking, First Aid kits, and CCTV cameras. A dedicated helper is present on every route.', icon: 'ShieldCheck' },
        { title: 'Punctuality', desc: 'We pride ourselves on strict adherence to schedules, ensuring students arrive on time and are dropped off safely before dusk.', icon: 'Clock' },
        { title: 'Wide Coverage', desc: 'Our fleet covers extensive routes across Lahan Municipality and nearby rural municipalities.', icon: 'MapPin' }
    ],
    contact: {
        name: 'Mr. Transport Manager',
        phone: '98XXXXXXXX',
        hours: 'Available 6:00 AM - 6:00 PM'
    }
};

const defaultBoarding: BoardingState = {
    title: 'Boarding Facilities',
    description: 'A nurturing environment where students learn independence, camaraderie, and discipline under expert pastoral care.',
    features: [
        { title: 'Comfortable Dorms', desc: 'Spacious, air-conditioned rooms with individual lockers and study desks.' },
        { title: 'Healthy Meals', desc: 'Nutritious vegetarian and non-vegetarian meals prepared in a hygienic kitchen.' },
        { title: 'Evening Prep', desc: 'Supervised study hours with subject teachers available for doubt clearing.' },
        { title: '24/7 Wardens', desc: 'Dedicated matrons and wardens ensuring safety and emotional well-being.' },
    ],
    schedule: [
        { time: '05:30 AM', activity: 'Wake Up & Morning Exercise / Yoga' },
        { time: '07:00 AM', activity: 'Breakfast' },
        { time: '08:45 AM', activity: 'School Assembly & Classes' },
        { time: '04:15 PM', activity: 'Snacks & Sports / Games' },
        { time: '06:00 PM', activity: 'Evening Prayer & Study Prep' },
        { time: '08:00 PM', activity: 'Dinner' },
        { time: '09:30 PM', activity: 'Lights Out' },
    ],
    menu: [
        { type: 'Breakfast', items: 'Chana-Anda, Haluwa, Bread-Jam, Milk' },
        { type: 'Lunch', items: 'Rice, Dal, Seasonal Veg, Salad, Achar (Chicken/Paneer twice a week)' },
        { type: 'Snacks', items: 'Noodles, Fruits, Biscuits, Tea' }
    ],
    visitation: 'Parents can visit their wards on the last Saturday of every month between 10:00 AM - 2:00 PM. In case of emergencies, please contact the warden.'
};


export default function AdminAdmissionsPage() {
    const [activeTab, setActiveTab] = useState<'policy' | 'fee' | 'uniform' | 'transport' | 'boarding' | 'inquiry'>('policy');
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);

    const [policy, setPolicy] = useState<PolicyState>(defaultPolicy);
    const [fee, setFee] = useState<FeeState>(defaultFee);
    const [uniform, setUniform] = useState<UniformState>(defaultUniform);
    const [transport, setTransport] = useState<TransportState>(defaultTransport);
    const [boarding, setBoarding] = useState<BoardingState>(defaultBoarding);
    const [inquiry, setInquiry] = useState<InquiryState>(defaultInquiry);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            const policyData = await getPageContent('admissions_policy');
            if (policyData.success && policyData.data) setPolicy(prev => ({ ...prev, ...policyData.data }));

            const feeData = await getPageContent('admissions_fee');
            if (feeData.success && feeData.data) setFee(prev => ({ ...prev, ...feeData.data }));

            const uniformData = await getPageContent('admissions_uniform');
            if (uniformData.success && uniformData.data) setUniform(prev => ({ ...prev, ...uniformData.data }));

            const transportData = await getPageContent('admissions_transport');
            if (transportData.success && transportData.data) setTransport(prev => ({ ...prev, ...transportData.data }));

            const boardingData = await getPageContent('admissions_boarding');
            if (boardingData.success && boardingData.data) setBoarding(prev => ({ ...prev, ...boardingData.data }));

            const inquiryData = await getPageContent('admissions_inquiry');
            if (inquiryData.success && inquiryData.data) setInquiry(prev => ({ ...prev, ...inquiryData.data }));
            setLoading(false);
        };
        load();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        let content: any = {};
        if (activeTab === 'policy') content = policy;
        if (activeTab === 'fee') content = fee;
        if (activeTab === 'uniform') content = uniform;
        if (activeTab === 'transport') content = transport;
        if (activeTab === 'boarding') content = boarding;
        if (activeTab === 'inquiry') content = inquiry;

        const result = await savePageContent(`admissions_${activeTab}`, content);
        if (result.success) toast.success('Changes saved successfully');
        else toast.error('Failed to save changes');
        setSaving(false);
    };

    // Helper to render the Hero Section with different gradients based on tab
    const renderHero = (title: string, subtitleKey: string, setFunction: any, state: any, gradient: string, patternOpacity = 'opacity-10') => (
        <section className={`relative py-12 ${gradient} text-white overflow-hidden rounded-t-3xl -mx-4 -mt-4 mb-8`}>
            <div className={`absolute inset-0 ${patternOpacity} bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]`}></div>
            <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
                < EditableText
                    value={state.title || title}
                    onChange={(val: string) => setFunction({ ...state, title: val })}
                    className="text-4xl md:text-5xl font-black mb-4 bg-transparent text-center w-full"
                />
                <div className="text-lg md:text-xl opacity-90 mx-auto">
                    <EditableText
                        value={state.description || 'Description'}
                        onChange={(val: string) => setFunction({ ...state, description: val })}
                        multiline
                        className="bg-transparent text-center w-full min-h-[60px]"
                    />
                </div>
            </div>
        </section>
    );

    if (loading) return <div className="p-12 text-center text-muted">Loading admissions data...</div>;

    const tabs = [
        { id: 'policy', label: 'Policy', icon: Shield, color: 'bg-blue-600' },
        { id: 'fee', label: 'Fees', icon: Coins, color: 'bg-indigo-600' },
        { id: 'uniform', label: 'Uniform', icon: Shirt, color: 'bg-emerald-600' },
        { id: 'transport', label: 'Transport', icon: Bus, color: 'bg-amber-600' },
        { id: 'boarding', label: 'Boarding', icon: Home, color: 'bg-stone-600' },
        { id: 'inquiry', label: 'Inquiry', icon: MessageSquare, color: 'bg-purple-600' },
    ];

    return (
        <div className="space-y-4">
            {/* Admin Controls Header */}
            <div className="sticky top-14 z-30 bg-background/95 backdrop-blur border-b border-border py-2 px-4 flex items-center justify-between">
                <div className="flex bg-surface rounded-xl p-1 shadow-sm overflow-x-auto no-scrollbar">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 whitespace-nowrap text-sm font-bold ${activeTab === tab.id
                                ? `${tab.color} text-white shadow-md`
                                : 'text-muted hover:bg-surface-hover hover:text-foreground'
                                }`}
                        >
                            <tab.icon className="h-4 w-4" />
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>
                <Button onClick={handleSave} disabled={saving} className="bg-green-600 hover:bg-green-700 text-white shadow-md">
                    {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                    Save
                </Button>
            </div>

            <div className="bg-background min-h-screen pb-20">
                <AnimatePresence mode="wait">

                    {/* POLICY TAB */}
                    {activeTab === 'policy' && (
                        <motion.div key="policy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            {renderHero('Admission Policy', 'description', setPolicy, policy, 'bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900')}

                            <div className="max-w-4xl mx-auto px-4 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center"><Calendar className="w-5 h-5 text-blue-600" /></div>
                                            <h3 className="text-lg font-bold text-blue-800 dark:text-blue-200">Age Eligibility</h3>
                                        </div>
                                        <div className="space-y-3">
                                            {policy.eligibility.age.map((item: string, i: number) => (
                                                <DeletableWrapper key={i} onDelete={() => {
                                                    const newAge = policy.eligibility.age.filter((_: string, idx: number) => idx !== i);
                                                    setPolicy({ ...policy, eligibility: { ...policy.eligibility, age: newAge } });
                                                }}>
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></div>
                                                        <EditableText value={item} onChange={(val: string) => {
                                                            const newAge = [...policy.eligibility.age]; newAge[i] = val; setPolicy({ ...policy, eligibility: { ...policy.eligibility, age: newAge } });
                                                        }} className="w-full bg-transparent border-b border-transparent focus:border-blue-300" />
                                                    </div>
                                                </DeletableWrapper>
                                            ))}
                                            <Button variant="ghost" size="sm" className="text-blue-600" onClick={() => setPolicy({ ...policy, eligibility: { ...policy.eligibility, age: [...policy.eligibility.age, 'New Requirement'] } })}><Plus className="h-4 w-4 mr-2" /> Add</Button>
                                        </div>
                                    </div>

                                    <div className="bg-amber-50 dark:bg-amber-900/10 p-6 rounded-2xl border border-amber-100 dark:border-amber-900/30">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/50 rounded-xl flex items-center justify-center"><CheckCircle2 className="w-5 h-5 text-amber-600" /></div>
                                            <h3 className="text-lg font-bold text-amber-800 dark:text-amber-200">Admission Priority</h3>
                                        </div>
                                        <div className="space-y-3">
                                            {policy.eligibility.priorities.map((item: string, i: number) => (
                                                <DeletableWrapper key={i} onDelete={() => {
                                                    const newPriorities = policy.eligibility.priorities.filter((_: string, idx: number) => idx !== i);
                                                    setPolicy({ ...policy, eligibility: { ...policy.eligibility, priorities: newPriorities } });
                                                }}>
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></div>
                                                        <EditableText value={item} onChange={(val: string) => {
                                                            const newPriorities = [...policy.eligibility.priorities]; newPriorities[i] = val; setPolicy({ ...policy, eligibility: { ...policy.eligibility, priorities: newPriorities } });
                                                        }} className="w-full bg-transparent border-b border-transparent focus:border-amber-300" />
                                                    </div>
                                                </DeletableWrapper>
                                            ))}
                                            <Button variant="ghost" size="sm" className="text-amber-600" onClick={() => setPolicy({ ...policy, eligibility: { ...policy.eligibility, priorities: [...policy.eligibility.priorities, 'New Priority'] } })}><Plus className="h-4 w-4 mr-2" /> Add</Button>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6 mt-12">
                                    <div className="flex items-center gap-3 border-b border-border pb-4">
                                        <FileText className="w-6 h-6 text-blue-600" />
                                        <h3 className="text-xl font-bold">Mandatory Documents</h3>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {policy.documents.map((req, i) => (
                                            <DeletableWrapper key={i} onDelete={() => {
                                                const newDocs = policy.documents.filter((_, idx) => idx !== i);
                                                setPolicy({ ...policy, documents: newDocs });
                                            }}>
                                                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors w-full">
                                                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                                                    <EditableText
                                                        value={req}
                                                        onChange={(val: string) => {
                                                            const newDocs = [...policy.documents];
                                                            newDocs[i] = val;
                                                            setPolicy({ ...policy, documents: newDocs });
                                                        }}
                                                        className="text-sm font-medium bg-transparent w-full"
                                                    />
                                                </div>
                                            </DeletableWrapper>
                                        ))}
                                        <Button variant="outline" className="h-[52px] border-dashed w-full" onClick={() => setPolicy({ ...policy, documents: [...policy.documents, 'New Document'] })}>
                                            <Plus className="h-4 w-4 mr-2" /> Add Document
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* FEE TAB */}
                    {activeTab === 'fee' && (
                        <motion.div key="fee" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            {renderHero('Fee Structure', 'description', setFee, fee, 'bg-gradient-to-br from-indigo-900 to-purple-900')}

                            <div className="max-w-6xl mx-auto px-4 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="bg-surface border border-border rounded-3xl p-8 shadow-md">
                                        <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-6 text-blue-600"><Coins className="w-6 h-6" /></div>
                                        <h3 className="text-2xl font-bold mb-6">One-Time Fees</h3>
                                        <div className="space-y-4">
                                            {fee.admission.items.map((item: FeeItem, i: number) => (
                                                <DeletableWrapper key={i} onDelete={() => {
                                                    const newItems = fee.admission.items.filter((_: FeeItem, idx: number) => idx !== i);
                                                    setFee({ ...fee, admission: { ...fee.admission, items: newItems } });
                                                }}>
                                                    <div className="flex justify-between items-center py-2 border-b border-border">
                                                        <EditableText value={item.name} onChange={(val: string) => { const newItems = [...fee.admission.items]; newItems[i].name = val; setFee({ ...fee, admission: { ...fee.admission, items: newItems } }); }} className="font-medium bg-transparent" />
                                                        <EditableText value={item.amount} onChange={(val: string) => { const newItems = [...fee.admission.items]; newItems[i].amount = val; setFee({ ...fee, admission: { ...fee.admission, items: newItems } }); }} className="font-bold text-lg bg-transparent text-right" />
                                                    </div>
                                                </DeletableWrapper>
                                            ))}
                                            <Button variant="outline" size="sm" onClick={() => setFee({ ...fee, admission: { ...fee.admission, items: [...fee.admission.items, { name: 'New Fee', amount: 'Rs. 0' }] } })}>Add Fee</Button>
                                        </div>
                                    </div>

                                    <div className="bg-surface border border-border rounded-3xl p-8 shadow-md">
                                        <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-2xl mb-6 text-purple-600"><CreditCard className="w-6 h-6" /></div>
                                        <h3 className="text-2xl font-bold mb-6">Monthly Charges</h3>
                                        <div className="space-y-4">
                                            {fee.monthly.items.map((item: FeeItem, i: number) => (
                                                <DeletableWrapper key={i} onDelete={() => {
                                                    const newItems = fee.monthly.items.filter((_: FeeItem, idx: number) => idx !== i);
                                                    setFee({ ...fee, monthly: { ...fee.monthly, items: newItems } });
                                                }}>
                                                    <div className="flex justify-between items-center py-2 border-b border-border">
                                                        <EditableText value={item.name} onChange={(val: string) => { const newItems = [...fee.monthly.items]; newItems[i].name = val; setFee({ ...fee, monthly: { ...fee.monthly, items: newItems } }); }} className="font-medium bg-transparent" />
                                                        <EditableText value={item.amount} onChange={(val: string) => { const newItems = [...fee.monthly.items]; newItems[i].amount = val; setFee({ ...fee, monthly: { ...fee.monthly, items: newItems } }); }} className="font-bold text-lg bg-transparent text-right" />
                                                    </div>
                                                </DeletableWrapper>
                                            ))}
                                            <Button variant="outline" size="sm" onClick={() => setFee({ ...fee, monthly: { ...fee.monthly, items: [...fee.monthly.items, { name: 'New Fee', amount: 'Rs. 0' }] } })}>Add Fee</Button>
                                        </div>
                                    </div>
                                </div>

                                {/* Additional Fee Info */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                                    <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-2xl p-6">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/50 rounded-lg flex items-center justify-center"><Calendar className="w-4 h-4 text-amber-600" /></div>
                                            <h4 className="text-lg font-bold text-amber-800 dark:text-amber-200">Scholarships</h4>
                                        </div>
                                        <div className="space-y-2">
                                            {(fee.scholarships || []).map((item, i) => (
                                                <DeletableWrapper key={i} onDelete={() => {
                                                    const newItems = fee.scholarships.filter((_, idx) => idx !== i);
                                                    setFee({ ...fee, scholarships: newItems });
                                                }}>
                                                    <div className="flex items-start gap-2">
                                                        <span className="text-amber-500 font-bold mt-1">•</span>
                                                        <EditableText value={item} onChange={(val: string) => {
                                                            const newItems = [...fee.scholarships];
                                                            newItems[i] = val;
                                                            setFee({ ...fee, scholarships: newItems });
                                                        }} multiline className="text-sm text-muted-foreground bg-transparent w-full" />
                                                    </div>
                                                </DeletableWrapper>
                                            ))}
                                            <Button variant="ghost" size="sm" className="text-amber-600 w-full justify-start" onClick={() => setFee({ ...fee, scholarships: [...(fee.scholarships || []), 'New Scholarship'] })}>
                                                <Plus className="h-3 w-3 mr-2" /> Add Scholarship
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="bg-slate-50 dark:bg-slate-900/20 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-8 h-8 bg-slate-200 dark:bg-slate-800 rounded-lg flex items-center justify-center"><CreditCard className="w-4 h-4 text-slate-600" /></div>
                                            <h4 className="text-lg font-bold">Bank Details</h4>
                                        </div>
                                        <div className="space-y-3 text-sm">
                                            <div>
                                                <div className="text-muted text-xs uppercase font-bold mb-1">Account Name</div>
                                                <EditableText value={fee.bankDetails?.accountName || ''} onChange={(val: string) => setFee({ ...fee, bankDetails: { ...fee.bankDetails, accountName: val } })} className="font-bold bg-white dark:bg-slate-800 p-1 rounded border border-transparent focus:border-border w-full" />
                                            </div>
                                            <div>
                                                <div className="text-muted text-xs uppercase font-bold mb-1">Bank Name</div>
                                                <EditableText value={fee.bankDetails?.bankName || ''} onChange={(val: string) => setFee({ ...fee, bankDetails: { ...fee.bankDetails, bankName: val } })} className="font-bold bg-white dark:bg-slate-800 p-1 rounded border border-transparent focus:border-border w-full" />
                                            </div>
                                            <div>
                                                <div className="text-muted text-xs uppercase font-bold mb-1">Account Number</div>
                                                <EditableText value={fee.bankDetails?.accountNumber || ''} onChange={(val: string) => setFee({ ...fee, bankDetails: { ...fee.bankDetails, accountNumber: val } })} className="font-bold font-mono bg-white dark:bg-slate-800 p-1 rounded border border-transparent focus:border-border w-full" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-2xl p-6">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center"><CheckCircle2 className="w-4 h-4 text-blue-600" /></div>
                                            <h4 className="text-lg font-bold text-blue-800 dark:text-blue-200">Notes</h4>
                                        </div>
                                        <div className="space-y-2">
                                            {(fee.notes || []).map((item, i) => (
                                                <DeletableWrapper key={i} onDelete={() => {
                                                    const newItems = fee.notes.filter((_, idx) => idx !== i);
                                                    setFee({ ...fee, notes: newItems });
                                                }}>
                                                    <div className="flex items-start gap-2">
                                                        <span className="text-blue-500 font-bold mt-1">•</span>
                                                        <EditableText value={item} onChange={(val: string) => {
                                                            const newItems = [...fee.notes];
                                                            newItems[i] = val;
                                                            setFee({ ...fee, notes: newItems });
                                                        }} multiline className="text-sm text-muted-foreground bg-transparent w-full" />
                                                    </div>
                                                </DeletableWrapper>
                                            ))}
                                            <Button variant="ghost" size="sm" className="text-blue-600 w-full justify-start" onClick={() => setFee({ ...fee, notes: [...(fee.notes || []), 'New Note'] })}>
                                                <Plus className="h-3 w-3 mr-2" /> Add Note
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* UNIFORM TAB */}
                    {activeTab === 'uniform' && (
                        <motion.div key="uniform" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            {renderHero('School Uniform', 'description', setUniform, uniform, 'bg-gradient-to-r from-teal-900 to-emerald-900')}

                            <div className="max-w-7xl mx-auto px-4 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="bg-surface border border-border rounded-3xl overflow-hidden shadow-xl p-8">
                                        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                            <span className="w-3 h-8 bg-blue-600 rounded-full inline-block"></span>
                                            Regular Days
                                        </h3>
                                        <EditableText value={uniform.regular.days} onChange={(val: string) => setUniform({ ...uniform, regular: { ...uniform.regular, days: val } })} className="text-sm font-bold text-muted mb-4 bg-transparent" />
                                        <div className="space-y-3">
                                            {uniform.regular.items.map((item: string, i: number) => (
                                                <DeletableWrapper key={i} onDelete={() => {
                                                    const newItems = uniform.regular.items.filter((_: string, idx: number) => idx !== i);
                                                    setUniform({ ...uniform, regular: { ...uniform.regular, items: newItems } });
                                                }}>
                                                    <div className="flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                                                        <EditableText value={item} onChange={(val: string) => { const newItems = [...uniform.regular.items]; newItems[i] = val; setUniform({ ...uniform, regular: { ...uniform.regular, items: newItems } }); }} className="w-full bg-transparent" />
                                                    </div>
                                                </DeletableWrapper>
                                            ))}
                                            <Button variant="ghost" size="sm" onClick={() => setUniform({ ...uniform, regular: { ...uniform.regular, items: [...uniform.regular.items, 'New Item'] } })}><Plus className="h-4 w-4 mr-2" /> Add Item</Button>
                                        </div>
                                    </div>

                                    <div className="bg-surface border border-border rounded-3xl overflow-hidden shadow-xl p-8">
                                        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                            <span className="w-3 h-8 bg-orange-500 rounded-full inline-block"></span>
                                            Sports Days
                                        </h3>
                                        <EditableText value={uniform.sports.days} onChange={(val: string) => setUniform({ ...uniform, sports: { ...uniform.sports, days: val } })} className="text-sm font-bold text-muted mb-4 bg-transparent" />
                                        <div className="space-y-3">
                                            {uniform.sports.items.map((item: string, i: number) => (
                                                <DeletableWrapper key={i} onDelete={() => {
                                                    const newItems = uniform.sports.items.filter((_: string, idx: number) => idx !== i);
                                                    setUniform({ ...uniform, sports: { ...uniform.sports, items: newItems } });
                                                }}>
                                                    <div className="flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0"></span>
                                                        <EditableText value={item} onChange={(val: string) => { const newItems = [...uniform.sports.items]; newItems[i] = val; setUniform({ ...uniform, sports: { ...uniform.sports, items: newItems } }); }} className="w-full bg-transparent" />
                                                    </div>
                                                </DeletableWrapper>
                                            ))}
                                            <Button variant="ghost" size="sm" onClick={() => setUniform({ ...uniform, sports: { ...uniform.sports, items: [...uniform.sports.items, 'New Item'] } })}><Plus className="h-4 w-4 mr-2" /> Add Item</Button>
                                        </div>
                                    </div>
                                </div>

                                {/* Additional Uniform Info */}
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                                    <div className="lg:col-span-2 bg-background border border-border rounded-2xl p-8 shadow-sm">
                                        <div className="flex items-center gap-3 mb-6">
                                            <Scissors className="w-6 h-6 text-foreground" />
                                            <h3 className="text-xl font-bold">Grooming Standards</h3>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            {['hair', 'accessories', 'nails', 'hygiene'].map((bgKey) => (
                                                <div key={bgKey}>
                                                    <h4 className="font-bold mb-2 text-sm uppercase text-muted">{bgKey}</h4>
                                                    <EditableText
                                                        value={(uniform.grooming as any)?.[bgKey] || ''}
                                                        onChange={(val: string) => setUniform({ ...uniform, grooming: { ...uniform.grooming, [bgKey]: val } })}
                                                        multiline
                                                        className="text-sm leading-relaxed bg-transparent w-full min-h-[60px]"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-2xl p-6">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center"><ShoppingBag className="w-4 h-4 text-blue-600" /></div>
                                                <h4 className="text-lg font-bold text-blue-800 dark:text-blue-200">Where to Buy?</h4>
                                            </div>
                                            <div className="p-4 bg-white dark:bg-black/20 rounded-xl border border-border space-y-2">
                                                <EditableText value={uniform.vendor?.name || 'Vendor Name'} onChange={(val: string) => setUniform({ ...uniform, vendor: { ...uniform.vendor, name: val } })} className="font-bold bg-transparent w-full" />
                                                <EditableText value={uniform.vendor?.address || 'Address'} onChange={(val: string) => setUniform({ ...uniform, vendor: { ...uniform.vendor, address: val } })} className="text-sm text-muted bg-transparent w-full" />
                                                <EditableText value={uniform.vendor?.phone || 'Phone'} onChange={(val: string) => setUniform({ ...uniform, vendor: { ...uniform.vendor, phone: val } })} className="text-sm text-muted bg-transparent w-full" />
                                            </div>
                                        </div>

                                        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-2xl p-6">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/50 rounded-lg flex items-center justify-center"><AlertCircle className="w-4 h-4 text-amber-600" /></div>
                                                <h4 className="font-bold text-amber-800 dark:text-amber-200">Strict Policy</h4>
                                            </div>
                                            <EditableText value={uniform.policyNote || ''} onChange={(val: string) => setUniform({ ...uniform, policyNote: val })} multiline className="text-xs text-muted-foreground bg-transparent w-full" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* TRANSPORT TAB */}
                    {activeTab === 'transport' && (
                        <motion.div key="transport" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            {renderHero('School Transport', 'description', setTransport, transport, 'bg-gradient-to-r from-yellow-500 to-amber-600')}

                            <div className="max-w-7xl mx-auto px-4 space-y-8">
                                <div className="bg-surface border border-border rounded-3xl p-8 shadow-lg">
                                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                        <MapPin className="text-red-500" />
                                        Transportation Zones & Routes
                                    </h3>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm text-left">
                                            <thead>
                                                <tr className="border-b border-border">
                                                    <th className="py-3 text-muted">Zone</th>
                                                    <th className="py-3 text-muted">Areas</th>
                                                    <th className="py-3 text-muted text-right">Fee</th>
                                                    <th className="py-3 text-muted w-10"></th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-border">
                                                {transport.zones.map((zone: TransportZone, i: number) => (
                                                    <tr key={i} className="group hover:bg-surface-hover">
                                                        <td className="py-4 font-bold align-top">
                                                            <EditableText value={zone.name} onChange={(val: string) => { const newZones = [...transport.zones]; newZones[i].name = val; setTransport({ ...transport, zones: newZones }); }} className="bg-transparent" />
                                                        </td>
                                                        <td className="py-4 text-muted-foreground align-top">
                                                            <EditableText value={zone.stops} onChange={(val: string) => { const newZones = [...transport.zones]; newZones[i].stops = val; setTransport({ ...transport, zones: newZones }); }} className="bg-transparent w-full" />
                                                        </td>
                                                        <td className="py-4 font-medium text-right align-top">
                                                            <EditableText value={zone.fee} onChange={(val: string) => { const newZones = [...transport.zones]; newZones[i].fee = val; setTransport({ ...transport, zones: newZones }); }} className="bg-transparent text-right" />
                                                        </td>
                                                        <td className="py-4 text-right align-top">
                                                            <Button variant="ghost" size="icon" className="h-6 w-6 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => {
                                                                const newZones = transport.zones.filter((_: TransportZone, idx: number) => idx !== i);
                                                                setTransport({ ...transport, zones: newZones });
                                                            }}>
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <Button variant="outline" className="mt-4" onClick={() => setTransport({ ...transport, zones: [...transport.zones, { name: 'Zone X', stops: 'Stops...', fee: 'Rs. XXX' }] })}><Plus className="h-4 w-4 mr-2" /> Add Route</Button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="bg-rose-50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-900/30 rounded-3xl p-8">
                                        <div className="flex items-center gap-3 mb-6">
                                            <ShieldCheck className="w-6 h-6 text-rose-600" />
                                            <h3 className="text-xl font-bold text-rose-800 dark:text-rose-200">Safety Features</h3>
                                        </div>
                                        <div className="space-y-4">
                                            {(transport.safetyFeatures || []).map((feature, i) => (
                                                <DeletableWrapper key={i} onDelete={() => {
                                                    const newFeatures = transport.safetyFeatures.filter((_, idx) => idx !== i);
                                                    setTransport({ ...transport, safetyFeatures: newFeatures });
                                                }}>
                                                    <div className="bg-white dark:bg-black/20 p-4 rounded-xl">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                                                            <EditableText value={feature.title} onChange={(val: string) => { const newFeatures = [...transport.safetyFeatures]; newFeatures[i].title = val; setTransport({ ...transport, safetyFeatures: newFeatures }); }} className="font-bold bg-transparent w-full" />
                                                        </div>
                                                        <EditableText value={feature.desc} onChange={(val: string) => { const newFeatures = [...transport.safetyFeatures]; newFeatures[i].desc = val; setTransport({ ...transport, safetyFeatures: newFeatures }); }} multiline className="text-sm text-muted bg-transparent w-full" />
                                                    </div>
                                                </DeletableWrapper>
                                            ))}
                                            <Button variant="ghost" size="sm" className="text-rose-600" onClick={() => setTransport({ ...transport, safetyFeatures: [...(transport.safetyFeatures || []), { title: 'New Feature', desc: 'Description', icon: 'Shield' }] })}>
                                                <Plus className="h-4 w-4 mr-2" /> Add Feature
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="space-y-8">
                                        <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-3xl p-8">
                                            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200 mb-4">Transport In-Charge</h3>
                                            <div className="space-y-3">
                                                <EditableText value={transport.contact?.name || 'Name'} onChange={(val: string) => setTransport({ ...transport, contact: { ...transport.contact, name: val } })} className="font-bold text-lg bg-transparent w-full" />
                                                <EditableText value={transport.contact?.phone || 'Phone'} onChange={(val: string) => setTransport({ ...transport, contact: { ...transport.contact, phone: val } })} className="text-muted-foreground bg-transparent w-full" />
                                                <EditableText value={transport.contact?.hours || 'Hours'} onChange={(val: string) => setTransport({ ...transport, contact: { ...transport.contact, hours: val } })} className="text-sm text-muted bg-transparent w-full" />
                                            </div>
                                        </div>

                                        <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-900/30 rounded-3xl p-8">
                                            <h3 className="text-xl font-bold text-yellow-800 dark:text-yellow-200 mb-4">Bus Rules</h3>
                                            <div className="space-y-2">
                                                {(transport.rules || []).map((rule, i) => (
                                                    <DeletableWrapper key={i} onDelete={() => {
                                                        const newRules = transport.rules.filter((_, idx) => idx !== i);
                                                        setTransport({ ...transport, rules: newRules });
                                                    }}>
                                                        <div className="flex items-start gap-2">
                                                            <span className="text-yellow-600 font-bold mt-1">!</span>
                                                            <EditableText value={rule} onChange={(val: string) => { const newRules = [...transport.rules]; newRules[i] = val; setTransport({ ...transport, rules: newRules }); }} multiline className="text-sm bg-transparent w-full" />
                                                        </div>
                                                    </DeletableWrapper>
                                                ))}
                                                <Button variant="ghost" size="sm" className="text-yellow-600" onClick={() => setTransport({ ...transport, rules: [...transport.rules, 'New Rule'] })}>
                                                    <Plus className="h-4 w-4 mr-2" /> Add Rule
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* BOARDING TAB */}
                    {activeTab === 'boarding' && (
                        <motion.div key="boarding" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            {renderHero('Boarding Facilities', 'description', setBoarding, boarding, 'bg-gradient-to-r from-stone-800 to-stone-900')}

                            <div className="max-w-7xl mx-auto px-4 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {(boarding.features || []).map((feature: BoardingFeature, i: number) => (
                                        <DeletableWrapper key={i} onDelete={() => {
                                            const newFeatures = boarding.features.filter((_: BoardingFeature, idx: number) => idx !== i);
                                            setBoarding({ ...boarding, features: newFeatures });
                                        }} className="bg-surface border border-border p-6 rounded-3xl shadow-sm">
                                            <div className="w-12 h-12 bg-stone-100 dark:bg-stone-900/50 rounded-2xl flex items-center justify-center mb-4 text-stone-700 dark:text-stone-300">
                                                <Home className="w-6 h-6" />
                                            </div>
                                            <EditableText value={feature.title} onChange={(val: string) => { const newFeatures = [...boarding.features]; newFeatures[i].title = val; setBoarding({ ...boarding, features: newFeatures }); }} className="font-bold text-lg mb-2 bg-transparent block w-full" />
                                            <EditableText value={feature.desc} onChange={(val: string) => { const newFeatures = [...boarding.features]; newFeatures[i].desc = val; setBoarding({ ...boarding, features: newFeatures }); }} multiline className="text-sm text-muted bg-transparent block w-full" />
                                        </DeletableWrapper>
                                    ))}
                                    <Button variant="outline" className="h-[200px] rounded-3xl border-dashed" onClick={() => setBoarding({ ...boarding, features: [...(boarding.features || []), { title: 'New Feature', desc: 'Description' }] })}><Plus className="h-8 w-8 text-muted" /></Button>
                                </div>




                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
                                    <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30 rounded-3xl p-8">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/50 rounded-xl flex items-center justify-center text-orange-600"><ShoppingBag className="w-5 h-5" /></div>
                                            <h3 className="text-xl font-bold text-orange-900 dark:text-orange-100">Weekly Menu Highlights</h3>
                                        </div>
                                        <div className="space-y-4">
                                            {(boarding.menu || []).map((item, i) => (
                                                <DeletableWrapper key={i} onDelete={() => {
                                                    const newMenu = boarding.menu.filter((_, idx) => idx !== i);
                                                    setBoarding({ ...boarding, menu: newMenu });
                                                }}>
                                                    <div className="bg-white dark:bg-black/20 p-4 rounded-xl">
                                                        <EditableText value={item.type} onChange={(val: string) => { const newMenu = [...boarding.menu]; newMenu[i].type = val; setBoarding({ ...boarding, menu: newMenu }); }} className="font-bold text-orange-800 dark:text-orange-200 text-sm mb-1 bg-transparent w-full" />
                                                        <EditableText value={item.items} onChange={(val: string) => { const newMenu = [...boarding.menu]; newMenu[i].items = val; setBoarding({ ...boarding, menu: newMenu }); }} multiline className="text-sm font-medium bg-transparent w-full" />
                                                    </div>
                                                </DeletableWrapper>
                                            ))}
                                            <Button variant="ghost" size="sm" className="text-orange-600 w-full" onClick={() => setBoarding({ ...boarding, menu: [...(boarding.menu || []), { type: 'New Meal', items: 'Items' }] })}>
                                                <Plus className="h-4 w-4 mr-2" /> Add Menu Item
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30 rounded-3xl p-8">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/50 rounded-xl flex items-center justify-center text-green-600"><Calendar className="w-5 h-5" /></div>
                                            <h3 className="text-xl font-bold text-green-900 dark:text-green-100">Visitor Policy</h3>
                                        </div>
                                        <EditableText value={boarding.visitation || 'Visitation Policy'} onChange={(val: string) => setBoarding({ ...boarding, visitation: val })} multiline className="text-base text-green-800 dark:text-green-200 leading-relaxed bg-transparent w-full h-full min-h-[150px]" />
                                    </div>
                                </div>

                                <div className="bg-surface border border-border rounded-3xl p-8 shadow-xl">
                                    <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                        <Clock className="text-stone-600" />
                                        A Typical Day at Hostel
                                    </h3>
                                    <div className="space-y-4">
                                        {boarding.schedule.map((slot: BoardingSchedule, i: number) => (
                                            <div key={i} className="relative flex items-center gap-6 group">
                                                <div className="w-10 h-10 rounded-full bg-background border-4 border-surface shadow-sm flex items-center justify-center shrink-0 z-10 text-xs font-bold text-stone-500">
                                                    {i + 1}
                                                </div>
                                                <div className="flex-1 bg-slate-50 dark:bg-slate-900/30 p-4 rounded-xl flex justify-between items-center hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors">
                                                    <EditableText value={slot.activity} onChange={(val: string) => { const newSch = [...boarding.schedule]; newSch[i].activity = val; setBoarding({ ...boarding, schedule: newSch }); }} className="font-medium bg-transparent" />
                                                    <EditableText value={slot.time} onChange={(val: string) => { const newSch = [...boarding.schedule]; newSch[i].time = val; setBoarding({ ...boarding, schedule: newSch }); }} className="text-sm font-bold text-stone-500 bg-transparent text-right" />
                                                </div>
                                                <Button variant="ghost" size="icon" className="absolute -right-10 opacity-0 group-hover:opacity-100" onClick={() => {
                                                    const newSch = boarding.schedule.filter((_: BoardingSchedule, idx: number) => idx !== i);
                                                    setBoarding({ ...boarding, schedule: newSch });
                                                }}>
                                                    <Trash2 className="h-4 w-4 text-red-500" />
                                                </Button>
                                            </div>
                                        ))}
                                        <Button variant="outline" size="sm" onClick={() => setBoarding({ ...boarding, schedule: [...boarding.schedule, { time: '00:00 AM', activity: 'Activity' }] })}><Plus className="h-4 w-4 mr-2" /> Add Schedule</Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* INQUIRY TAB */}
                    {activeTab === 'inquiry' && (
                        <motion.div key="inquiry" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <div className="bg-surface border border-border rounded-3xl p-8 mb-8 shadow-sm">
                                <h3 className="text-2xl font-bold mb-6">Hero Section</h3>
                                <div className="space-y-4">
                                    <div>
                                        <div className="text-sm font-bold text-muted mb-2">Title</div>
                                        <EditableText value={inquiry.hero.title} onChange={(val: string) => setInquiry({ ...inquiry, hero: { ...inquiry.hero, title: val } })} className="text-3xl font-black bg-transparent w-full" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-muted mb-2">Subtitle</div>
                                        <EditableText value={inquiry.hero.subtitle} onChange={(val: string) => setInquiry({ ...inquiry, hero: { ...inquiry.hero, subtitle: val } })} multiline className="text-lg text-muted bg-transparent w-full" />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="bg-surface border border-border rounded-3xl p-8 shadow-sm">
                                    <h3 className="font-bold text-2xl mb-6">Why Choose Sankalpa?</h3>
                                    <div className="space-y-3">
                                        {(inquiry.whyChoose || []).map((item, i) => (
                                            <DeletableWrapper key={i} onDelete={() => {
                                                const newItems = inquiry.whyChoose.filter((_, idx) => idx !== i);
                                                setInquiry({ ...inquiry, whyChoose: newItems });
                                            }}>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0"></div>
                                                    <EditableText value={item} onChange={(val: string) => { const newItems = [...inquiry.whyChoose]; newItems[i] = val; setInquiry({ ...inquiry, whyChoose: newItems }); }} className="bg-transparent w-full" />
                                                </div>
                                            </DeletableWrapper>
                                        ))}
                                        <Button variant="ghost" size="sm" onClick={() => setInquiry({ ...inquiry, whyChoose: [...inquiry.whyChoose, 'New Reason'] })}>
                                            <Plus className="h-4 w-4 mr-2" /> Add Reason
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div >
    );
}
