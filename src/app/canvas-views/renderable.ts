export class Renderable {

    constructor(private scene: THREE.Scene) {
    }

    public clear() {
        // See http://stackoverflow.com/a/11699415/1747491
        let obj, i
        for (i = this.scene.children.length - 1; i >= 0; i--) {
            obj = this.scene.children[i]
            this.scene.remove(obj)
        }
    }
}
