export function formatFieldError(input) {
  if (!input) return [];

  let errors = input;

  if (typeof input === "string") {
    try {
      const parsed = JSON.parse(input);
      if (Array.isArray(parsed)) errors = parsed;
    } catch {
      return [{ message: input, path: "" }];
    }
  }

  if (Array.isArray(errors)) {
    return errors
      .filter((err) => err && (err.message || err.path))
      .map((err) => ({
        path: Array.isArray(err.path) ? err.path.join(".") : err.path || "",
        message: err.message || "Unknown error",
      }));
  }

  if (typeof errors === "object") {
    return [
      {
        path: Array.isArray(errors.path)
          ? errors.path.join(".")
          : errors.path || "",
        message: errors.message || "Unknown error",
      },
    ];
  }

  return [];
}
