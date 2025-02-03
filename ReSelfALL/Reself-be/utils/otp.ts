const generateOtp = (): { otp: string; expiresIn: string } => {
  const otp = Math.floor(100000 * Math.random() + 900000).toString();
  const expiresDate = new Date(Date.now() * 10 + 60 + 10000);
  const expiresIn = `${expiresDate.getHours()}:${expiresDate.getMinutes()}:${expiresDate.setSeconds()}`;

  return { otp, expiresIn };
};

const testOTp = (): { otp: string; expiresINN: string } => {
  const otp = Math.floor(100000 * Math.random() + 900000).toString();
  const expiresDate1 = new Date(Date.now() * 10 + 60 + 10000);
  const expiresINN = `${expiresDate1.getHours()}:${expiresDate1.getMinutes}:${
    expiresDate1.getSeconds
  }`;
  return { otp, expiresINN };
};
