import { v4 as uuid } from "uuid"
import { getTimeStamp } from '../utils/timestamp'

export class SavingsAccount {
    constructor(type, description, value) {
        this.id = uuid()
        this.type = type
        this.description = description
        this.value = value
        this.createdAt = getTimeStamp()
    }
}


export const calculateSavings = (deposit, withdrawal) => {
        let sum1 = 0
        let sum2 = 0

        deposit.forEach(val => {
            sum1 = sum1 + val
        })
        withdrawal.forEach(val => {
            sum2 = sum2 + val
        })
        let savings = sum1 - sum2
        return savings
    }

