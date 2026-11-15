import { createStore } from 'vuex'

export default createStore({
  state: {
    appName: 'Система Платежі',

    accounts: [
      {
        id: 1,
        number: 'UA123456789',
        balance: 12500,
        blocked: false
      },
      {
        id: 2,
        number: 'UA987654321',
        balance: 4800,
        blocked: true
      }
    ],

    transactions: []
  },

  mutations: {
    // Поповнення рахунку
    deposit(state, { accountId, amount }) {
      const account = state.accounts.find(a => a.id === accountId)

      if (account && !account.blocked && amount > 0) {
        account.balance += amount

        state.transactions.push({
          id: Date.now(),
          type: 'Поповнення',
          account: account.number,
          amount: amount,
          date: new Date().toLocaleString('uk-UA')
        })
      }
    },

    // Блокування рахунку
    blockAccount(state, accountId) {
      const account = state.accounts.find(a => a.id === accountId)

      if (account) {
        account.blocked = true
      }
    },

    // Розблокування рахунку адміністратором
    unblockAccount(state, accountId) {
      const account = state.accounts.find(a => a.id === accountId)

      if (account) {
        account.blocked = false
      }
    },

    // Здійснення платежу
    makePayment(state, { accountId, recipient, amount }) {
      const account = state.accounts.find(a => a.id === accountId)

      if (account && !account.blocked && amount > 0 && account.balance >= amount && recipient.trim()) {
        account.balance -= amount

        state.transactions.push({
          id: Date.now(),
          type: 'Платіж',
          account: account.number,
          recipient: recipient,
          amount: amount,
          date: new Date().toLocaleString('uk-UA')
        })
      }
    }
  }
})
