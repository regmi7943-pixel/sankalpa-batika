'use client';

import { useState, useEffect } from 'react';
import {
    Mail, Trash2, Calendar, User,
    MessageSquare, CheckCircle2, Search,
    Filter, MoreVertical, X, Clock, Send,
    Loader2, CornerUpLeft, History
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getMessages, deleteMessage, markAsRead, sendReply } from '@/app/actions/contact';
import { toast } from 'sonner';

export default function AdminMessagesPage() {
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMessage, setSelectedMessage] = useState<any>(null);

    // Reply Modal State
    const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
    const [replyContent, setReplyContent] = useState('');
    const [isSendingReply, setIsSendingReply] = useState(false);

    useEffect(() => {
        fetchMessages();
    }, []);

    async function fetchMessages() {
        setLoading(true);
        const result = await getMessages();
        if (result.success) {
            setMessages(result.data || []);
        }
        setLoading(false);
    }

    async function handleDelete(id: string) {
        if (!confirm('Are you sure you want to delete this message?')) return;
        const result = await deleteMessage(id);
        if (result.success) {
            setMessages(prev => prev.filter(m => m.id !== id));
            if (selectedMessage?.id === id) setSelectedMessage(null);
            toast.success('Message deleted');
        } else {
            toast.error('Failed to delete message');
        }
    }

    async function handleMarkRead(id: string) {
        const result = await markAsRead(id);
        if (result.success) {
            setMessages(prev => prev.map(m => m.id === id ? { ...m, status: 'read' } : m));
            if (selectedMessage?.id === id) setSelectedMessage({ ...selectedMessage, status: 'read' });
        }
    }

    async function handleSendReply() {
        if (!replyContent.trim() || !selectedMessage) return;

        setIsSendingReply(true);
        const result = await sendReply({
            messageId: selectedMessage.id,
            recipientEmail: selectedMessage.email,
            recipientName: selectedMessage.name,
            originalMessage: selectedMessage.message,
            replyContent: replyContent.trim()
        });

        if (result.success) {
            setIsReplyModalOpen(false);
            setReplyContent('');
            // Refresh messages to show 'replied' status
            fetchMessages();
            // Update local selected message
            setSelectedMessage({
                ...selectedMessage,
                status: 'replied',
                replyContent: replyContent.trim(),
                repliedAt: Date.now()
            });
            toast.success('Reply sent successfully');
        } else {
            toast.error(result.error || 'Failed to send reply');
        }
        setIsSendingReply(false);
    }

    const filteredMessages = messages.filter(m =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.message.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const formatDate = (timestamp: number) => {
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(new Date(timestamp));
    };

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto h-full flex flex-col relative">
            {/* Reply Modal Overlay */}
            {isReplyModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-surface w-full max-w-2xl rounded-3xl border border-border shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-border flex items-center justify-between bg-muted/5">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                                    <CornerUpLeft className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-foreground">Reply to {selectedMessage?.name}</h3>
                                    <p className="text-xs text-muted-foreground">{selectedMessage?.email}</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => setIsReplyModalOpen(false)} disabled={isSendingReply}>
                                <X className="h-5 w-5" />
                            </Button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Your Message</label>
                                <textarea
                                    className="w-full h-48 p-4 rounded-2xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm resize-none"
                                    placeholder="Write your professional response here..."
                                    value={replyContent}
                                    onChange={(e) => setReplyContent(e.target.value)}
                                    disabled={isSendingReply}
                                />
                            </div>
                            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 rounded-xl p-3 flex gap-3">
                                <Clock className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                                <p className="text-[11px] text-amber-800 dark:text-amber-200">
                                    This reply will be sent via <strong>Resend</strong> using the official school email. A copy of the original inquiry will be included automatically.
                                </p>
                            </div>
                        </div>
                        <div className="p-6 bg-muted/5 border-t border-border flex justify-end gap-3">
                            <Button variant="outline" onClick={() => setIsReplyModalOpen(false)} disabled={isSendingReply} className="rounded-xl px-6">
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSendReply}
                                disabled={isSendingReply || !replyContent.trim()}
                                className="bg-blue-600 hover:bg-blue-700 rounded-xl px-8 shadow-lg shadow-blue-600/20"
                            >
                                {isSendingReply ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Reply
                                        <Send className="ml-2 h-4 w-4" />
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 text-foreground">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold font-heading">Messages</h1>
                    <p className="text-muted text-sm">Manage inquiries from the contact form</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative flex-1 md:w-64 text-foreground">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search messages..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-xl border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                    </div>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
                {/* Messages List */}
                <div className={`lg:col-span-4 flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar ${selectedMessage ? 'hidden lg:flex' : 'flex'}`}>
                    {loading ? (
                        Array(5).fill(0).map((_, i) => (
                            <div key={i} className="h-32 rounded-2xl bg-surface/50 animate-pulse border border-border" />
                        ))
                    ) : filteredMessages.length === 0 ? (
                        <div className="h-64 flex flex-col items-center justify-center text-center bg-surface rounded-3xl border border-dashed border-border p-8">
                            <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mb-4 text-muted-foreground">
                                <Mail className="h-8 w-8" />
                            </div>
                            <h3 className="font-bold text-foreground">No messages found</h3>
                            <p className="text-muted text-sm">When users fill out the contact form, their inquiries will appear here.</p>
                        </div>
                    ) : (
                        filteredMessages.map((msg) => (
                            <button
                                key={msg.id}
                                onClick={() => {
                                    setSelectedMessage(msg);
                                    if (msg.status === 'unread') handleMarkRead(msg.id);
                                }}
                                className={`
                                    text-left p-4 rounded-2xl border transition-all relative overflow-hidden group
                                    ${selectedMessage?.id === msg.id
                                        ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20'
                                        : 'bg-surface border-border hover:border-blue-500/30'
                                    }
                                `}
                            >
                                {msg.status === 'unread' && (
                                    <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                                )}
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className={`p-1.5 rounded-lg ${selectedMessage?.id === msg.id ? 'bg-white/20 text-white' : 'bg-blue-50 dark:bg-blue-900/20 text-blue-600'}`}>
                                            <User className="h-3.5 w-3.5" />
                                        </div>
                                        <span className={`text-sm font-bold truncate max-w-[120px] ${selectedMessage?.id === msg.id ? 'text-white' : 'text-foreground'}`}>
                                            {msg.name}
                                        </span>
                                    </div>
                                    <span className={`text-[10px] ${selectedMessage?.id === msg.id ? 'text-blue-100' : 'text-muted-foreground'}`}>
                                        {formatDate(msg.timestamp)}
                                    </span>
                                </div>
                                <h4 className={`text-xs font-semibold mb-1 truncate ${selectedMessage?.id === msg.id ? 'text-white' : 'text-foreground'}`}>
                                    {msg.subject}
                                </h4>
                                <p className={`text-[11px] line-clamp-2 ${selectedMessage?.id === msg.id ? 'text-blue-50' : 'text-muted-foreground'}`}>
                                    {msg.message}
                                </p>
                                {msg.status === 'replied' && (
                                    <div className={`mt-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider ${selectedMessage?.id === msg.id ? 'text-white/80' : 'text-green-600'}`}>
                                        <CornerUpLeft className="h-3 w-3" />
                                        Replied
                                    </div>
                                )}
                            </button>
                        ))
                    )}
                </div>

                {/* Message Detail View */}
                <div className={`lg:col-span-8 ${selectedMessage ? 'flex' : 'hidden lg:flex'} flex-col bg-surface rounded-3xl border border-border overflow-hidden shadow-sm h-full`}>
                    {selectedMessage ? (
                        <>
                            {/* Detail Header */}
                            <div className="p-6 border-b border-border flex items-center justify-between bg-muted/5">
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setSelectedMessage(null)}
                                        className="lg:hidden p-2 rounded-xl hover:bg-muted transition-colors text-foreground"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                                        <Mail className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h2 className="font-bold text-foreground text-lg leading-tight">{selectedMessage.name}</h2>
                                        <p className="text-muted text-xs font-medium">{selectedMessage.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleDelete(selectedMessage.id)}
                                        className="h-9 px-3 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300 rounded-xl"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            {/* Detail Content */}
                            <div className="flex-1 p-8 overflow-y-auto space-y-8 custom-scrollbar">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Subject</p>
                                        <p className="text-sm font-bold text-foreground">{selectedMessage.subject}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Date Received</p>
                                        <div className="flex items-center gap-1.5 text-sm font-bold text-foreground">
                                            <Clock className="h-3.5 w-3.5 text-blue-500" />
                                            {formatDate(selectedMessage.timestamp)}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Inquiry Message</p>
                                        <div className="h-px flex-1 bg-border/50"></div>
                                    </div>
                                    <div className="bg-muted/30 rounded-2xl p-6 text-foreground text-sm leading-relaxed border border-border/50 whitespace-pre-wrap">
                                        {selectedMessage.message}
                                    </div>
                                </div>

                                {selectedMessage.status === 'replied' && (
                                    <div className="space-y-3 animate-slide-up">
                                        <div className="flex items-center gap-2">
                                            <p className="text-[10px] uppercase font-bold text-green-600 tracking-wider flex items-center gap-1.5">
                                                <History className="h-3 w-3" />
                                                Your Response
                                            </p>
                                            <div className="h-px flex-1 bg-green-200/50"></div>
                                            <p className="text-[10px] text-muted-foreground font-medium">
                                                {selectedMessage.repliedAt ? formatDate(selectedMessage.repliedAt) : ''}
                                            </p>
                                        </div>
                                        <div className="bg-green-50/50 dark:bg-green-900/10 rounded-2xl p-6 text-foreground text-sm leading-relaxed border border-green-200/30 dark:border-green-900/30 whitespace-pre-wrap">
                                            {selectedMessage.replyContent}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Detail Footer */}
                            <div className="p-6 border-t border-border bg-muted/5 flex items-center justify-between gap-4">
                                <div className="flex items-center gap-2">
                                    <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${selectedMessage.status === 'replied' ? 'bg-green-100 text-green-700' :
                                        selectedMessage.status === 'unread' ? 'bg-blue-100 text-blue-700' : 'bg-muted text-muted-foreground'
                                        }`}>
                                        {selectedMessage.status}
                                    </div>
                                </div>
                                <Button
                                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-600/20 h-11 px-8 font-bold text-sm"
                                    onClick={() => setIsReplyModalOpen(true)}
                                >
                                    <CornerUpLeft className="mr-2 h-4 w-4" />
                                    {selectedMessage.status === 'replied' ? 'Send Follow-up' : 'Send Reply'}
                                </Button>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 opacity-40">
                            <div className="w-20 h-20 bg-muted/20 rounded-full flex items-center justify-center mb-6">
                                <MessageSquare className="h-10 w-10 text-muted-foreground" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-foreground">Select a message</h3>
                            <p className="text-sm max-w-xs text-muted-foreground font-medium">Click on a message from the list to view its full details and respond.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
