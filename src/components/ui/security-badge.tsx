import React from 'react';
import { Shield, Lock, CheckCircle, AlertTriangle } from 'lucide-react';

interface SecurityBadgeProps {
  type: 'ssl' | 'gdpr' | 'secure' | 'verified';
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const SecurityBadge: React.FC<SecurityBadgeProps> = ({ 
  type, 
  size = 'md', 
  showText = true 
}) => {
  const badgeConfig = {
    ssl: {
      icon: Lock,
      text: 'SSL Secured',
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
      borderColor: 'border-green-400/20'
    },
    gdpr: {
      icon: Shield,
      text: 'GDPR Compliant',
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
      borderColor: 'border-blue-400/20'
    },
    secure: {
      icon: CheckCircle,
      text: 'Security Verified',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-400/10',
      borderColor: 'border-emerald-400/20'
    },
    verified: {
      icon: Shield,
      text: 'Verified Site',
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
      borderColor: 'border-purple-400/20'
    }
  };

  const config = badgeConfig[type];
  const IconComponent = config.icon;

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-3 text-base'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <div className={`
      inline-flex items-center gap-2 rounded-full border backdrop-blur-sm
      ${config.bgColor} ${config.borderColor} ${sizeClasses[size]}
      transition-all duration-300 hover:scale-105
    `}>
      <IconComponent className={`${config.color} ${iconSizes[size]}`} />
      {showText && (
        <span className={`font-medium ${config.color}`}>
          {config.text}
        </span>
      )}
    </div>
  );
};

export const SecurityBadgeGroup: React.FC = () => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <SecurityBadge type="ssl" size="sm" />
      <SecurityBadge type="gdpr" size="sm" />
      <SecurityBadge type="secure" size="sm" />
      <SecurityBadge type="verified" size="sm" />
    </div>
  );
};

export const SecurityNotice: React.FC = () => {
  return (
    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 backdrop-blur-sm">
      <div className="flex items-start gap-3">
        <Shield className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="font-semibold text-green-400 mb-1">Security Notice</h3>
          <p className="text-sm text-gray-300">
            This website is protected by industry-standard security measures including HTTPS encryption, 
            input validation, and Content Security Policy. Your data is safe with us.
          </p>
        </div>
      </div>
    </div>
  );
}; 