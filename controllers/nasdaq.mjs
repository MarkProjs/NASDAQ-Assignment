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
        if(this.nasdaq){
            return this.nasdaq;
        }
        const fn = './files/basicNasdaq.json'
        this.nasdaq = await reader.readJSON(fn)
        return this.nasdaq;
    }
}

export default Nasdaq;