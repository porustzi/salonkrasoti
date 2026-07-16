import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'gold' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  to?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  showArrow?: boolean;
  external?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-neutral-900 text-white hover:bg-neutral-800 hover:shadow-xl',
  secondary: 'border-2 border-neutral-900 bg-transparent text-neutral-900 hover:bg-neutral-900 hover:text-white',
  gold: 'bg-champagne text-neutral-900 hover:bg-gold hover:shadow-gold',
  ghost: 'bg-transparent text-neutral-900 hover:bg-neutral-100',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-5 py-2.5 text-xs',
  md: 'px-7 py-3.5 text-sm',
  lg: 'px-8 py-4 text-sm',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  className = '',
  disabled = false,
  showArrow = false,
  external = false,
}: ButtonProps) {
  const baseStyles = `
    inline-flex items-center justify-center gap-2
    rounded-full font-medium uppercase tracking-wider
    transition-all duration-300
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `;

  const content = (
    <>
      <span>{children}</span>
      {showArrow && <ArrowRight className="w-4 h-4" />}
    </>
  );

  const motionProps = {
    whileHover: disabled ? {} : { scale: 1.02 },
    whileTap: disabled ? {} : { scale: 0.98 },
    transition: { duration: 0.2 },
  };

  if (to) {
    return (
      <Link to={to} className={baseStyles}>
        <motion.span {...motionProps}>{content}</motion.span>
      </Link>
    );
  }

  if (href) {
    return (
      <motion.a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={baseStyles}
        {...motionProps}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={baseStyles}
      {...motionProps}
    >
      {content}
    </motion.button>
  );
}
