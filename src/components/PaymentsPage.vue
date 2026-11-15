<template>
  <div class="container py-5">
    <h2 class="mb-4">💸 Платежі</h2>

    <div class="card shadow-sm mb-4">
      <div class="card-body">
        <h5 class="mb-4">Здійснити платіж</h5>

        <form @submit.prevent="submitPayment">
          <div class="mb-3">
            <label class="form-label">Рахунок списання</label>
            <select v-model.number="accountId" class="form-select" required>
              <option :value="null" disabled>Оберіть рахунок</option>
              <option
                v-for="account in activeAccounts"
                :key="account.id"
                :value="account.id"
              >
                {{ account.number }} —
                {{ account.balance.toLocaleString('uk-UA') }} грн
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label">Рахунок отримувача</label>
            <input
              v-model.trim="recipient"
              type="text"
              class="form-control"
              placeholder="Введіть номер рахунку отримувача"
              required
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Сума платежу (грн)</label>
            <input
              v-model.number="amount"
              type="number"
              min="0.01"
              step="0.01"
              class="form-control"
              placeholder="Введіть суму"
              required
            />
          </div>

          <button
            type="submit"
            class="btn btn-primary"
            :disabled="activeAccounts.length === 0"
          >
            Здійснити платіж
          </button>
        </form>

        <div
          v-if="message"
          class="alert mt-3 mb-0"
          :class="success ? 'alert-success' : 'alert-danger'"
        >
          {{ message }}
        </div>
      </div>
    </div>

    <h4 class="mb-3">Історія операцій</h4>

    <div v-if="transactions.length === 0" class="alert alert-info">
      Операцій поки немає.
    </div>

    <div v-else class="table-responsive">
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Дата</th>
            <th>Тип операції</th>
            <th>Рахунок</th>
            <th>Сума</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(transaction, index) in transactions" :key="index">
            <td>{{ transaction.date }}</td>
            <td>{{ transaction.type }}</td>
            <td>{{ transaction.account }}</td>
            <td>{{ transaction.amount.toLocaleString('uk-UA') }} грн</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'PaymentsPage',

  setup() {
    const store = useStore()

    const accountId = ref(null)
    const recipient = ref('')
    const amount = ref(null)
    const message = ref('')
    const success = ref(false)

    const activeAccounts = computed(() =>
      store.state.accounts.filter(account => !account.blocked)
    )

    const transactions = computed(() =>
      [...store.state.transactions].reverse()
    )

    const submitPayment = () => {
      const account = activeAccounts.value.find(
        a => a.id === accountId.value
      )

      const paymentAmount = Number(amount.value)

      if (!account) {
        message.value = 'Оберіть активний рахунок.'
        success.value = false
        return
      }

      if (
        !Number.isFinite(paymentAmount) ||
        paymentAmount <= 0 ||
        !recipient.value
      ) {
        message.value = 'Введіть коректні дані платежу.'
        success.value = false
        return
      }

      if (paymentAmount > account.balance) {
        message.value = 'Недостатньо коштів на рахунку.'
        success.value = false
        return
      }

      store.commit('makePayment', {
        accountId: accountId.value,
        recipient: recipient.value,
        amount: paymentAmount
      })

      message.value = 'Платіж успішно виконано!'
      success.value = true

      recipient.value = ''
      amount.value = null
    }

    return {
      accountId,
      recipient,
      amount,
      message,
      success,
      activeAccounts,
      transactions,
      submitPayment
    }
  }
}
</script>
