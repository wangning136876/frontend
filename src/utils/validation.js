export const emailRule = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(value) || 'Please enter a valid email address'
}

export const requiredRule = (message = 'This field is required') => {
  return (value) => {
    return (value !== null && value !== undefined && value !== '') || message
  }
}

export const minLengthRule = (min) => {
  return (value) => {
    return (value && value.length >= min) || `Minimum ${min} characters required`
  }
}

export const passwordRule = (value) => {
  const hasUpperCase = /[A-Z]/.test(value)
  const hasLowerCase = /[a-z]/.test(value)
  const hasNumber = /\d/.test(value)
  
  if (!hasUpperCase) return 'Password must contain at least one uppercase letter'
  if (!hasLowerCase) return 'Password must contain at least one lowercase letter'
  if (!hasNumber) return 'Password must contain at least one number'
  return true
}
