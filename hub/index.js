import { CanRead, CanWrite, LoadConfig } from "./config";
import { StoreageGet, StoreageSet } from "./sotrage";

LoadConfig();

window.addEventListener('message', function(event) {
    var origin = event.origin || event.originalEvent.origin;
    
    if(event.data.Key === undefined)
        return;

    if(event.data.content !== undefined)
    {
        if(!CanWrite(origin, event.data.Key)) return;
        StoreageSet(event.data.Key, event.data.content);
    }
    else
    {
        if (!CanRead(origin, event.data.Key)) return; 
        window.parent.postMessage(StoreageGet(event.data.Key)); 
    }
    
}, false);