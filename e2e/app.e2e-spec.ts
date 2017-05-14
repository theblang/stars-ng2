import { StarsPage } from './app.po'

describe('stars App', () => {
    let page: StarsPage

    beforeEach(() => {
        page = new StarsPage()
    })

    it('should display message saying app works', () => {
        page.navigateTo()

        // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/15215
        expect(page.getParagraphText().toString()).toEqual('app works!')
    })
})
