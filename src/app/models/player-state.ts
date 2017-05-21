export class PlayerState {

    public activeViewName: string
    public activeSystemIndex: number

    constructor(playerStateJson: Object) {
        this.activeViewName = playerStateJson['activeViewName']
        this.activeSystemIndex = playerStateJson['activeSystemIndex']
    }
}
