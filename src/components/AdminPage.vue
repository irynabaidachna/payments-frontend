<template>
  <div class="container py-5">
    <h2 class="mb-4">🔐 Панель адміністратора</h2>

    <div class="alert alert-info">
      На цій сторінці адміністратор може переглядати
      заблоковані рахунки та знімати блокування.
    </div>

    <div class="card shadow-sm">
      <div class="card-body">
        <h5 class="mb-4">Керування рахунками</h5>

        <div class="table-responsive">
          <table class="table table-striped align-middle">
            <thead>
              <tr>
                <th>№</th>
                <th>Номер рахунку</th>
                <th>Баланс</th>
                <th>Статус</th>
                <th>Дія</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="account in accounts"
                :key="account.id"
              >
                <td>{{ account.id }}</td>
                <td>{{ account.number }}</td>
                <td>
                  {{ account.balance.toLocaleString('uk-UA') }} грн
                </td>

                <td>
                  <span
                    class="badge"
                    :class="account.blocked ? 'bg-danger' : 'bg-success'"
                  >
                    {{ account.blocked ? 'Заблокований' : 'Активний' }}
                  </span>
                </td>

                <td>
                  <button
                    v-if="account.blocked"
                    class="btn btn-sm btn-success"
                    @click="unblockAccount(account.id)"
                  >
                    Розблокувати
                  </button>

                  <span v-else class="text-muted">
                    Дії не потрібні
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          v-if="message"
          class="alert alert-success mt-3"
        >
          {{ message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'AdminPage',

  setup() {
    const store = useStore()

    const accounts = computed(() => store.state.accounts)
    const message = ref('')

    const unblockAccount = (accountId) => {
      store.commit('unblockAccount', accountId)
      message.value = 'Рахунок успішно розблоковано!'
    }

    return {
      accounts,
      message,
      unblockAccount
    }
  }
}
</script>

