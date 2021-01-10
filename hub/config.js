export async function LoadConfig() {
    var request = await fetch('/config.json')
    window.config = request.json();
}

function get(remote, Key, Type) {
    if(window.config["*"] !== undefined)
    {
        if(window.config["*"][Type].indexOf("*") >= 0)
            return true;
        if(window.config["*"][Type].indexOf(remote) >= 0)
            return true;
    }
    if(window.config[Key] !== undefined)
    {
        if(window.config[Key][Type].indexOf("*") >= 0)
            return true;
        if(window.config[Key][Type].indexOf(remote) >= 0)
            return true;
    }
    return false;  
}

export function CanRead(remote, Key) {
    return get(remote, Key, "read");
}

export function CanWrite(remote, Key) {
    return get(remote, Key, "write");
}