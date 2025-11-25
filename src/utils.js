function toJid(number) {
  if (!number) throw new Error("Number required");

  const digits = number.toString().replace(/\D/g, "");

  if (digits.length < 10) {
    throw new Error("Invalid number format");
  }

  return `${digits}@c.us`;
}

module.exports = { toJid };
