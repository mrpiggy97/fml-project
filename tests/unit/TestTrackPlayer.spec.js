import { shallowMount } from '@vue/test-utils'
import TrackPlayer from '@/components/TrackPlayer.vue'

describe('TrackPlayer.vue', () => {

    it('check if prop info is required', () => {

        expect(TrackPlayer.props.info.required).toBe(true)
    })

    it('checks if volume is updated correctly', () => {

        let info = {
            preview_url: null,
            album: null,
            name: null
        }

        let wrapper = shallowMount(TrackPlayer,{
            propsData: {info: info}
        })

        let expectedData = (80/100).toString()

        wrapper.setData({volume: 80})

        expect(wrapper.find({ref: "player"}).attributes('volume')).toBe(expectedData)
    })
})