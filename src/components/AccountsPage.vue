<template>
  <div class="container py-5">
    <h2 class="mb-4">💳 Мої рахунки</h2>

    <div class="row">
      <div
        v-for="account in accounts"
        :key="account.id"
        class="col-md-6 mb-4"
      >
        <div class="card shadow-sm h-100">
          <div class="card-body">
            <h5 class="card-title">
              Рахунок №{{ account.id }}
            </h5>

            <p class="text-muted">{{ account.number }}</p>

            <h3 class="text-primary">
              {{ account.balance.toLocaleString('uk-UA') }} грн
            </h3>

            <span
              class="badge"
              :class="account.blocked ? 'bg-danger' : 'bg-success'"
            >
              {{ account.blocked ? 'Заблокований' : 'Активний' }}
            </span>

            <div class="mt-4" v-if="!account.blocked">
              <div class="input-group mb-3">
                <input
                  v-model.number="depositAmounts[account.id]"
                  type="number"
                  min="1"
                  class="form-control"
                  placeholder="Сума поповнення"
                />

                <button
                  class="btn btn-success"
                  @click="deposit(account.id)"
                >
                  Поповнити
                </button>
              </div>

              <button
                class="btn btn-outline-danger"
                @click="blockAccount(account.id)"
              >
                Заблокувати рахунок
              </button>
            </div>

            <div v-else class="alert alert-warning mt-4 mb-0">
              Рахунок заблокований.
              Для розблокування зверніться до адміністратора.
            </div>

          </div>
        </div>
      </div>
    </div>

    <div
      v-if="message"
      class="alert alert-info mt-3"
    >
      {{ message }}
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'AccountsPage',

  setup() {
    const store = useStore()

    const accounts = computed(() => store.state.accounts)
    const depositAmounts = reactive({})
    const message = ref('')

    const deposit = (accountId) => {
      const amount = Number(depositAmounts[accountId])
      const account = accounts.value.find(a => a.id === accountId)

      if (!account || account.blocked || !Number.isFinite(amount) || amount <= 0) {
        message.value = 'Введіть коректну суму поповнення.'
        return
      }

      store.commit('deposit', { accountId, amount })

      depositAmounts[accountId] = ''
      message.value = 'Рахунок успішно поповнено!'
    }

    const blockAccount = (accountId) => {
      store.commit('blockAccount', accountId)
      message.value = 'Рахунок успішно заблоковано!'
    }

    return {
      accounts,
      depositAmounts,
      message,
      deposit,
      blockAccount
    }
  }
}
</script>

