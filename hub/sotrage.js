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

function MakeKey(Key) {
    if(window.settings["domain_prefix"])
    {
        return window.location.hostname.replace(".", "_") + Key;
    }

    return Key;
}

export function StoreageSet(Key, Data) {
    Key = MakeKey(Key);
    var Backend = WhatBackEnd();
    if(Backend === BACKENDS.LocalStorage)
    {
        window.localStorage.setItem(Key, JSON.stringify(Data));
    }
}

export function StoreageGet(Key) {
    Key = MakeKey(Key);
    var Backend = WhatBackEnd();
    if(Backend === BACKENDS.LocalStorage)
    {
        return window.localStorage.getItem(Key);
    }
}