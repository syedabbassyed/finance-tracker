import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Transaction = {
  id: string
  title: string
  amount: number
  date: string
  category: string
  type: 'income' | 'expense'
}

type TransactionsState = {
  items: Transaction[]
  loading: boolean
  error: string | null
}

const initialState: TransactionsState = {
  items: [],
  loading: false,
  error: null,
}

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    fetchTransactionsStart(state) {
      state.loading = true
      state.error = null
    },
    fetchTransactionsSuccess(state, action: PayloadAction<Transaction[]>) {
      state.loading = false
      state.items = action.payload
    },
    fetchTransactionsFailure(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    },
    addTransaction(state, action: PayloadAction<Transaction>) {
      state.items.push(action.payload)
    },
    deleteTransaction(state, action: PayloadAction<string>) {
      state.items = state.items.filter(tx => tx.id !== action.payload)
    },
  },
})

export const {
  fetchTransactionsStart,
  fetchTransactionsSuccess,
  fetchTransactionsFailure,
  addTransaction,
  deleteTransaction,
} = transactionsSlice.actions

export default transactionsSlice.reducer
