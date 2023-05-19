import _ from "lodash"
import {getDifferenceBetweenMillis} from "../util/date/calculationDateUtils";
import {now} from "../util/date/dateUtils";
import {DistributiveOmit} from "../util/typescriptAddons";

export type Record_Partial<F> = { [P in keyof F]?: Partial<F[P]> }

////////////////////////////////////////////////
// FStatus
////////////////////////////////////////////////

export type FStatus = {
    inProgress: boolean
    loaded: boolean
}
export const defaultFStatus: FStatus = {inProgress: false, loaded: false}
export type FStatusByKey = Record<string, FStatus>

////////////////////////////////////////////////
// FError
////////////////////////////////////////////////

export type FError = {
    isError: boolean
    error?: Error
}
export const defaultFError: FError = {isError: false, error: undefined}
export type FErrorByKey = { [key: string]: FError }

////////////////////////////////////////////////
// FTime
////////////////////////////////////////////////

export type FTime = {
    updatedAt: number
}
export const defaultFTime: FTime = {updatedAt: 0}
export const isFeatureDataTooFresh = (time: FTime = {updatedAt: 0}, timeoutSec: number = 15): boolean => {
    if (time) {
        const differenceBetweenMillis = getDifferenceBetweenMillis(time.updatedAt, now());
        return (differenceBetweenMillis.millisecondsTotal / 1000) <= timeoutSec
    }
    return false
}

////////////////////////////////////////////////
// Feature
////////////////////////////////////////////////

export type Feature<D> = {
    status: FStatus
    error: FError
    data: D
    time: FTime
}

export type FeatureByKey<F> = { [key: string]: F }
export type FeatureByKey_Partial<P> = { [key: string]: Record_Partial<P> }

export type CumulativeInfo = DistributiveOmit<Feature<any>, "data">
export type CumulativeInfo_Partial = Record_Partial<CumulativeInfo>

export function getDefaultCumulativeInfo(): CumulativeInfo {
    return _.cloneDeep({
        status: defaultFStatus,
        error: defaultFError,
        time: defaultFTime,
    })
}

export function getDefaultFeature(): Feature<any> {
    return _.cloneDeep({
        status: defaultFStatus,
        error: defaultFError,
        data: undefined,
        time: defaultFTime,
    })
}

export function simpleFeatureReducer(state, newState) {
    if (newState == undefined) {
        if (process.env.NODE_ENV === "development") {
            console.error("simpleFeatureReducer: newState is undefined", newState, " => will use empty result");
        }
        return {}
    }
    const result = {...state}
    _.each(newState, (value, key) => {
        if (value === undefined) {
            result[key] = undefined
        } else {
            result[key] = {
                ...result[key],
                ...value
            }
        }
    })
    return result
}

export function featureByKeyReducer(state, newState) {
    if (_.isEmpty(newState)) {
        if (!!process.env.IS_TEST_SERVER) {
            console.log("featureReducer: newState is empty", _.cloneDeep(newState), " => will use empty result. state was", _.cloneDeep(state));
        }
        return {}
    }
    // console.log("featureReducer: state", _.cloneDeep(state));
    // console.log("featureReducer: newState", _.cloneDeep(newState));
    const result = {...state}
    _.each(newState, (newPartialFeature, key_identifier) => {
        if (_.isEmpty(result[key_identifier])) {
            result[key_identifier] = getDefaultFeature()
        }
        const featureResult: Feature<any | undefined> = {
            ...result[key_identifier]
        }
        _.each(newPartialFeature, (newPartialFeatureValue, newPartialFeatureKey) => {
            if (newPartialFeatureValue == undefined) {
                featureResult[newPartialFeatureKey] = undefined
            } else {
                featureResult[newPartialFeatureKey] = {
                    ...featureResult[newPartialFeatureKey],
                    ...newPartialFeatureValue,
                }
            }
        })
        result[key_identifier] = {
            ...result[key_identifier],
            ...featureResult
        }
    })
    return result
}