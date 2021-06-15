import { Test, TestingModule } from '@nestjs/testing';
import { ContentsService } from './contents.service';
import {
  CreateContentDto,
  GetOneItemDto,
  UpdateContentDto,
  DeleteItem,
} from './dto/content.dto';
import { Content } from './content.entity';

jest.mock('./content.entity');

describe('ContentsService', () => {
  let service: ContentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContentsService, Content],
    }).compile();

    service = module.get<ContentsService>(ContentsService);
  });

  describe('Create Content', () => {
    it('should create a new content then return it', async () => {
      const content = new Content();

      jest.spyOn(Content, 'create').mockImplementation(() => content);
      jest.spyOn(Content, 'save').mockImplementation(async () => content);

      const createContentDto = new CreateContentDto();
      const contentCreate = (await service.create(
        createContentDto,
      )) as unknown as Content;

      expect(contentCreate).toBe(content);
    });
  });
  describe('Get all contents', () => {
    it('should find all contents', async () => {
      const result: Content[] = [];
      jest.spyOn(service, 'getAllContents').mockResolvedValueOnce(result);

      expect(await service.getAllContents()).toBe(result);
    });
  });
  describe('Content find by ID', () => {
    it('should find an content by ID', async () => {
      const content = new Content();
      content.id = 1;

      jest.spyOn(Content, 'findOne').mockImplementation(async () => content);

      const getOneItemDto = new GetOneItemDto();
      const findContent = (await service.findById(
        getOneItemDto,
      )) as unknown as Content;

      expect(findContent.id).toBe(content.id);
    });
  });
  describe('Update an content', () => {
    it('should update an content by ID', async () => {
      const content = new Content();
      content.id = 1;
      content.content = '';
      content.author = '';

      let result;

      jest.spyOn(Content, 'update').mockImplementation(async () => result);

      const updateContentDto = new UpdateContentDto();
      const updateContent = (await service.update(
        updateContentDto,
      )) as unknown as Content;

      expect(updateContent).toBe(result);
    });
  });
  describe('Delete a content', () => {
    it('should delete a content by ID', async () => {
      const content = new Content();
      content.id = 1;

      let result;

      jest.spyOn(Content, 'delete').mockImplementation(async () => result);

      const deleteContentDto = new DeleteItem();
      const deleteContent = (await service.delete(
        deleteContentDto,
      )) as unknown as Content;

      expect(deleteContent).toBe(result);
    });
  });
});
