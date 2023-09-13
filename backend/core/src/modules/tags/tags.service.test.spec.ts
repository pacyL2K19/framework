import { faker } from '@faker-js/faker'
import { Tag } from './tags.entity'
import { TagsService } from './tags.service'
import { Scaffold, ScaffoldDto } from '../../test'
import { TagsModule } from './tags.module'

const E = Tag
type T = Tag
const MODULE = TagsModule
const SERVICE = TagsService

const tag = faker.word.sample().toUpperCase()

describe('TagsService', () => {
	const scaffolding = new Scaffold<T>()
	let scaffold: ScaffoldDto<T>

	//variables for testing
	let tags: Tag[]

	beforeAll(async () => {
		scaffold = await scaffolding.up(MODULE, SERVICE)
	})

	describe('Create Tag', () => {
		it('Should create a new tag', async () => {
			await scaffold.services.service.create(tag)
			tags = await scaffold.services.service.findAll()
			expect(tags[0].name).toBe(tag)
		})
	})

	describe('Create From String', () => {
		it('Should create a number of tags and return them', async () => {
			const result = await scaffold.services.service.createFromStrings(['test', 'test2', 'test3'])
			expect(result[0].name).toBe('test'.toUpperCase())
			expect(result[1].name).toBe('test2'.toUpperCase())
			expect(result[2].name).toBe('test3'.toUpperCase())
		})
	})

	describe('Retrieve', () => {
		it('Should get all tags', async () => {
			tags = await scaffold.services.service.findAll()
			expect(tags[0].name).toBeDefined()
		})

		it('Find by name', async () => {
			const t = await scaffold.services.service.findByName(tag)
			expect(t.name).toBe(tag)
		})
	})

	afterAll(async () => {
		await scaffolding.down(E)
	})
})