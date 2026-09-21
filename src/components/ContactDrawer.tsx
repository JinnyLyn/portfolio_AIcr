import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, Check, Copy, Mail, Phone, Sparkles } from 'lucide-react';
import { profileData } from '../data/portfolioData';

interface ContactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: 'ko' | 'en';
}

export const ContactDrawer: React.FC<ContactDrawerProps> = ({ isOpen, onClose, lang = 'ko' }) => {
  const isEn = lang === 'en';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [purpose, setPurpose] = useState(
    isEn ? 'Vulnerability Research & Malware Analysis' : '취약점 분석 및 보안 연구'
  );
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const subject = encodeURIComponent(
      isEn
        ? `[Portfolio Inquiry] Message from ${name || 'Inquirer'} (${purpose})`
        : `[포트폴리오 문의] ${name || '담당자'}님의 연락 (${purpose})`
    );
    const body = encodeURIComponent(
      isEn
        ? `Name/Org: ${name}\nEmail: ${email}\nTopic: ${purpose}\n\nMessage:\n${message || 'Contacting regarding your security portfolio.'}`
        : `이름/소속: ${name}\n회신 이메일: ${email}\n관련 분야: ${purpose}\n\n문의 내용:\n${message || '포트폴리오를 확인하고 연락드립니다.'}`
    );

    // Prompt user with mailto link
    window.location.href = `mailto:${profileData.email}?subject=${subject}&body=${body}`;
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop Overlay with Smooth Fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
          />

          {/* Drawer Container (Smooth Spring Slide-in from Right) */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 280,
              mass: 0.85,
            }}
            className="relative w-full max-w-xl bg-white h-full shadow-2xl z-10 flex flex-col justify-between overflow-y-auto"
          >
            {/* Drawer Header */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              className="p-6 sm:p-8 border-b border-black/10 flex items-center justify-between"
            >
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                  {isEn ? 'Get in Touch' : '문의하기'}
                </span>
                <h3 className="text-xl sm:text-2xl font-light text-neutral-900 tracking-tight mt-0.5">
                  {isEn ? 'Inquiry & Recruitment' : '문의 및 채용 제안'}
                </h3>
              </div>
              <motion.button
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2.5 rounded-full hover:bg-neutral-100 transition-colors text-neutral-600 hover:text-black cursor-pointer"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </motion.div>

            {/* Natural Language Form Body */}
            <div className="p-6 sm:p-8 flex-1">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <Check className="w-7 h-7" />
                  </div>
                  <h4 className="text-2xl font-light text-neutral-900">
                    {isEn ? 'Inquiry Draft Prepared' : '문의 내용이 준비되었습니다'}
                  </h4>
                  <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                    {isEn
                      ? 'If your mail client did not open automatically, feel free to contact directly via email or phone below.'
                      : '메일 클라이언트가 열리지 않은 경우, 아래의 직통 연락처 또는 이메일 주소로 바로 연락주시면 신속히 회신드리겠습니다.'}
                  </p>
                  <div className="pt-4 flex flex-col gap-2 items-center">
                    <button
                      onClick={handleCopyEmail}
                      className="px-5 py-2.5 rounded-full bg-neutral-900 text-white text-xs font-semibold flex items-center gap-2 cursor-pointer hover:bg-neutral-800 transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                      <span>{copied ? (isEn ? 'Email Copied!' : '이메일 주소 복사됨!') : `${isEn ? 'Copy Email' : '이메일 주소 복사'} (${profileData.email})`}</span>
                    </button>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-xs text-neutral-500 hover:text-neutral-900 underline mt-2 cursor-pointer"
                    >
                      {isEn ? 'Write another message' : '새 양식 작성하기'}
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.35 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <p className="text-xs text-neutral-500 font-mono">
                    {isEn
                      ? 'Use this interactive form to describe your inquiry and launch your email client.'
                      : '자연어 문장 양식을 작성하시면 직통 이메일 초안으로 연결됩니다.'}
                  </p>

                  {/* Natural Language Sentence Flow (Webflow Max Pratt Style) */}
                  {isEn ? (
                    <div className="text-lg sm:text-xl font-light text-neutral-800 leading-loose space-y-3">
                      <span>Hello, my name is </span>
                      <input
                        type="text"
                        required
                        placeholder="Your Name or Company"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="inline-block border-b-2 border-neutral-900 bg-transparent px-2 py-0.5 text-neutral-950 font-medium placeholder:text-neutral-400 focus:outline-none focus:border-emerald-600 min-w-[200px] transition-colors"
                      />
                      <span>. You can reach me at </span>
                      <input
                        type="email"
                        required
                        placeholder="email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="inline-block border-b-2 border-neutral-900 bg-transparent px-2 py-0.5 text-neutral-950 font-mono text-base placeholder:text-neutral-400 focus:outline-none focus:border-emerald-600 min-w-[220px] transition-colors"
                      />
                      <span>. </span>
                      <br className="hidden sm:inline" />
                      <span>I am reaching out regarding </span>
                      <select
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        className="inline-block border-b-2 border-neutral-900 bg-transparent px-2 py-0.5 text-neutral-950 font-medium focus:outline-none focus:border-emerald-600 cursor-pointer text-base sm:text-lg transition-colors"
                      >
                        <option value="Vulnerability Research & Malware Analysis">Vulnerability Research & Malware Analysis</option>
                        <option value="Red Team & Penetration Testing Project">Red Team & Penetration Testing Project</option>
                        <option value="Malware Detection / AI Security Collaboration">Malware Detection / AI Security Collaboration</option>
                        <option value="Security Researcher Recruitment / Career">Security Researcher Recruitment / Career</option>
                        <option value="General Inquiry & Professional Networking">General Inquiry & Professional Networking</option>
                      </select>
                      <span>.</span>
                    </div>
                  ) : (
                    <div className="text-lg sm:text-xl font-light text-neutral-800 leading-loose space-y-3">
                      <span>안녕하세요, 저는 </span>
                      <input
                        type="text"
                        required
                        placeholder="이름 또는 소속 회사"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="inline-block border-b-2 border-neutral-900 bg-transparent px-2 py-0.5 text-neutral-950 font-medium placeholder:text-neutral-400 focus:outline-none focus:border-emerald-600 min-w-[200px] transition-colors"
                      />
                      <span> 입니다. 회신받으실 이메일은 </span>
                      <input
                        type="email"
                        required
                        placeholder="email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="inline-block border-b-2 border-neutral-900 bg-transparent px-2 py-0.5 text-neutral-950 font-mono text-base placeholder:text-neutral-400 focus:outline-none focus:border-emerald-600 min-w-[220px] transition-colors"
                      />
                      <span> 입니다. </span>
                      <br className="hidden sm:inline" />
                      <span>저는 현재 </span>
                      <select
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        className="inline-block border-b-2 border-neutral-900 bg-transparent px-2 py-0.5 text-neutral-950 font-medium focus:outline-none focus:border-emerald-600 cursor-pointer text-base sm:text-lg transition-colors"
                      >
                        <option value="취약점 분석 및 보안 연구">취약점 분석 및 보안 연구</option>
                        <option value="레드팀 / 모의해킹 프로젝트">레드팀 / 모의해킹 프로젝트</option>
                        <option value="악성코드 분석 / AI 보안 협업">악성코드 분석 / AI 보안 협업</option>
                        <option value="보안 연구원 채용 제안">보안 연구원 채용 제안</option>
                        <option value="기타 문의 및 네트워킹">기타 문의 및 네트워킹</option>
                      </select>
                      <span> 관련으로 연락드립니다.</span>
                    </div>
                  )}

                  {/* Additional Details Textarea */}
                  <div className="pt-4">
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                      {isEn ? 'Additional Details / Message' : '추가 메시지 / 상세 내용'}
                    </label>
                    <textarea
                      rows={3}
                      placeholder={
                        isEn
                          ? 'Feel free to share details about your proposal, timeline, or scope.'
                          : '세부적인 제안 내용이나 희망 일정 등을 자유롭게 적어주세요.'
                      }
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full p-3.5 rounded-xl border border-black/10 text-sm focus:outline-none focus:border-neutral-900 bg-neutral-50/50 transition-colors"
                    />
                  </div>

                  {/* Submit Button with Webflow Floating Arrow Animation */}
                  <div className="pt-2">
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="group w-full py-4 rounded-full bg-neutral-950 text-white font-semibold text-sm hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                    >
                      <span>{isEn ? 'Send Inquiry' : '문의 메일 열기 (Send Inquiry)'}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
                    </motion.button>
                  </div>
                </motion.form>
              )}

              {/* Quick Direct Contacts */}
              <div className="mt-8 pt-6 border-t border-black/10 space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                  {isEn ? 'Direct Contact' : '직통 연락처'}
                </span>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleCopyEmail}
                    className="flex-1 p-3 rounded-xl border border-black/10 hover:border-black/30 hover:bg-neutral-50 transition-all flex items-center justify-between text-xs font-mono text-neutral-800 cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-neutral-500" />
                      <span>{profileData.email}</span>
                    </span>
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-neutral-400" />}
                  </button>

                  <a
                    href={`tel:${profileData.phone}`}
                    className="p-3 rounded-xl border border-black/10 hover:border-black/30 hover:bg-neutral-50 transition-all flex items-center justify-between text-xs font-mono text-neutral-800"
                  >
                    <span className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-neutral-500" />
                      <span>{profileData.phone}</span>
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-6 bg-neutral-50 border-t border-black/10 text-xs text-neutral-500 flex items-center justify-between font-mono">
              <span>{isEn ? 'Jinseo Noh Portfolio' : '노진서 보안 포트폴리오'}</span>
              <span>Busan, Republic of Korea</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
