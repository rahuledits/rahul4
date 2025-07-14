import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface Magic8BallProps {
  isDarkMode?: boolean;
}

const Magic8Ball: React.FC<Magic8BallProps> = ({ isDarkMode = false }) => {
  const [isShaking, setIsShaking] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [question, setQuestion] = useState('');
  const [shakeCount, setShakeCount] = useState(0);
  const ballRef = useRef<HTMLDivElement>(null);

  const answers = [
    // Positive answers
    "It is certain! ✨",
    "Without a doubt! 🎯",
    "Yes, definitely! 🚀",
    "You may rely on it! 💫",
    "As I see it, yes! 🔮",
    "Most likely! 🌟",
    "Outlook good! ⭐",
    "Signs point to yes! 🎪",
    
    // Neutral answers
    "Reply hazy, try again! 🌫️",
    "Ask again later! ⏰",
    "Better not tell you now! 🤫",
    "Cannot predict now! 🔮",
    "Concentrate and ask again! 🧘",
    
    // Negative answers
    "Don't count on it! ❌",
    "My reply is no! 🚫",
    "My sources say no! 📰",
    "Outlook not so good! 😔",
    "Very doubtful! 🤔",
    
    // Special offers (rare)
    "🎉 SPECIAL: You get 15% off! Use code: MAGIC15",
    "🌟 LUCKY: 20% discount! Code: MAGIC20",
    "✨ BONUS: Free consultation! Code: MAGICFREE",
    "🎪 SURPRISE: 25% off! Code: MAGIC25",
    "🔮 FORTUNE: 30% discount! Code: MAGIC30"
  ];

  const handleShake = () => {
    if (!question.trim()) {
      setCurrentAnswer("Ask a question first! 🤔");
      setShowAnswer(true);
      setTimeout(() => setShowAnswer(false), 3000);
      return;
    }

    setIsShaking(true);
    setShowAnswer(false);
    
    // Shake animation
    setTimeout(() => {
      setIsShaking(false);
      
      // Determine answer based on shake count and randomness
      let answer;
      if (shakeCount >= 5 && Math.random() < 0.3) {
        // Higher chance of special offers after multiple shakes
        answer = answers[answers.length - 5 + Math.floor(Math.random() * 5)];
      } else {
        answer = answers[Math.floor(Math.random() * answers.length)];
      }
      
      setCurrentAnswer(answer);
      setShowAnswer(true);
      setShakeCount(prev => prev + 1);
    }, 2000);
  };

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-8 bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm rounded-2xl border border-purple-500/30">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">🔮 Magic 8 Ball</h3>
        <p className="text-purple-200 text-sm">Ask me anything about Rahul's services!</p>
      </div>

      <div className="w-full max-w-md">
        <input
          type="text"
          placeholder="Ask your question..."
          value={question}
          onChange={handleQuestionChange}
          className="w-full px-4 py-3 bg-white/10 border border-purple-500/50 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 transition-all"
        />
      </div>

      <motion.div
        ref={ballRef}
        className="relative w-32 h-32 bg-gradient-to-br from-black to-gray-800 rounded-full border-4 border-purple-500 cursor-pointer flex items-center justify-center"
        animate={isShaking ? {
          rotate: [0, -10, 10, -10, 10, -10, 10, 0],
          scale: [1, 1.1, 1, 1.1, 1, 1.1, 1],
        } : {}}
        transition={{ duration: 0.5, repeat: isShaking ? 4 : 0 }}
        onClick={handleShake}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-2xl">
          8
        </div>
        
        {/* Shake effect particles */}
        {isShaking && (
          <div className="absolute inset-0">
            <Sparkles className="absolute top-2 left-2 text-yellow-400 animate-pulse" />
            <Sparkles className="absolute top-2 right-2 text-purple-400 animate-pulse" />
            <Sparkles className="absolute bottom-2 left-2 text-blue-400 animate-pulse" />
            <Sparkles className="absolute bottom-2 right-2 text-pink-400 animate-pulse" />
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        {showAnswer && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            className="text-center p-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl border border-purple-400/50"
          >
            <p className="text-white font-medium text-lg">{currentAnswer}</p>
            {currentAnswer.includes('Code:') && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-2 p-2 bg-yellow-500/20 border border-yellow-400/50 rounded-lg"
              >
                <p className="text-yellow-300 text-sm font-mono">
                  Copy this code for your discount!
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-center">
        <p className="text-purple-300 text-xs">
          Shake count: {shakeCount} | More shakes = better chances! 🎯
        </p>
      </div>
    </div>
  );
};

export default Magic8Ball; 