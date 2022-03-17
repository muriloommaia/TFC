import bcrypt = require('bcryptjs');

export const decryptPass = async (password: string, hash: string) => {
  const compare = await bcrypt.compare(password, hash);
  return compare;
};

export const defaultValue = 1;

// export const encrypt = async (password: string) => {
//   const salt = bcrypt.genSaltSync(10);
//   const hash = bcrypt.hashSync(password, salt);
//   return hash;
// };
