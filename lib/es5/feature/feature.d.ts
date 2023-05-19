import { DistributiveOmit } from "../util/typescriptAddons";
export type Record_Partial<F> = {
    [P in keyof F]?: Partial<F[P]>;
};
export type FStatus = {
    inProgress: boolean;
    loaded: boolean;
};
export declare const defaultFStatus: FStatus;
export type FStatusByKey = Record<string, FStatus>;
export type FError = {
    isError: boolean;
    error?: Error;
};
export declare const defaultFError: FError;
export type FErrorByKey = {
    [key: string]: FError;
};
export type FTime = {
    updatedAt: number;
};
export declare const defaultFTime: FTime;
export declare const isFeatureDataTooFresh: (time?: FTime, timeoutSec?: number) => boolean;
export type Feature<D> = {
    status: FStatus;
    error: FError;
    data: D;
    time: FTime;
};
export type FeatureByKey<F> = {
    [key: string]: F;
};
export type FeatureByKey_Partial<P> = {
    [key: string]: Record_Partial<P>;
};
export type CumulativeInfo = DistributiveOmit<Feature<any>, "data">;
export type CumulativeInfo_Partial = Record_Partial<CumulativeInfo>;
export declare function getDefaultCumulativeInfo(): CumulativeInfo;
export declare function getDefaultFeature(): Feature<any>;
export declare function simpleFeatureReducer(state: any, newState: any): any;
export declare function featureByKeyReducer(state: any, newState: any): any;
