export const useSeeder = async (label: string, fn: Function) => {
  console.log('----------')
  console.time(`✅ Complete ${label} in `)
  console.log(`🚀 Starting ${label}`)

  await fn()

  console.timeEnd(`✅ Complete ${label} in `)
}
