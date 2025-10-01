export const capitalizeWords = (str) => {
    if (!str || typeof str !== 'string') return ''; // Handle non-string input
    // Insert space before each uppercase letter that follows a lowercase letter
    const spacedStr = str.replace(/([a-z])([A-Z])/g, '$1 $2');
    // Capitalize the first letter of each word
    return spacedStr.replace(/\b\w/g, (char) => char.toUpperCase());
};

export const uppercaseWords = (str) => {
    if (!str || typeof str !== 'string') return '';
    return str.toUpperCase(); 
};