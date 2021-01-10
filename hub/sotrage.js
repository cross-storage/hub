BACKENDS = {
    "LocalStorage": 0,
    "IndexedDB": 1
};

function WhatBackEnd() {
    if(window.localStorage !== undefined)
    {
        return BACKENDS.LocalStorage;
    }
    
    InitIndexDB();
    if(window.indexedDB !== undefined)
    {
        return BACKENDS.IndexedDB;
    }
}

function InitIndexDB() {
    window.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB || undefined;
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.OIDBTransaction || window.msIDBTransaction;
}


export function StoreageSet(Key, Data) {
    var Backend = WhatBackEnd();
    if(Backend === BACKENDS.LocalStorage)
    {
        window.localStorage.setItem(Key, JSON.stringify(Data));
    }
}

export function StoreageGet(Key) {
    var Backend = WhatBackEnd();
    if(Backend === BACKENDS.LocalStorage)
    {
        return window.localStorage.getItem(Key);
    }
}