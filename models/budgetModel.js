//Total available budget
import { v4 as uuid } from "uuid"
import { getTimeStamp } from '../utils/timestamp'

export class CurrentAccount {
    constructor(type, description, value) {
        this.id = uuid()
        this.type = type
        this.description = description
        this.value = value
        this.createdAt = getTimeStamp()
    }
}

export const calculateBudget = (plus, minus) => {
    let sum1 = 0
    let sum2 = 0

    plus.forEach(val => {
        sum1 = sum1 + val
    })
    minus.forEach(val => {
        sum2 = sum2 + val
    })
    let budget = sum1 - sum2
    return budget
}

//Total deposits and withdrawals
export const calculateTotalDepositsandWithdrawals = (plus, minus) => {
    let sum1 = 0
    let sum2 = 0

    plus.forEach(val => {
        sum1 = sum1 + val
    })
    minus.forEach(val => {
        sum2 = sum2 + val
    })
    return { totalDeposits: sum1, totalWithDrawals: sum2 }
}