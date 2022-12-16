interface Params {
  message: string
  data?: [] | {} | any
  included?: any
  meta?: {} | any
  error?: any
}

export const useSuccess = ({ message, data, included, meta }: Params) => {
  return {
    success: true,
    message,
    data,
    included,
    meta,
  }
}

export const useError = ({ message, data, error }: Params) => {
  return {
    success: false,
    message,
    data,
    error,
  }
}
