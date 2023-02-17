"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyValueStoreFacade = exports.grabLocalStorage = void 0;
const LocalStorageKeyValueStore_1 = require("./LocalStorageKeyValueStore");
const InMemoryKeyValueStore_1 = require("./InMemoryKeyValueStore");
const grabLocalStorage = () => {
    return window.localStorage;
};
exports.grabLocalStorage = grabLocalStorage;
const checkLocalStorage = () => {
    try {
        const storage = (0, exports.grabLocalStorage)();
        const testKey = `kvsf-0123456789-ic_test_ls_${Math.random()}`;
        // @ts-ignore
        storage.setItem(testKey, "_");
        // @ts-ignore
        storage.removeItem(testKey);
        return true;
    }
    catch (e) {
        return false;
    }
};
const isLocalStorageSupported = checkLocalStorage();
const createStore = (namespace) => {
    if (isLocalStorageSupported) {
        return new LocalStorageKeyValueStore_1.LocalStorageKeyValueStore(namespace);
    }
    else {
        return new InMemoryKeyValueStore_1.InMemoryKeyValueStore();
    }
};
exports.KeyValueStoreFacade = {
    createStore: createStore,
};
//# sourceMappingURL=KeyValueStoreFacade.js.map