import { shallowMount } from '@vue/test-utils'
import Tracks from '@/views/Tracks.vue'

jest.mock('searchTracks')
jest.useFakeTimers()

describe('Tracks.vue', () => {

    it('checks if api runs as expected', async () => {
        
        let wrapper = shallowMount(Tracks)

        await wrapper.vm.getTracks("soryy")

        expect(wrapper.vm.tracks.length).toBe(1)
    })
})