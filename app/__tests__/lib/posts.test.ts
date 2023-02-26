import type {PostData} from '../../lib/posts';

describe('PostData type', () => {
    it('should be correctly defined', () => {
        const postData: PostData = {
            slug: 'test-slug',
            title: 'Test Title',
            createdAt: '2022-01-01T00:00:00.000Z',
            updatedAt: '2022-01-01T00:00:00.000Z',
        };

        expect(postData).toHaveProperty('slug', 'test-slug');
        expect(postData).toHaveProperty('title', 'Test Title');
        expect(postData).toHaveProperty(
            'createdAt',
            '2022-01-01T00:00:00.000Z'
        );
        expect(postData).toHaveProperty(
            'updatedAt',
            '2022-01-01T00:00:00.000Z'
        );
    });
});
