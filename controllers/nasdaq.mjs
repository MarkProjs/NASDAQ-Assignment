import * as reader from '../fileio/fileio.mjs'

let singleton = null;
class Nasdaq {
    constructor() {
        if (singleton == null) {
            singleton = this;
        }
        return singleton
    }

    async getNasdaq(){
        if(this){
            return this;
        }
        const fn = './files/basicNasdaq.json'
        this = await reader.readJSON(fn)
        return this;
    }
}

export default Nasdaq;