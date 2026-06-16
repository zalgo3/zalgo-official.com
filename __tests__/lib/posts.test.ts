import {describe, expect, it} from '@jest/globals';

import type {PostData} from '../../lib/posts';

describe('PostData type', () => {
    it('should be correctly defined', () => {
        const postData: PostData = {
            slug: 'test-slug',
            title: 'Test Title',
            excerpt: 'Test excerpt',
            category: 'コラム',
            createdAt: 1640995200,
            updatedAt: 1640995200,
        };

        expect(postData).toHaveProperty('slug', 'test-slug');
        expect(postData).toHaveProperty('title', 'Test Title');
        expect(postData).toHaveProperty('createdAt', 1640995200);
        expect(postData).toHaveProperty('updatedAt', 1640995200);
    });
});
