abstract class AbstractOffer {
    constructor() {
        if (this.constructor === AbstractOffer) {
            throw new Error(`Can't be instantiated`)
        }
    }

    abstract calculate(): number
}

export default AbstractOffer