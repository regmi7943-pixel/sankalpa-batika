import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

// Send email to a single recipient
export async function sendEmail({
    to,
    subject,
    html,
}: {
    to: string;
    subject: string;
    html: string;
}) {
    try {
        const result = await resend.emails.send({
            from: 'Sankalpa Batika School <notifications@kiranregmi11.com.np>',
            to,
            subject,
            html,
            headers: {
                'List-Unsubscribe': `<${SITE_URL}/unsubscribe>`,
            },
        });
        return { success: true, data: result };
    } catch (error) {
        console.error('Email send error:', error);
        return { success: false, error };
    }
}

// Send email to multiple recipients (batch)
// NOTE: With verified domain, you can now send to any email!
export async function sendBulkEmail({
    recipients,
    subject,
    html,
}: {
    recipients: string[];
    subject: string;
    html: string;
}) {
    if (recipients.length === 0) {
        console.log('[Email] No recipients to send to');
        return { success: true, sent: 0 };
    }

    console.log(`[Email] Attempting to send to ${recipients.length} recipients:`, recipients);

    try {
        const emails = recipients.map((to) => ({
            from: 'Sankalpa Batika School <notifications@kiranregmi11.com.np>',
            to,
            subject,
            html,
            headers: {
                'List-Unsubscribe': `<${SITE_URL}/unsubscribe>`,
            },
        }));

        const result = await resend.batch.send(emails);
        console.log('[Email] Send result:', result);
        return { success: true, sent: recipients.length, data: result };
    } catch (error: any) {
        console.error('[Email] Bulk email send error:', error);
        if (error?.message) {
            console.error('[Email] Error message:', error.message);
        }
        return { success: false, error };
    }
}

// Improved email templates with better spam score
export function noticeEmailTemplate(notice: { title: string; content: string }) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${notice.title}</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f5; line-height: 1.6;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 32px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">Sankalpa Batika School</h1>
                            <p style="margin: 8px 0 0 0; color: #bfdbfe; font-size: 14px;">New Notice</p>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 32px;">
                            <h2 style="margin: 0 0 16px 0; color: #1e40af; font-size: 20px; font-weight: 600;">${notice.title}</h2>
                            <p style="margin: 0; color: #4b5563; font-size: 16px; line-height: 1.7;">${notice.content}</p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f9fafb; padding: 24px 32px; border-top: 1px solid #e5e7eb;">
                            <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 13px; text-align: center;">Sankalpa Batika School</p>
                            <p style="margin: 0 0 8px 0; color: #9ca3af; font-size: 12px; text-align: center;">Excellence in Education</p>
                            <p style="margin: 0; color: #9ca3af; font-size: 11px; text-align: center;">
                                You received this email because you subscribed to our newsletter.<br>
                                <a href="${SITE_URL}/unsubscribe" style="color: #6b7280; text-decoration: underline;">Unsubscribe</a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `;
}

export function eventEmailTemplate(event: { name: string; description: string; date: number; location?: string }) {
    const eventDate = new Date(event.date);
    const formattedDate = eventDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${event.name}</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f5; line-height: 1.6;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #d97706 0%, #f59e0b 100%); padding: 32px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">Sankalpa Batika School</h1>
                            <p style="margin: 8px 0 0 0; color: #fef3c7; font-size: 14px;">Upcoming Event</p>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 32px;">
                            <h2 style="margin: 0 0 16px 0; color: #d97706; font-size: 20px; font-weight: 600;">${event.name}</h2>
                            
                            <!-- Event Details Box -->
                            <table role="presentation" style="width: 100%; background-color: #fef3c7; border-radius: 8px; margin-bottom: 20px;">
                                <tr>
                                    <td style="padding: 16px;">
                                        <p style="margin: 0 0 8px 0; color: #92400e; font-size: 14px;"><strong>Date:</strong> ${formattedDate}</p>
                                        ${event.location ? `<p style="margin: 0; color: #92400e; font-size: 14px;"><strong>Location:</strong> ${event.location}</p>` : ''}
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="margin: 0; color: #4b5563; font-size: 16px; line-height: 1.7;">${event.description}</p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f9fafb; padding: 24px 32px; border-top: 1px solid #e5e7eb;">
                            <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 13px; text-align: center;">Sankalpa Batika School</p>
                            <p style="margin: 0 0 8px 0; color: #9ca3af; font-size: 12px; text-align: center;">Excellence in Education</p>
                            <p style="margin: 0; color: #9ca3af; font-size: 11px; text-align: center;">
                                You received this email because you subscribed to our newsletter.<br>
                                <a href="${SITE_URL}/unsubscribe" style="color: #6b7280; text-decoration: underline;">Unsubscribe</a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `;
}
