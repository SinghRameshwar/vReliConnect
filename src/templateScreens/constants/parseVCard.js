export function parseVCard(vCardData) {
  const lines = vCardData.trim().split("\n");
  const parsedData = {};

  lines.forEach((line) => {
    const [key, value] = line.split(":");
    if (key && value) {
      if (key === "N") {
        const [lastName, firstName] = value.split(";");
        parsedData["name"] = `${firstName} ${lastName}`;
      } else if (key === "EMAIL;TYPE=INTERNET") {
        parsedData["email"] = value;
      } else if (key === "EMAIL;TYPE=HOME") {
        parsedData["email"] = value;
      } else if (key === "EMAIL;TYPE=WORK") {
        parsedData["email2"] = value;
      } else if (key === "TEL;TYPE=CELL") {
        parsedData["tel"] = value;
      } else if (key === "TEL;TYPE=HOME") {
        parsedData["tel2"] = value;
      }
    }
  });

  return parsedData;
}
