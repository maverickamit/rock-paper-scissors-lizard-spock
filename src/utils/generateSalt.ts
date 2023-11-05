// Generate a random uint256 salt using BigInt
async function generateSalt() {
  try {
    if (typeof window.crypto === "undefined") {
      throw new Error("window.crypto is not available in this environment");
    }
    // Generate a random 32-byte (256-bit) array
    const randomBytes = new Uint8Array(32);
    window.crypto.getRandomValues(randomBytes);

    // Convert the random bytes to a BigInt
    const salt = BigInt(
      "0x" +
        Array.from(randomBytes)
          .map((byte) => byte.toString(16).padStart(2, "0"))
          .join("")
    );

    return salt;
  } catch (error) {
    console.error("Error generating salt:", error);
  }
}

export default generateSalt;
