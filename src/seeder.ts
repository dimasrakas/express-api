import { useSeeder } from '@utils/useSeeder'
import { UserSeeding } from '@modules/user/user.seed'
import { SalesSeeding } from '@modules/sales/sales.seed'

async function seeder() {
  await useSeeder('UserSeeding', UserSeeding)
  await useSeeder('SalesSeeding', SalesSeeding)
}

export default seeder
