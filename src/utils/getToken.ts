export const getToken = (authHeader: string) => {
  if (authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7, authHeader.length)
    return token
  }
  else {
    return ''
  }
}
