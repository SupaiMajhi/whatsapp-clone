export const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleTimeString('en-IN', {
        hour: "2-digit",
        minute: '2-digit'
    });
}