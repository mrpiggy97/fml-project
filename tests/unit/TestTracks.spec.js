import { shallowMount } from '@vue/test-utils'
import Tracks from '@/views/Tracks.vue'

jest.mock('@/api_services/searchTracks')

describe('Tracks.vue', () => {

    it('checks if api runs as expected', async () => {
        
        let wrapper = shallowMount(Tracks)

        await wrapper.vm.getTracks("soryy")

        expect(wrapper.vm.tracks.length).toBe(1)
    })

    it('checks if component has tracks when created', async () => {

        let wrapper = shallowMount(Tracks)

        await wrapper.vm.presentApp()

        expect(wrapper.vm.tracks.length).toBe(1)
        expect(wrapper.vm.firstLoadCompleted).toBe(true)
    })
})