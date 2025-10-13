export const ContractStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  EXPIRED: 'EXPIRED',
  DELETED: 'DELETED'
}

export type ContractStatus = (typeof ContractStatus)[keyof typeof ContractStatus];