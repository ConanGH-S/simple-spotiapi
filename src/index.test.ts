import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { describe, expect, it } from 'vitest'
import { RequestAPI } from './requests'

describe('RequestAPI', () => {
	it('should get an access token', async () => {
		const requestAPI = new RequestAPI()
		const mockAdapter = new MockAdapter(axios)

		mockAdapter.onPost('https://accounts.spotify.com/api/token').reply(200, {
			data: {
				access_token: 'token'
			}
		})

		const token = await requestAPI.getAccessToken()

		expect(token).toEqual('token')
	})

	it('should get a track by query and type', async () => {
		const requestAPI = new RequestAPI()
		const mockAdapter = new MockAdapter(axios)

		mockAdapter.onGet('https://api.spotify.com/v1/search?q=Track%20Name&type=track').reply(200, {
			data: {
				tracks: [
					{
						id: 'track-id',
						name: 'Track Name'
					}
				]
			}
		})

		const track = await requestAPI.getTrack({
			token: 'token',
			query: 'Track Name',
			type: 'track'
		})

		expect(track).toEqual({
			id: 'track-id',
			name: 'Track Name'
		})
	})

	it('should get a track by id', async () => {
		const requestAPI = new RequestAPI()
		const mockAdapter = new MockAdapter(axios)

		mockAdapter.onGet('https://api.spotify.com/v1/tracks/track-id').reply(200, {
			data: {
				id: 'track-id',
				name: 'Track Name'
			}
		})

		const track = await requestAPI.getTrackById({
			token: 'token',
			id: 'track-id'
		})

		expect(track).toEqual({
			id: 'track-id',
			name: 'Track Name'
		})
	})
})
