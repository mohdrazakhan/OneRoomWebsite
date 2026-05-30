import { useState, useEffect, useRef } from 'react'
import './ChatWidget.css'
import { t } from '../utils/i18n'
import { WEBSITE_CONTEXT } from '../config/websiteContext'

// Local response database for fallback NLP
const getSmartLocalResponse = (messageText) => {
    const text = messageText.toLowerCase().trim();
    
    if (text.includes('chore') || text.includes('task') || text.includes('clean') || text.includes('sink') || text.includes('trash') || text.includes('rotate') || text.includes('reminder') || text.includes('nudge')) {
        return "OneRoom's Chore Tracker automates household chores! You can assign tasks, rotate them automatically (e.g. weekly or daily), and the app sends automatic 'Nudge' notifications so you don't have to nag your roommates.";
    }
    
    if (text.includes('expense') || text.includes('split') || text.includes('bill') || text.includes('money') || text.includes('rent') || text.includes('pay') || text.includes('rupee') || text.includes('ledger') || text.includes('settle')) {
        return "With the Expense Tracker, you can log household bills, split them equally or in custom ratios, and track balances. Roommates can settle balances instantly. The app acts as a 'neutral third party' to handle reminders.";
    }
    
    if (text.includes('free') || text.includes('price') || text.includes('pricing') || text.includes('cost') || text.includes('charge') || text.includes('pay') || text.includes('premium')) {
        return `OneRoom is currently 100% FREE! All premium features, including unlimited rooms, advanced expense analytics, and automated reminders are free to use right now: ${WEBSITE_CONTEXT.pricing.promoOffer}`;
    }
    
    if (text.includes('download') || text.includes('install') || text.includes('app store') || text.includes('play store') || text.includes('android') || text.includes('ios') || text.includes('iphone') || text.includes('get the app')) {
        return `OneRoom is available on Android! You can download it directly from the Google Play Store: ${WEBSITE_CONTEXT.links.playStore}. The iOS app is coming soon!`;
    }
    
    if (text.includes('conflict') || text.includes('argument') || text.includes('nag') || text.includes('bad guy') || text.includes('roommate problem') || text.includes('friction') || text.includes('peaceful')) {
        return "OneRoom is designed to stop household friction! By automating reminders for chores and expenses, it acts as a neutral third party. The app handles the awkward 'hey you owe me' conversations so you can just be friends.";
    }
    
    if (text.includes('trip') || text.includes('travel') || text.includes('wallet') || text.includes('vacation')) {
        return "OneRoom includes a Trip Wallet! When traveling together, you can create a dedicated wallet for the trip, log all expenses, and split them automatically among group members.";
    }
    
    if (text.includes('support') || text.includes('contact') || text.includes('help') || text.includes('bug') || text.includes('report') || text.includes('issue') || text.includes('phone') || text.includes('email') || text.includes('whatsapp')) {
        return `If you need help or want to report an issue, you can reach out to our team at ${WEBSITE_CONTEXT.support.email}, Call/WhatsApp us at ${WEBSITE_CONTEXT.support.phone}, or file a bug report directly through the app!`;
    }
    
    if (text.includes('linkedin') || text.includes('founder') || text.includes('raza') || text.includes('who built') || text.includes('creator') || text.includes('owner') || text.includes('developer')) {
        return `OneRoom was founded by Mohd Raza Khan. You can connect with him on LinkedIn: ${WEBSITE_CONTEXT.links.founderLinkedIn} or visit the company LinkedIn page: ${WEBSITE_CONTEXT.links.companyLinkedIn}`;
    }
    
    if (text.includes('what is') || text.includes('oneroom') || text.includes('work') || text.includes('features') || text.includes('how does') || text.includes('understand')) {
        return "OneRoom is a co-living management app that simplifies shared living. It includes a Smart Dashboard, shared Task Manager, Expense Tracker, and neutral reminders to keep roommate relationships harmonious.";
    }

    if (/^(hi|hello|hey|greetings|yo|hello there|howdy)/.test(text)) {
        return "Hello! I'm Roomy, your OneRoom assistant. Ask me anything about splitting bills, chore schedules, or how to get started!";
    }

    return "I'm Roomy, your helper! I can answer questions about bill splitting, chore rotation, free pricing, and downloading the app. What would you like to know?";
};

const SYSTEM_PROMPT = `You are Roomy, the official intelligent AI helper for OneRoom.

OneRoom is a modern co-living and roommate management mobile app designed to reduce social friction in shared homes.

Below is the complete context of the OneRoom website, features, pricing, links, founder details, and FAQs:
${JSON.stringify(WEBSITE_CONTEXT, null, 2)}

INSTRUCTIONS:
- Answer user questions based on the website context provided above.
- Be friendly, encouraging, and highly professional.
- Keep responses short (1-3 sentences).
- If asked about links (Play Store, LinkedIn, founder), output the exact links provided in the context.
  * Google Play Store Link: ${WEBSITE_CONTEXT.links.playStore}
  * Company LinkedIn Page: ${WEBSITE_CONTEXT.links.companyLinkedIn}
  * Founder LinkedIn (Mohd Raza Khan): ${WEBSITE_CONTEXT.links.founderLinkedIn}
  * Official Web: ${WEBSITE_CONTEXT.links.officialWeb}
- Do not mention that you are using Gemini or an LLM. Just behave as Roomy.`;

