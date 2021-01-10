class CrossStorage {
    static Queue = {};
    GetIframe() {
        if(window.document.getElementsByClassName(".cs[src=" + this.uri + "]").length === 0) {
            
            var iframe = window.document.createElement("iframe");
            iframe.src = this.src;
            iframe.className = "cs";
            iframe.style = "display: none;"
            document.body.appendChild(iframe);
        }
        return window.document.getElementsByClassName(".cs[src=" + this.uri + "]")[0];
    }

    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    constructor(uri) {
      this.uri = uri;
      this.Queue = {};
      this.GetIframe();
    }

    async Get(Key) {
        var remote = this.GetIframe();
        remote.contentWindow.postMessage({
            Key: Key
        });
        while(true)
        {
            if(this.Queue[Key] !== undefined)
            {
                break;
            }
            await this.sleep(100);
        }
        var output = this.Queue[Key];
        delete this.Queue[Key];
        return output;
    }

    async Set(Key, Data) {
        var remote = this.GetIframe();
        remote.contentWindow.postMessage({
            Key: Key,
            content: Data
        });
    }

  }