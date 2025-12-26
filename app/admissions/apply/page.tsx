import { getPage } from '@/app/actions/pages';
import ApplicationForm from './application-form';

export const dynamic = 'force-dynamic';

export default async function Page() {
    const result = await getPage('application-form');

    // Default content if nothing is saved in DB yet
    const defaultContent = {
        title: 'Online Admission Application',
        description: 'Please fill out the form below carefully. All fields marked with * are mandatory.',
        studentInfoTitle: 'Student Information',
        guardianInfoTitle: 'Guardian Information',
        academicInfoTitle: 'Previous Academic Details',
        submitButtonText: 'Submit Application'
    };

    const content = result.success && result.data ? { ...defaultContent, ...result.data } : defaultContent;

    return <ApplicationForm content={content} />;
}
