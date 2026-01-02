// Utility helper functions for Zig

/**
 * Get the current week number of the year
 */
export const getWeekNumber = (date: Date = new Date()): number => {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor(
    (date.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000)
  );
  return Math.ceil((days + 1) / 7);
};

/**
 * Format a date to a relative time string (e.g., "2h ago")
 */
export const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 7) {
    return date.toLocaleDateString('en-US', {month: 'short', day: 'numeric'});
  }
  if (diffDays > 0) {
    return `${diffDays}d ago`;
  }
  if (diffHours > 0) {
    return `${diffHours}h ago`;
  }
  if (diffMins > 0) {
    return `${diffMins}m ago`;
  }
  return 'just now';
};

/**
 * Format a number with abbreviations (e.g., 1.2k)
 */
export const formatCount = (count: number): string => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}m`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};

/**
 * Validate if a string is a valid URL
 */
export const isValidUrl = (string: string): boolean => {
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
};

/**
 * Extract domain from URL
 */
export const extractDomain = (url: string): string => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace('www.', '');
  } catch {
    return url;
  }
};

/**
 * Get the next Monday drop time
 */
export const getNextDropTime = (): Date => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const daysUntilMonday = dayOfWeek === 0 ? 1 : (8 - dayOfWeek) % 7 || 7;

  const nextMonday = new Date(now);
  nextMonday.setDate(now.getDate() + daysUntilMonday);
  nextMonday.setHours(9, 0, 0, 0); // 9:00 AM EST

  // If it's Monday before 9 AM, use today
  if (dayOfWeek === 1 && now.getHours() < 9) {
    const today = new Date(now);
    today.setHours(9, 0, 0, 0);
    return today;
  }

  return nextMonday;
};

/**
 * Check if the drop has happened today
 */
export const hasDropHappenedToday = (): boolean => {
  const now = new Date();
  const dayOfWeek = now.getDay();

  // Monday is day 1
  if (dayOfWeek === 1 && now.getHours() >= 9) {
    return true;
  }

  return false;
};

/**
 * Generate initials from a name
 */
export const getInitials = (name: string): string => {
  const words = name.trim().split(' ');
  if (words.length >= 2) {
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
};
