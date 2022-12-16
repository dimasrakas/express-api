import CryptoJS from 'crypto-js'

const SECRET = 'iXdhGmfb'

export const encrypt = async (value: string) => {
  return CryptoJS.AES.encrypt(value, SECRET).toString()
}

export const decrypt = async (value: string) => {
  return CryptoJS.AES.decrypt(value, SECRET).toString()
}
