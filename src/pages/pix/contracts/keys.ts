interface Account {
  name: string
  number: string
  bankId: string
  personType: string
  documentNumber: string
}

export interface PixKey {
  accountId: string
  updatedAt: number
  status: string
  account: Account
  createdAt: number
  key: string
  type: string
}

export interface Output {
  loading: boolean
  pixKeys: PixKey[]
  openConfirmDelete: boolean
  navigate: (value: number) => void
  handleDelete: () => void
  setPixDelete: (value: PixKey | null) => void
  setOpenConfirmDelete: (value: boolean) => void
}
