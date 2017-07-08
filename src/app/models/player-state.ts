export class PlayerState {

    public activeViewName: string
    public activeSystemIndex: number

    public static fromJson(stateJson = {}) {
        return new PlayerState(stateJson['activeViewName'], stateJson['activeSystemIndex'])
    }

    constructor(activeViewName: string = 'system', activeSystemIndex: number = 0) {
        this.activeViewName = activeViewName
        this.activeSystemIndex = activeSystemIndex
    }
}
