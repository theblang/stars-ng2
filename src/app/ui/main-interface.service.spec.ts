import {TestBed, inject} from '@angular/core/testing'

import {MainInterfaceService} from './main-interface.service'

describe('MainInterfaceService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [MainInterfaceService]
        })
    })

    it('should ...', inject([MainInterfaceService], (service: MainInterfaceService) => {
        expect(service).toBeTruthy()
    }))
})
