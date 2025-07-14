import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Users, Gift, Trophy, Copy, CheckCircle, Twitter, Facebook, Linkedin, Instagram } from 'lucide-react';

interface ReferralSystemProps {
  isDarkMode?: boolean;
}

const ReferralSystem: React.FC<ReferralSystemProps> = ({ isDarkMode = false }) => {
  const [referralCode, setReferralCode] = useState('');
  const [points, setPoints] = useState(0);
  const [referrals, setReferrals] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showRewards, setShowRewards] = useState(false);
  const [userLevel, setUserLevel] = useState('Newcomer');

  // Generate unique referral code
  useEffect(() => {
    const savedCode = localStorage.getItem('referralCode');
    if (savedCode) {
      setReferralCode(savedCode);
    } else {
      const newCode = 'RAHUL' + Math.random().toString(36).substr(2, 6).toUpperCase();
      setReferralCode(newCode);
      localStorage.setItem('referralCode', newCode);
    }

    // Load saved data
    const savedPoints = localStorage.getItem('referralPoints');
    const savedReferrals = localStorage.getItem('referralCount');
    if (savedPoints) setPoints(parseInt(savedPoints));
    if (savedReferrals) setReferrals(parseInt(savedReferrals));
  }, []);

  // Update user level based on points
  useEffect(() => {
    if (points >= 1000) setUserLevel('Legend');
    else if (points >= 500) setUserLevel('Master');
    else if (points >= 200) setUserLevel('Pro');
    else if (points >= 50) setUserLevel('Enthusiast');
    else setUserLevel('Newcomer');
  }, [points]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const shareOnSocial = (platform: string) => {
    const url = window.location.href;
    const text = `Check out Rahul's amazing video editing portfolio! Use my referral code ${referralCode} for special discounts! 🎬✨`;
    
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'instagram':
        // Instagram doesn't support direct sharing, so we'll copy to clipboard
        navigator.clipboard.writeText(`${text}\n${url}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        return;
    }
    
    window.open(shareUrl, '_blank');
    addPoints(10); // Reward for sharing
  };

  const addPoints = (amount: number) => {
    const newPoints = points + amount;
    setPoints(newPoints);
    localStorage.setItem('referralPoints', newPoints.toString());
  };

  const addReferral = () => {
    const newReferrals = referrals + 1;
    setReferrals(newReferrals);
    localStorage.setItem('referralCount', newReferrals.toString());
    addPoints(50); // 50 points per referral
  };

  const rewards = [
    { points: 50, reward: "5% Discount Code", code: "REF5" },
    { points: 100, reward: "10% Discount Code", code: "REF10" },
    { points: 200, reward: "15% Discount Code", code: "REF15" },
    { points: 500, reward: "Free Consultation", code: "REFFREE" },
    { points: 1000, reward: "VIP Treatment", code: "REFVIP" }
  ];

  const availableRewards = rewards.filter(r => points >= r.points);

  return (
    <div className="space-y-6 p-8 bg-gradient-to-br from-green-900/20 to-blue-900/20 backdrop-blur-sm rounded-2xl border border-green-500/30">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">🎁 Referral Rewards</h3>
        <p className="text-green-200 text-sm">Share and earn amazing rewards!</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-center p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl border border-green-400/50"
        >
          <Trophy className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
          <p className="text-white font-bold text-lg">{points}</p>
          <p className="text-green-300 text-xs">Points</p>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-center p-4 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl border border-blue-400/50"
        >
          <Users className="w-6 h-6 text-blue-400 mx-auto mb-2" />
          <p className="text-white font-bold text-lg">{referrals}</p>
          <p className="text-blue-300 text-xs">Referrals</p>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-center p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-400/50"
        >
          <Gift className="w-6 h-6 text-purple-400 mx-auto mb-2" />
          <p className="text-white font-bold text-lg">{userLevel}</p>
          <p className="text-purple-300 text-xs">Level</p>
        </motion.div>
      </div>

      {/* Referral Code */}
      <div className="space-y-4">
        <h4 className="text-white font-semibold text-center">Your Referral Code</h4>
        <div className="flex items-center gap-3">
          <div className="flex-1 p-3 bg-white/10 border border-green-400/50 rounded-lg">
            <p className="text-green-300 font-mono text-center">{referralCode}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={copyToClipboard}
            className="p-3 bg-green-500 hover:bg-green-600 rounded-lg transition-colors"
          >
            {copied ? <CheckCircle className="w-5 h-5 text-white" /> : <Copy className="w-5 h-5 text-white" />}
          </motion.button>
        </div>
        {copied && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-green-400 text-sm text-center"
          >
            Copied to clipboard! 📋
          </motion.p>
        )}
      </div>

      {/* Share Buttons */}
      <div className="space-y-4">
        <h4 className="text-white font-semibold text-center">Share & Earn Points</h4>
        <div className="grid grid-cols-2 gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => shareOnSocial('twitter')}
            className="flex items-center justify-center gap-2 p-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
          >
            <Twitter className="w-4 h-4" />
            <span className="text-white text-sm">Twitter</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => shareOnSocial('facebook')}
            className="flex items-center justify-center gap-2 p-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <Facebook className="w-4 h-4" />
            <span className="text-white text-sm">Facebook</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => shareOnSocial('linkedin')}
            className="flex items-center justify-center gap-2 p-3 bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors"
          >
            <Linkedin className="w-4 h-4" />
            <span className="text-white text-sm">LinkedIn</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => shareOnSocial('instagram')}
            className="flex items-center justify-center gap-2 p-3 bg-pink-500 hover:bg-pink-600 rounded-lg transition-colors"
          >
            <Instagram className="w-4 h-4" />
            <span className="text-white text-sm">Instagram</span>
          </motion.button>
        </div>
      </div>

      {/* Rewards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-white font-semibold">Available Rewards</h4>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setShowRewards(!showRewards)}
            className="text-green-400 text-sm hover:text-green-300"
          >
            {showRewards ? 'Hide' : 'Show'}
          </motion.button>
        </div>
        
        <AnimatePresence>
          {showRewards && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2"
            >
              {rewards.map((reward, index) => (
                <motion.div
                  key={reward.points}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-3 rounded-lg border ${
                    points >= reward.points
                      ? 'bg-green-500/20 border-green-400/50'
                      : 'bg-gray-500/20 border-gray-400/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`font-medium ${points >= reward.points ? 'text-green-300' : 'text-gray-400'}`}>
                        {reward.reward}
                      </p>
                      <p className="text-xs text-gray-400">{reward.points} points needed</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-mono text-sm ${points >= reward.points ? 'text-green-300' : 'text-gray-500'}`}>
                        {reward.code}
                      </p>
                      {points >= reward.points && (
                        <p className="text-green-400 text-xs">✓ Unlocked</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Test Button (for demo) */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={addReferral}
        className="w-full p-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-lg text-white font-medium transition-all"
      >
        🎯 Simulate Referral (+50 points)
      </motion.button>
    </div>
  );
};

export default ReferralSystem; 