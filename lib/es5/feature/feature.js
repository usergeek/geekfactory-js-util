"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.featureByKeyReducer = exports.simpleFeatureReducer = exports.getDefaultFeature = exports.getDefaultCumulativeInfo = exports.isFeatureDataTooFresh = exports.defaultFTime = exports.defaultFError = exports.defaultFStatus = void 0;
const lodash_1 = __importDefault(require("lodash"));
const calculationDateUtils_1 = require("../util/date/calculationDateUtils");
const dateUtils_1 = require("../util/date/dateUtils");
exports.defaultFStatus = { inProgress: false, loaded: false };
exports.defaultFError = { isError: false, error: undefined };
exports.defaultFTime = { updatedAt: 0 };
const isFeatureDataTooFresh = (time = { updatedAt: 0 }, timeoutSec = 15) => {
    if (time) {
        const differenceBetweenMillis = (0, calculationDateUtils_1.getDifferenceBetweenMillis)(time.updatedAt, (0, dateUtils_1.now)());
        return (differenceBetweenMillis.millisecondsTotal / 1000) <= timeoutSec;
    }
    return false;
};
exports.isFeatureDataTooFresh = isFeatureDataTooFresh;
function getDefaultCumulativeInfo() {
    return lodash_1.default.cloneDeep({
        status: exports.defaultFStatus,
        error: exports.defaultFError,
        time: exports.defaultFTime,
    });
}
exports.getDefaultCumulativeInfo = getDefaultCumulativeInfo;
function getDefaultFeature() {
    return lodash_1.default.cloneDeep({
        status: exports.defaultFStatus,
        error: exports.defaultFError,
        data: undefined,
        time: exports.defaultFTime,
    });
}
exports.getDefaultFeature = getDefaultFeature;
function simpleFeatureReducer(state, newState) {
    if (newState == undefined) {
        if (process.env.NODE_ENV === "development") {
            console.error("simpleFeatureReducer: newState is undefined", newState, " => will use empty result");
        }
        return {};
    }
    const result = { ...state };
    lodash_1.default.each(newState, (value, key) => {
        if (value === undefined) {
            result[key] = undefined;
        }
        else {
            result[key] = {
                ...result[key],
                ...value
            };
        }
    });
    return result;
}
exports.simpleFeatureReducer = simpleFeatureReducer;
function featureByKeyReducer(state, newState) {
    if (lodash_1.default.isEmpty(newState)) {
        if (!!process.env.IS_TEST_SERVER) {
            console.log("featureReducer: newState is empty", lodash_1.default.cloneDeep(newState), " => will use empty result. state was", lodash_1.default.cloneDeep(state));
        }
        return {};
    }
    // console.log("featureReducer: state", _.cloneDeep(state));
    // console.log("featureReducer: newState", _.cloneDeep(newState));
    const result = { ...state };
    lodash_1.default.each(newState, (newPartialFeature, key_identifier) => {
        if (lodash_1.default.isEmpty(result[key_identifier])) {
            result[key_identifier] = getDefaultFeature();
        }
        const featureResult = {
            ...result[key_identifier]
        };
        lodash_1.default.each(newPartialFeature, (newPartialFeatureValue, newPartialFeatureKey) => {
            if (newPartialFeatureValue == undefined) {
                featureResult[newPartialFeatureKey] = undefined;
            }
            else {
                featureResult[newPartialFeatureKey] = {
                    ...featureResult[newPartialFeatureKey],
                    ...newPartialFeatureValue,
                };
            }
        });
        result[key_identifier] = {
            ...result[key_identifier],
            ...featureResult
        };
    });
    return result;
}
exports.featureByKeyReducer = featureByKeyReducer;
//# sourceMappingURL=feature.js.map