function formatAddress(address: string): string {
  // Extract the first four and last four characters
  const firstFour = address.slice(0, 4);
  const lastFour = address.slice(-4);

  // Create a string with dots in between
  const formattedAddress = `${firstFour}...${lastFour}`;

  return formattedAddress;
}

export default formatAddress;