// Client-side direct call to Gemini 3.5 Flash
const callGeminiAPI = async (messageText, history) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`;
    
    const contents = [];

    // Format chat history for Gemini API (exclude current message)
    history.forEach(msg => {
        // Only include text messages and map bot to model
        if (msg.text) {
            contents.push({
                role: msg.type === 'user' ? 'user' : 'model',
                parts: [{ text: msg.text }]
            });
        }
    });

    // Add current user message
    contents.push({
        role: 'user',
        parts: [{ text: messageText }]
    });

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            contents,
            systemInstruction: {
                parts: [{ text: SYSTEM_PROMPT }]
            }
        })
    });

    if (!response.ok) {
        throw new Error('Gemini API returned status ' + response.status);
    }

    const data = await response.json();
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
        return data.candidates[0].content.parts[0].text;
    }
    throw new Error('Invalid Gemini API response structure');
};

function ChatWidget() {
    const [messages, setMessages] = useState([
        { type: 'bot', text: 'Hi there! I\'m Roomy, your OneRoom helper. 🏠 Ask me anything about managing your shared home!' }
    ])
    const [input, setInput] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [isTyping, setIsTyping] = useState(false)
    
    const messagesEndRef = useRef(null)

    const quickReplies = [
        'How does OneRoom work?',
        'Is it really free?',
        'How do chores work?',
        'Where can I download it?'
    ]

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages, isTyping])

    const handleSend = (messageText) => {
        if (!messageText.trim()) return

        // 1. Add User Message
        setMessages(prev => [...prev, { type: 'user', text: messageText }])
        setInput('')
        
        // 2. Set Bot Typing state
        setIsTyping(true)

        // 3. Process response
        const fetchResponse = async () => {
            try {
                // Keep last 6 messages to provide conversational history to Gemini
                const history = messages.slice(-6);
                const apiResponse = await callGeminiAPI(messageText, history);
                setMessages(prev => [...prev, { type: 'bot', text: apiResponse }]);
            } catch (error) {
                console.warn('Gemini API failed or restricted, using local smart response:', error);
                const localResponse = getSmartLocalResponse(messageText);
                setMessages(prev => [...prev, { type: 'bot', text: localResponse }]);
            } finally {
                setIsTyping(false);
            }
        };

        // Delay slightly to show typing animation for a realistic feel
        setTimeout(fetchResponse, 1000);
    }

    const handleQuickReply = (reply) => {
        handleSend(reply)
    }

    return (
        <>
            <button
                className={`chat-toggle ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle chat helper"
            >
                {isOpen ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        <path d="M12 7a2.5 2.5 0 0 0 2.5 2.5A2.5 2.5 0 0 0 12 12a2.5 2.5 0 0 0-2.5-2.5A2.5 2.5 0 0 0 12 7z" fill="currentColor" stroke="none" />
                        <path d="M16.5 5a1.2 1.2 0 0 0 1.2 1.2 1.2 1.2 0 0 0-1.2 1.2 1.2 1.2 0 0 0-1.2-1.2A1.2 1.2 0 0 0 16.5 5z" fill="currentColor" stroke="none" />
                    </svg>
                )}
            </button>

            <div className={`chat-widget ${isOpen ? 'open' : ''}`}>
                <div className="chat-header">
                    <div className="chat-header-info">
                        <div className="chat-avatar">🏡</div>
                        <div>
                            <h4>{t('OneRoom Helper')}</h4>
                            <span className="status">{t('● Advanced AI Helping Hand')}</span>
                        </div>
                    </div>
                </div>

                <div className="chat-messages">
                    {messages.map((message, index) => (
                        <div key={index} className={`message ${message.type}`}>
                            {message.type === 'bot' && (
                                <div className="message-avatar">
                                    <span>🤖</span>
                                </div>
                            )}
                            <div className="message-bubble">{message.text}</div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="message bot">
                            <div className="message-avatar">
                                <span>🤖</span>
                            </div>
                            <div className="message-bubble typing-dots">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />

                    {messages.length === 1 && !isTyping && (
                        <div className="quick-replies">
                            {quickReplies.map((reply, index) => (
                                <button
                                    key={index}
                                    className="quick-reply"
                                    onClick={() => handleQuickReply(reply)}
                                >
                                    {reply}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <form
                    className="chat-input-form"
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleSend(input)
                    }}
                >
                    <input
                        type="text"
                        placeholder={t('Ask Roomy a question...')}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="chat-input"
                    />
                    <button type="submit" className="chat-send" aria-label={t('Send message')}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" />
                        </svg>
                    </button>
                </form>
            </div>
        </>
    )
}

export default ChatWidget
