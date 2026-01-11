export const getInitial = (name?: string) => {
  if (!name) return "?";
  return name.trim().charAt(0).toUpperCase();
};

export const getRandomColor = (name?: string) => {
  const colors = [
    "bg-blue-500",
    "bg-purple-500",
    "bg-indigo-500",
    "bg-pink-500",
    "bg-emerald-500",
    "bg-orange-500",
  ];

  if (!name) return colors[0];

  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};
