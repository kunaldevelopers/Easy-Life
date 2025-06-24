import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = '', hover = true, onClick, ...props }) => {
  const baseClasses = 'bg-white rounded-xl shadow-card overflow-hidden';
  const hoverClasses = hover ? 'hover:shadow-hover transition-all duration-300 transform hover:-translate-y-1' : '';
  const clickableClasses = onClick ? 'cursor-pointer' : '';
  
  const classes = `${baseClasses} ${hoverClasses} ${clickableClasses} ${className}`;

  if (onClick) {
    return (
      <motion.div
        whileHover={{ y: -4 }}
        className={classes}
        onClick={onClick}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Card;