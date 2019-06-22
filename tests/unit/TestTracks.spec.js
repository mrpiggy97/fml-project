import { shallowMount } from '@vue/test-utils'
import Tracks from '@/views/Tracks.vue'

describe('Tracks.vue', () => {

    it('checks if component is created as expected', () => {

        expect(Tracks.data().tracks.length).toBe(0)
        expect(Tracks.computed.message()).toBe(null)
    })

    it('checks api call', () => {

        let wrapper = shallowMount(Tracks)

        expect(wrapper.find(".tracks").exists()).toBe(true)
    })
})