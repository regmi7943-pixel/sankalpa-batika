'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { submitApplication } from '@/app/actions/admissions';
import { Loader2, CheckCircle, AlertCircle, ArrowLeft, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ApplicationPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    async function handleSubmit(formData: FormData) {
        setIsSubmitting(true);
        setSubmitStatus('idle');
        setErrorMessage('');

        const result = await submitApplication(formData);

        if (result.success) {
            setSubmitStatus('success');
        } else {
            setSubmitStatus('error');
            setErrorMessage(result.error || 'Something went wrong.');
        }

        setIsSubmitting(false);
    }

    if (submitStatus === 'success') {
        return (
            <div className="min-h-screen bg-surface pt-24 pb-12 px-4 flex items-center justify-center">
                <Card className="max-w-md w-full border-2 border-green-100 dark:border-green-900/30 shadow-xl">
                    <CardContent className="pt-10 pb-8 text-center space-y-6">
                        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-subtle">
                            <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-foreground">Application Received!</h2>
                        <p className="text-muted-foreground">
                            Thank you for applying to Sankalpa Vatika. We have received your details and will contact you shortly for the next steps.
                        </p>
                        <div className="pt-4">
                            <Link href="/">
                                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                    Return to Homepage
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-surface pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                {/* Header */}
                <div className="mb-12 md:mb-16 text-center">


                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Online Admission Application</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Please fill out the form below carefully. All fields marked with * are mandatory.
                    </p>
                </div>

                <div className="bg-background rounded-3xl shadow-xl border border-surface-dark/10 overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-blue-500 via-amber-500 to-blue-500"></div>
                    <form action={handleSubmit} className="p-6 md:p-10 space-y-10">

                        {/* Student Information */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 pb-2 border-b border-border">
                                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-bold text-sm">1</div>
                                <h3 className="text-xl font-bold text-foreground">Student Information</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="studentName">Full Name *</Label>
                                    <Input id="studentName" name="studentName" placeholder="Enter student's full name" required className="bg-surface" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="dob">Date of Birth</Label>
                                    <Input id="dob" name="dob" type="date" className="bg-surface" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Gender</Label>
                                    <RadioGroup defaultValue="male" name="gender" className="flex gap-6 mt-2">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="male" id="male" />
                                            <Label htmlFor="male" className="font-normal cursor-pointer">Male</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="female" id="female" />
                                            <Label htmlFor="female" className="font-normal cursor-pointer">Female</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="other" id="other" />
                                            <Label htmlFor="other" className="font-normal cursor-pointer">Other</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="grade">Applying For Grade *</Label>
                                    <Select name="grade" required>
                                        <SelectTrigger className="bg-surface">
                                            <SelectValue placeholder="Select Grade" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="playgroup">Playgroup</SelectItem>
                                            <SelectItem value="nursery">Nursery</SelectItem>
                                            <SelectItem value="lkg">L.K.G.</SelectItem>
                                            <SelectItem value="ukg">U.K.G.</SelectItem>
                                            <SelectItem value="1">Grade 1</SelectItem>
                                            <SelectItem value="2">Grade 2</SelectItem>
                                            <SelectItem value="3">Grade 3</SelectItem>
                                            <SelectItem value="4">Grade 4</SelectItem>
                                            <SelectItem value="5">Grade 5</SelectItem>
                                            <SelectItem value="6">Grade 6</SelectItem>
                                            <SelectItem value="7">Grade 7</SelectItem>
                                            <SelectItem value="8">Grade 8</SelectItem>
                                            <SelectItem value="9">Grade 9</SelectItem>
                                            <SelectItem value="10">Grade 10</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        {/* Guardian Information */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 pb-2 border-b border-border">
                                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-bold text-sm">2</div>
                                <h3 className="text-xl font-bold text-foreground">Guardian Information</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="parentName">Parent/Guardian Name *</Label>
                                    <Input id="parentName" name="parentName" placeholder="Enter parent's Name" required className="bg-surface" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Contact Number *</Label>
                                    <Input id="phone" name="phone" type="tel" placeholder="Mobile Number" required className="bg-surface" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input id="email" name="email" type="email" placeholder="Optional" className="bg-surface" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Input id="address" name="address" placeholder="City, Street" className="bg-surface" />
                                </div>
                            </div>
                        </div>

                        {/* Previous School */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 pb-2 border-b border-border">
                                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-bold text-sm">3</div>
                                <h3 className="text-xl font-bold text-foreground">Previous Academic Details</h3>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="previousSchool">Previous School Name (if applicable)</Label>
                                    <Input id="previousSchool" name="previousSchool" placeholder="Name of previous school attended" className="bg-surface" />
                                </div>
                            </div>
                        </div>

                        {/* Error Message */}
                        {submitStatus === 'error' && (
                            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg flex items-start gap-3">
                                <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                                <p className="text-sm font-medium">{errorMessage}</p>
                            </div>
                        )}

                        <div className="pt-6 border-t border-border flex flex-col md:flex-row gap-4 items-center justify-between">
                            <p className="text-sm text-muted-foreground order-2 md:order-1">
                                By submitting, you agree to our admission terms.
                            </p>
                            <Button
                                type="submit"
                                size="lg"
                                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-lg px-8 order-1 md:order-2"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    'Submit Application'
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
